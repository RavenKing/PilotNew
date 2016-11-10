import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {Card,Icon,Button,Form,Input,InputNumber,Steps,Timeline, Menu, Dropdown,Progress,Row,Col,message} from "antd";

import {RemoveCard} from "../../Actions/pilotAction"

import PersonalForm from "./personalform"


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class PersonnalPanel extends React.Component {
  constructor(props)
  {
      super(props)
      this.state={disabled:true}

  }
 
    componentDidMount(){
      const that = this;
       setCardDragable(ReactDOM.findDOMNode(this));
       handleFocus(ReactDOM.findDOMNode(this));
           this.interactable = setAreaDropable({
          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
             let draggableElement = event.relatedTarget;
             var data_id = draggableElement.getAttribute('data-id');
             switch(data_id)
             {
              case "Create":
              {
                message.error("请在首页注册")

              }
              case "Edit" : 
              {
                that.setState({disabled:false})
                break;
              }
             }

              
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
      const { pilotinfo} = this.props;
      const {Pilot} = pilotinfo;
      const {flightinfo} = Pilot;

        return (
				<div class="detail-panel">

        <Card title="个人资料"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>

        <Row>
      <Col span={12}> 
      <h3>总飞行时间:</h3>
        <p class="margin100">
        <Progress type="circle" percent={100} status="active" format={() => {return flightinfo.flightTime+"小时"} } />
        </p>
      </Col>
      <Col span={12} >

       <h3>总飞行航段:</h3>
       <p class="margin100">
        <Progress type="circle" percent={100} format={() => {return flightinfo.flightRoute+'个'} } />
       </p>
       </Col>
    </Row>
    <PersonalForm personaldata={pilotinfo.Pilot} 
      disabled={this.state.disabled}
  
    />

				</Card>
				</div>
      );
  }
}

