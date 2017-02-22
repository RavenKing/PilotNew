import React from "react";
import { Table, Input, Popconfirm,Button,InputNumber,Modal } from 'antd';
import  EditableCell from "./LevelInput";
import LevelForm from "./LevelForm"
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {upsertLevel} from "../../../Actions/pilotAction";


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const {Levels} = this.props.pilot;
   var leveldata=[]
  if(!Levels)
  {
  }
  else{
    var leveldata = Levels.entries.map((one)=>{
      return {
        flight_base:{
          editable:false,
          value:one.flight_base
        },
        flight_factor: {
          editable: false,
          value: one.flight_factor,
        },
        level: {
          editable: false,
          value: one.level,
        },
        description: {
          editable:false,
          value: one.description,
        },
      }
    })
  }
    this.state = {
       visible:false,
      data: leveldata
    };
  }
addLevel(){
	this.setState({visible:true})
}
// for modal 
onCancel(){
	this.setState({visible:false})
}

 onCreate(){
  const form = this.form;
 form.validateFields((err, values) => {
 	const {data} = this.state;
	let newone= {
  flight_base:{editable:false,value:values.flight_base},
	flight_factor:{ editable:false, value:values.flight_factor},
	level:{ editable:false, value:values.level},
	description:{ editable:false, value:values.description},
	}
 	data.push(newone);
      if (err) {
        return;
      }
     //   this.props.dispatch(CreateLevel(values));
    });
   form.resetFields();
      this.setState({ 
        visible: false});
}

saveFormRef(form){this.form = form;}
//
  saveLevel(){


  	let commitentries = this.state.data.map((one)=>{
  	return {

			level:one.level.value,
			flight_factor:one.flight_factor.value,
      flight_base:one.flight_base.value,
			description:one.description.value
  	}
  });

  	const {Pilot}=this.props.pilot;

    let cert_id = Pilot?Pilot.cert_id:"310228199012202218";
     var newlevel = {
        name:"default",
        inuse:true,
        modify_time:Date.now(),
        modifyer:cert_id,
        entries:commitentries
     };
    
    var constructdata = {
      target:{name:"default"},
      updatepart:newlevel
    }

  this.props.dispatch(upsertLevel(constructdata))
Modal.success({title:"等级保存完毕",content:(<div>等级保存完毕</div>)});
this.props.removeCard();
  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }


  delete(selected){
	const {data}=this.state;
  console.log("selected",selected.level.value)
 	let newdata = data.filter((one)=>{
		if(one.level.value!=selected.level.value)
		return one
	});
  console.log(newdata)
	this.setState({
		data:newdata
	})


  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
     console.log(data);
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  render() {
    const { data } = this.state;
    console.log(data);
    //set up columns
    const columns = [

    {
      title: '飞行基数',
      dataIndex: 'flight_base.value',
      width: '10%',
      render: (text, record, index) => this.renderColumns(data, index, 'flight_base', text),
        },
    {
      title: '等级系数',
      dataIndex: 'flight_factor.value',
      width: '25%',
            render: (text, record, index) => this.renderColumns(data, index, 'flight_factor', text),
        }, {
      title: '等级',
      dataIndex: 'level.value',
      width: '15%',
         render: (text, record, index) => this.renderColumns(data, index, 'level', text),

       }, {
      title: '描述',
      dataIndex: 'description.value',
      width: '30%',
         render: (text, record, index) => this.renderColumns(data, index, 'description', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].flight_factor;
        return (<div className="editable-row-operations">
          {
            editable ?
            <span>
              <a onClick={() => this.editDone(index, 'save')}>保存|</a>
              <Popconfirm title="确定要取消吗?" onConfirm={() => this.editDone(index, 'cancel')}>
                <a>取消</a>
              </Popconfirm>
            </span>
            :
            <div>
            <span>
              <a onClick={() => this.edit(index)}>修改|</a>
            </span>            
            <span>
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
            </div>
          }
        </div>);
      },
    }];
    //end of setup columns
    
    return( 
<div>
    <Table bordered dataSource={data} columns={columns} />
 	<Button onClick={this.addLevel.bind(this)} > 添加等级 </Button>
 	<Button onClick={this.saveLevel.bind(this)} > 提交 </Button>
     
     <LevelForm 
		visible={this.state.visible}
		initdata={null}
		onCancel ={this.onCancel.bind(this)}
	    onCreate = { this.onCreate.bind(this)}
	     ref={this.saveFormRef.bind(this)}
        />
 </div>)
  }
}