import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {Card,Icon,Button,Form,Input,InputNumber,Row,Col,Select} from "antd";
import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction"
import {GetWorkflows,CreateDocument} from "../../../Actions/pilotAction";
const Option=Select.Option;


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo,
        auth:store.auth
    };
    
})
export default class DocumentPanel extends React.Component {
 
  constructor(props)
  {
    super(props)
    let user = {};
    if(props.auth.token.authorized == true)
    {
      user = props.pilotinfo.Pilot;
    }
    this.state={
      user:user,
      workflows:props.pilotinfo.Workflows
    }
  }
  SubmitDocument(){    

    let targetWorkflow= this.state.workflows.filter((workflow)=>{
      if(workflow.workflow_id == this.state.apply_workflow)
        return workflow;
    })

    let newDocument={
      cert_id:this.state.user.cert_id,
      workflow_id:this.state.apply_workflow,
      start_date:Date.now(),
      steps:targetWorkflow[0].steps
    } 
    this.props.dispatch(CreateDocument(newDocument));


  }
  onChangeApply(value){
    console.log(value)
    this.setState({
      apply_workflow:value
    })



  }

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
      const {user} = this.state;
      const {workflows} = this.state;
      const workflowoptions = workflows.map((workflow)=>{
        return <Option value={workflow.workflow_id} key={workflow.workflow_id}>{workflow.title}</Option>
      })      
        return (
				<div class="workFlowDetailPanel">

        <Card title="晋升现状"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>
          <Row>
            <Col span={8}>{user.name} |  {user.level.current_level} </Col>
              <Col span={8}>
                  <Select  style={{ width: 200 }}  placeholder="选择一个流程" onChange={this.onChangeApply.bind(this)}>
                    {workflowoptions}
                    </Select>
            </Col>
            <Col span={8}><Button type="primary" onClick={this.SubmitDocument.bind(this)}>申请</Button></Col>
          </Row>


				</Card>
				</div>
      );
  }
}

