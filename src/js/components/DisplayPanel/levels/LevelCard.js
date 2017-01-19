
import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Col,Row } from "antd";
//pilot 
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import {RemoveCard,AddCardToDisplay,DeleteCompany,CreateCompany,EditCompany} from "../../../Actions/pilotAction"

import { setCardDragable,handleFocus,setAreaDropable} from "../../../interactScript";
import LevelTable from "./LevelTable";
//Workflow

// var placeholder = document.createElement("li");
// placeholder.className = "placeholder";


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };   
})

export default class LevelCard extends React.Component {   

  constructor(props){
		super(props);
		this.state = {}
	}
 componentDidMount() {
         
      const props = this.props;
      const that = this;
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   
         this.interactable = setAreaDropable({
          element: ReactDOM.findDOMNode(this),
          accept: '.function-button,.func-item,.func-item1',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              var x = event.dragEvent.clientX + window.scrollX;
              var y = event.dragEvent.clientY + window.scrollY;
              var data_id = draggableElement.getAttribute('data-id');
              var data = {
                x:x,
                y:y
              }
              switch(data_id){
              case "Create":
              { 
               that.setState({
                targetdata:null,
                visible:true})
               break;
              }
              case "Edit":
              {
                if(that.state.targetdata==null)
                  message.error("请选择一个公司")
                else
                that.setState({visible:true})
                break;
              }
              case "Delete":
              {
               if(that.state.targetdata) 
              {              
                that.setState({deletevisible:true})
              }
              else 
                message.error("请选择一个公司")
              }
              default:
                  ;
              }
              
          }
      });
  }


  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }
  render(){
     return(

        <div className="detail-panel">  
          <Card title="等级管理" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <LevelTable />
          </Card>
        </div>
     	);
	}
}

