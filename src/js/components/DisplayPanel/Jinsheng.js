import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {Card,Icon,Button,Form,Input,InputNumber,Steps,Timeline} from "antd";
import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"



@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class Jingshen extends React.Component {
 
    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   
    }
    componentWillUnmount() {
    }

  RemoveCard()
  {
    var data={

      cardid:this.props.cardid
    }
    this.props.dispatch(RemoveCard(data))
  }
  GetStep(e){

    var cardinfo={
      type:"stepdetail",
      sequence:e.target.rel
    }
    this.props.dispatch(AddCardToDisplay(cardinfo))
    console.log(e.target.rel)
  }

    render() {
      const { pilotinfo} = this.props;
      const {Pilot} = pilotinfo;
      const {Document} = pilotinfo;
      const {flightinfo} = Pilot;
      console.log(Document);
      const stepdisplay= Document.steps.map((step)=>{
          let colorstep = "green";
          if(step.status == null)
            colorstep = "red";
          else if(step.status == "inprocess")
            colorstep = "blue"
        return <Timeline.Item color = {colorstep}>{<a onClick={this.GetStep.bind(this)} rel={step.sequence}>{step.name}</a>}</Timeline.Item>

      })
        return (
				<div class="workFlowDetailPanel">

        <Card title="晋升现状"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>

     <Timeline>
    <Timeline.Item color="green">{Document.previous_level}</Timeline.Item>
    {stepdisplay}
    <Timeline.Item color="red">{Document.target_level}</Timeline.Item>
     </Timeline>

				</Card>
				</div>
      );
  }
}

