import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {Card,Icon,Button,Form,Input,InputNumber,Steps,Timeline} from "antd";
import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction"



@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class DocumentPanel extends React.Component {
 
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

    render() {
      
        return (
				<div class="workFlowDetailPanel">

        <Card title="晋升现状"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>



				</Card>
				</div>
      );
  }
}

