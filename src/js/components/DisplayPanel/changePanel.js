
import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Col,Row } from "antd";
//pilot 
import { connect } from "react-redux";
import { browserHistory } from "react-router";
//Workflow

var placeholder = document.createElement("li");
	placeholder.className = "placeholder";

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
			steps:""
		}
	}

  
  componentWillMount(){
  	var steps = this.props.steps;
  	this.setState({steps:steps});
  }

  dragStart(e){
  e.dataTransfer.effectAllowed = 'move';
  this.setState({dragged:e.currentTarget});
  e.dataTransfer.setData("text/html",e.currentTarget);
  console.log("drag start");	
  // console.log("e.currentTarget",e.currentTarget);
  }

  dragOver(e){
  	
  	// console.log(placeholder);
  	e.preventDefault();
  	console.log("drag over",e.target);
  	this.state.dragged.style.display = "none";
  	if(e.target.className == "placeholder") return;
  	this.over = e.target;

  	var relY = e.clientY - this.over.offsetTop;
  	var height = this.over.offsetHeight/2;
  	var parent = e.target.parentNode;
  	if(relY > height)
  	{
  		this.setState({nodePlacement:"after"});
  		parent.insertBefore(placeholder, e.target.nextElementSibling);
  	}
  	else if(relY < height){
  		this.setState({nodePlacement:"before"});
  		parent.insertBefore(placeholder, e.target);
  	}
  }

  dragEnd(e){
  	this.state.dragged.style.display = "block";
  	this.over.parentNode.removeChild(placeholder);
  	var steps = this.props.steps;
  	console.log(this.state.dragged);
  	var fromNode = this.state.dragged;
  	var from = Number(fromNode.getAttribute("id"));
  	var toNode = this.over;
    var to = Number(toNode.getAttribute("id"));
    if(from < to) to--;
    if(this.state.nodePlacement == "after") to++;
    steps.splice(to, 0, steps.splice(from, 1)[0]);
    console.log("steps are",steps);
    this.setState({steps: steps});

  }


  render(){
  	const divStyle = {
            color: 'blue',
            background: '#ffffff',

          };

     var steps = this.state.steps;
     console.log("steps",steps);

     return(
     	<Card title = "课程流设置">

         </Card>
     	);
	
	}
}

