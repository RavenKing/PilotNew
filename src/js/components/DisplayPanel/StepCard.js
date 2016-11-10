
import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Col,Row } from "antd";
//pilot 
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";
//Workflow
import { AddCourseToStep,DeleteCourseFromStep,DeleteStepFromWorkflow } from "../../Actions/pilotAction"



@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };   
})

export default class StepCard extends React.Component {   
  constructor(props){
		super(props);
	}

  componentWillMount(){
    var allCourses = this.props.allCourses;
    console.log(this.props.courses)
    var courses = this.props.courses;
    this.setState({course:courses});
    allCourses.map((lesson,i)=>{
    var newcourse = courses.map((course,j)=>{
        if(course.course_id == lesson.course_id){
          course.title = lesson.title;
      }
       return course;
    })
    this.setState({course:newcourse});   
    });
  }



  componentDidMount()
  {
    const state = this.state; 
    const props = this.props;
    var workflowid = this.props.workflowid;  
    this.interactable = setAreaDropable(
    {
    element: ReactDOM.findDOMNode(this),
    accept: '.course-item',
    ondrop(event) {
      let draggableElement = event.relatedTarget;
      var courseid  = draggableElement.getAttribute('data-courseid');
      var courseTitle = draggableElement.getAttribute('title');
      var stepSequence = Number(event.target.id)+1;
      console.log("diao zha tian de feixingyuan",courseTitle,workflowid,stepSequence,courseid);
      props.dispatch(AddCourseToStep(courseTitle,workflowid,stepSequence,courseid));
        }
      }
    );
  }

  
Ç
  componentWillReceiveProps()
  {
    var allCourses = this.props.allCourses;
    var courses = this.props.courses;
    this.setState({course:courses});
    allCourses.map((lesson,i)=>{
    var newcourse = courses.map((course,j)=>{
        if(course.course_id == lesson.course_id){
          course.title = lesson.title;
      }
       return course;
    })
    this.setState({course:newcourse});   
    });
  }
  Delete(e)
  {
    var workflowid = this.props.workflowid; 
    var stepSequence = this.props.id+1;
    var courseid = e.target.attributes["id"].value;
    this.props.dispatch(DeleteCourseFromStep(workflowid,stepSequence,courseid));
  }

  deleteStep()
  {
    var workflowid = this.props.workflowid; 
    var stepSequence = this.props.id+1;
    this.props.dispatch(DeleteStepFromWorkflow(workflowid,stepSequence));
  }

  render(){
      return(
      <Card id={this.props.id} onDragStart ={this.props.onDragStart} 
                    draggable="true" onDragEnd={this.props.onDragEnd}
                    onDragStart={this.props.onDragStart} onDragOver={this.props.onDragOver}
                    title={this.props.name}
                    extra = {<Icon type="cross" style={{float:"right"}} onClick={this.deleteStep.bind(this)}/>}>

      {
        this.state.course.map((course,i) => {
            return <li key={i}>{course.course_id+" "+course.title}<Icon type="delete" id = {course.course_id }style={{float:"right"}} onClick={this.Delete.bind(this)}/></li>
      })}
      </Card>           
     	);
	}
}

