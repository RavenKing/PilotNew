import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Col,Row } from "antd";
import { Link } from "react-router";
import CreatePanel from "../CreatePanel/CreatePanel";
//pilot 
import {AddCardToDisplay} from "../../Actions/pilotAction"
import { setAreaDropable } from "../../interactScript";

import { connect } from "react-redux";
import { browserHistory } from "react-router";
//Workflow
import DisplayWorkFlow from "./DisplayWorkFlow";
import WorkFlowDetailPanel from "./WorkFlowDetailPanel"
import ChangePanel from "./changePanel"

import Courselist from "./Courselist";
import Coursedetail from "./Coursedetail";
import PersonalInfo from "./PersonalInfo";
import DisplayPromotion from "./Jinsheng";
import Stepdetail from "./Stepdetail";
import CompanyOverview from "./CompanyOverview";


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class DisplayPanel extends React.Component {   
   

   CloseMainCard(){

      this.props.dispatch(ShowMainPanel());

   }

  componentDidMount() {

      const props = this.props;
      const that = this;
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.data-item, .data-block',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              var x = event.dragEvent.clientX + window.scrollX;
              var y = event.dragEvent.clientY + window.scrollY;
              var data_id = draggableElement.getAttribute('data-id');
              switch(draggableElement.getAttribute('data-type')){
              case "ITEM":
              { 
                if (data_id ==1 )
                {
                    var cardinfo ={
                      x:x,
                      y:y,
                      type:"personalinfo"
                    }
                    props.dispatch(AddCardToDisplay(cardinfo))
                }
                else if(data_id ==2)
                {

                    var cardinfo ={
                      x:x,
                      y:y,
                      type:"displaypromotion"
                    }
                    props.dispatch(AddCardToDisplay(cardinfo))

                }
                 else if(data_id ==4)
                  {

                    var cardinfo = {
                      x:x,
                      y:y,
                      type:"workflowlist"
                      }
                    props.dispatch(AddCardToDisplay(cardinfo))
                  }
                  else if(data_id==5)
                  {
                    var cardinfo1 = {
                      x:x,
                      y:y,
                      type:"courselist"
                    }
                    props.dispatch(AddCardToDisplay(cardinfo1))

                  }
                  else if(data_id==6)
                  {
                    var cardinfo = {
                      x:x,
                      y:y,
                      type:"companyoverview"

                    }
               props.dispatch(AddCardToDisplay(cardinfo))


                  }
                  break;
              }
              case "TITLE":
              {
                  
   
              }
              case "FUNC":
              {
                  
                  if(data_id == "1"){
                    
                  }
                  else if(data_id == "2")
                  {
                  }
                  else if(data_id == "4"){
                  }

                  break;
              }
              default:
                  ;
              }
              
          }
      });
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      
  }

  render() {
      var displayarea;
      const {pilotinfo}=this.props;
      const { status } = pilotinfo;
      const { activeworkflow } = pilotinfo;
      var { Workflows } = pilotinfo;

      // var steps = this.props.pilotinfo.steps;
      if(status == "INIT")
      {
        if(pilotinfo.display.length!=0)
        {
          displayarea =  pilotinfo.display.map((one)=>{
          switch(one.type){
          case "workflowlist":
            {
              return <DisplayWorkFlow key={one.cardid}  cardid={one.cardid}/> ;
                  break;
            }
          case "workflowdetail":
            { 
              return <WorkFlowDetailPanel key={one.cardid} cardid={one.cardid} workflowid = {one.workflowid}/>     
                    break;
              }
          case "courselist":
          {
            return <Courselist key={one.cardid} cardid={one.cardid} />
              break;
          }
          case "coursedetail":
          {
            return <Coursedetail key={one.cardid} cardid={one.cardid} courseid={one.course_id} />
            break;
          }
          case "personalinfo":
          {
              return <PersonalInfo  key={one.cardid} cardid={one.cardid} />
            break;
          }
          case "displaypromotion":
          {
              return <DisplayPromotion key={one.cardid} cardid={one.cardid} />
              break;
          }
          case "stepdetail":
          {
            return <Stepdetail key={one.cardid} cardid={one.cardid} sequence={one.sequence}/>
            break;
          }
          case "companyoverview":{
              return <CompanyOverview key={one.cardid} cardid={one.cardid} />
              break;
          }

          }
          });


        }
      }
      if(status == "MODIFY")
      {
        const targetdata = Workflows.filter((workflow)=>{
          if(workflow.workflow_id == activeworkflow)
          {
            return workflow;
          }
        
        });
        var steps = targetdata[0].steps;
        console.log("steps",steps);
        if(steps.length!=0)
          displayarea =  <ChangePanel steps = {steps} />;
      }

      return (
      <div className="display-panel helpbgkm">  
        { displayarea }
      </div>
      );
  }
}
