import React from "react";
import { Table, Input, Popconfirm,Button } from 'antd';
import  EditableCell from "./LevelInput";
import LevelForm from "./LevelForm"
import ReactDOM from "react-dom";
import { connect } from "react-redux"


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'flight_factor',
      dataIndex: 'flight_factor',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'flight_factor', text),
    }, {
      title: 'level',
      dataIndex: 'level',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'level', text),
    }, {
      title: 'description',
      dataIndex: 'description',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'description', text),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].flight_factor;
        return (<div className="editable-row-operations">
          {
            editable ?
            <span>
              <a onClick={() => this.editDone(index, 'save')}>Save</a>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
            :
            <div>
            <span>
              <a onClick={() => this.edit(index)}>Edit|</a>
            </span>            
            <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record)}>
                <a>Delete</a>
              </Popconfirm>
            </span>
          	</div>
          }
        </div>);
      },
    }];
    this.state = {
       visible:false,
      data: [{
        key: '0',
        flight_factor: {
          editable: false,
          value: '等级',
        },
        level: {
          editable: false,
          value: 'F0',
        },
        description: {
        	editable:false,
          value: 'Level 0',
        },
      }],
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
			description:one.description.value
  	}
  });
	console.log(commitentries)
  	const {pilot}=this.props;
  	 console.log(pilot);



  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
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
	let newdata = data.filter((one)=>{
		if(one.level.value!=selected.level&&one.flight_factor.value!=selected.flight_factor)
		return one
	});
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
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return( 
<div>
    <Table bordered dataSource={dataSource} columns={columns} />
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