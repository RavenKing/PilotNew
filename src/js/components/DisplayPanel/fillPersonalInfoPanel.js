import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {Card,Icon,Button,Form,Modal,Progress} from "antd";
import {UPDATE_PILOT_DATA,GetCurrentLevelInfo} from "../../Actions/pilotAction.js";
import {RemoveCard} from "../../Actions/pilotAction"
import PersonalForm from "./fillpersonalInfo"


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo,
        auth:store.auth.token
    };
    
})
export default class PersonnalPanel extends React.Component {
  constructor(props)
  {
      super(props)
      let persondata = {};
      let own = true;
      if(this.props.person)
      {
            persondata = this.props.person
      }
      else{
      const {pilotinfo} = this.props;
      const {Pilot} = pilotinfo;
        persondata = Pilot;
        own=false;
        this.props.dispatch(GetCurrentLevelInfo(persondata.level.current_level));
      }
      this.state={
        persondata:persondata,
        disabled:true}
  }
  update_pilot_data(data)
  {
    let user ={}
    if(this.state.own==true)
    {
    user = this.props.auth.user;
    }
    else
    {
      user = this.state.persondata;
    }
    this.props.dispatch(UPDATE_PILOT_DATA(user.cert_id,data));
    Modal.success({title:"信息保存完毕",content:(<div>信息保存完毕</div>)});
    this.RemoveCard();

  }
 componentWillReceiveProps(nextProps){
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

      const {Companys}= this.props.pilotinfo;
      const {Levels,LevelInfo} = this.props.pilotinfo;
      console.log(LevelInfo);
      var progressdata=50;
      if(LevelInfo.flight_base)
      {

        progressdata = parseInt(this.state.persondata.flightinfo.flightTime / LevelInfo.flight_base)
        if(progressdata >100 )
          progressdata = 100
      }





        return (
				<div class="detail-panel">

        <Card title="个人资料"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>
            <h2>满足下一级的升级要求</h2>
            <Progress percent={progressdata} />
             <PersonalForm personaldata={this.state.persondata} 
                  companys={Companys}
                  levels={Levels}
                  disabled={false}
                  update_data={this.update_pilot_data.bind(this)}     
                />

				</Card>
				</div>
      );
  }
}

