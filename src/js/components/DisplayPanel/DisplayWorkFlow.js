import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Table,Card,Icon} from "antd";


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class DisplayWorkFlow extends React.Component { 

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

    WorkFlowDetail(e){
      console.log(e.target.rel)
      console.log("workflow detail view")
      var data = {
        type:"workflowdetail",
        workflowid:e.target.rel,
        cardid:Math.random()*10000000
      }
      this.props.dispatch(AddCardToDisplay(data))

    }

  RemoveCard()
  {
    console.log(this.props.cardid)
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }

  render() {

const columns = [{
  title: 'workflow_id',
  dataIndex: 'workflow_id',
  key: 'workflow_id',
  render: (text,record) => <a href="#" onClick={this.WorkFlowDetail.bind(this)} rel={record.workflow_id}>{text}</a>,
}, {
  title: 'description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions<Icon type="down" />
      </a>
    </span>
  ),
}];

const {Workflows} = this.props.pilot;






        return (
        <div className="detail-panel">  
        <Card title="流程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>飞行员训练等级选择</h1>
         <Table columns={columns} dataSource={Workflows}  />
        </Card>
        </div>
      );
  }

}