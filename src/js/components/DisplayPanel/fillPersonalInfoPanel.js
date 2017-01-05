import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {Card,Icon,Button,Form} from "antd";

import {RemoveCard} from "../../Actions/pilotAction"

import PersonalForm from "./fillpersonalInfo"


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
       setCardDragable(ReactDOM.findDOMNode(this));
       handleFocus(ReactDOM.findDOMNode(this));
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
      const {Companys}= pilotinfo;
      console.log(Companys)

        return (
				<div class="detail-panel">

        <Card title="个人资料"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>
 <PersonalForm personaldata={pilotinfo.Pilot} 
      companys={Companys}
      disabled={false}
  
    />

				</Card>
				</div>
      );
  }
}

