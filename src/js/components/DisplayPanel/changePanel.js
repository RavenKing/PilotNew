
import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Col,Row } from "antd";
//pilot 
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";
import StepCard from "./StepCard"
import { ChangeStepSequence,SaveStepsSequence,AddNewStep } from "../../Actions/pilotAction"
import NewStepName from "./NewStepName";
//Workflow

// var placeholder = document.createElement("li");
// placeholder.className = "placeholder";

@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };   
})

export default class ChangePanel extends React.Component {   
  constructor(props){
		super(props);
		this.state = {
			dragged : "",
			nodePlacement:"",
			steps:"",
      visible:false
		}
	}

  dragStart(e){
  e.dataTransfer.effectAllowed = 'move';
  this.setState({dragged:e.currentTarget});
  e.dataTransfer.setData("text/html",e.currentTarget);
  console.log("drag start");  
  // console.log("e.currentTarget",e.currentTarget);
  }

  dragOver(e){
    e.preventDefault();
    this.state.dragged.style.display = "none";
    this.over = e.target;
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight/2;
    var parent = e.target.parentNode;
    if(relY > height)
    {
      this.setState({nodePlacement:"after"});
    }
    else if(relY < height){
      this.setState({nodePlacement:"before"});
    }
  }

  dragEnd(e){
    this.state.dragged.style.display = "block";
    // this.over.parentNode.removeChild(placeholder);
    var steps = this.props.steps;
    console.log(this.state.dragged);
    var fromNode = this.state.dragged;
    var from = Number(fromNode.getAttribute("id"));
    console.log("from is ",from);
    var toNode = this.over;
    var to = Number(toNode.getAttribute("id"));
    console.log("to is ",to);
    if(from < to) to--;
    if(this.state.nodePlacement == "after") to++;
    steps.splice(to, 0, steps.splice(from, 1)[0]);
    console.log("steps are +++++++++++++++",steps);
    this.props.dispatch(ChangeStepSequence(steps,this.props.workflowid));
    this.setState({steps:steps});

  }
  
  componentWillMount(){
  	var steps = this.props.steps;
  	this.setState({steps:steps});
  }
  SaveStepsSequence(e)
  {
    this.props.dispatch(SaveStepsSequence());
  }
  
  CreateNewStep()
  {
    this.setState({visible:true});
  }

  onCreate()
  {
    const form = this.form;
    var workflowid = this.props.workflowid;
    form.validateFields((err, values) => {
      let stepName = values.stepName;
      this.props.dispatch(AddNewStep(stepName,workflowid));
    });
    form.resetFields();
    this.setState({visible:false});
  }
  onCancel(){this.setState({visible:false})}
  saveFormRef(form){this.form = form;}
  render(){
  	const divStyle = {
            color: 'blue',
            background: '#ffffff',

          };

     var steps = this.state.steps;
     var workflowid = this.props.workflowid;
     return(
        <Row>  
                <NewStepName
                visible={this.state.visible}
                initdata={this.state.editdata}
                ref={this.saveFormRef.bind(this)}
                onCancel={this.onCancel.bind(this)}
                onCreate={this.onCreate.bind(this)}
                />
              { 
                    steps.map((one,i) =>{
                    return <StepCard key = {i} name={one.name} id={i} courses = {one.courses} 
                    draggable="true" onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)} onDragOver={this.dragOver.bind(this)}
                    workflowid={ workflowid } allCourses={this.props.courses}
                    >
                    </StepCard>
                  })
                }
            <Button type="primary" size="large" style = {{ margin: '10px', display:'inline-block',float:"right"}} onClick = {this.CreateNewStep.bind(this)}>
            增加新阶段 
            </Button>
            <Button type="primary" size="large" style = {{ margin: '10px', display:'inline-block',float:"right"}} onClick = {this.SaveStepsSequence.bind(this)}>
              保存
            </Button>
          </Row>
     	);
	}
}

