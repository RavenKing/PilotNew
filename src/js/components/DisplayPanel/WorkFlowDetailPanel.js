import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify} from "../../Actions/pilotAction"

@connect((store)=>{    
    return {
    	status:status,
      pilotinfo:store.pilotinfo
    };
    
})
export default class WorkFlowDetail extends React.Component {


	componentDidMount(){

      const props = this.props;
      const that = this;	
      const {status} = this.props;
      var workflowid = this.props.workflowid;

      if(status.status == "init")
      setCardDragable(ReactDOM.findDOMNode(this));  

      handleFocus(ReactDOM.findDOMNode(this));   
       this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
 		      var content = document.getElementById('content');
    	    content.classList.add('content-' + Math.floor(Math.random() * 3));		
      		//change status 
      	 	props.dispatch(ChangeToModify(workflowid));
      		//add change card

              
          }
      });
	}
	RemoveCard()
	{
		var data={

			cardid:this.props.cardid
		}
		this.props.dispatch(RemoveCard(data))
	}

    
    render() {
        var workflowid = this.props.workflowid;
        // console.log("this.props",this.props);
        const {Workflows} =this.props.pilotinfo; 
        const targetdata = Workflows.filter((workflow)=>{
          if(workflow.workflow_id == workflowid)
          {
            return workflow;
          }
        })
        var steps = targetdata[0].steps;
        return (
        <div  class="workFlowDetailPanel">  
          <Card  title="F0->F1" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <Timeline>
           {
            steps.map((one,i)=>{
            return <Timeline.Item key={i}>{ one.name }</Timeline.Item>
            })
           }
				  </Timeline>

		      </Card>
        </div>
      );
  }
}

