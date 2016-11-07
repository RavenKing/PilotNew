import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline,Button, Modal, Form, Input, Radio,Table} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify} from "../../Actions/pilotAction"



const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const { initdata } =props;
    console.log(initdata)
    return (
      <Modal
        visible={visible}
        title={initdata?"修改条目":"创建新条目"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入条目标题' }],
              initialValue: initdata?initdata.title:""

            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator('description',
            {initialValue:initdata?initdata.description:""}
            )(<Input type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);


@connect((store)=>{    
    return {
    	status:status,
        pilotinfo:store.pilotinfo
    };
    
})
export default class CourseDetail extends React.Component {
    constructor(props)
    {
      super(props)

     var courseid = this.props.courseid;
       const {pilotinfo} = this.props;
        const {Courses} =pilotinfo;
        const targetdata = Courses.filter((course)=>{
        if(course.course_id == courseid)
        {
          return course;
        }
      });

      const {details} = targetdata[0];
      this.state={
        targetdata:targetdata[0], 
        detail:details, 
        visible:false }

    }
    showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ 

    visible: false,
    editdata:null  
    });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);

//get maxid 

  var maxid = 0;
 const {detail} = this.state;

if(this.state.editdata == null)
      {
      detail.map((obj)=>{

        if(obj.id>maxid)
          maxid = obj.id

      });
      values.id = maxid +1; 
      detail.push(values);  
      }
      else
      {

        const newdetail = detail.filter((obj)=>{
        if(obj.id == this.state.editdata.id)
        {
          obj.title = values.title;
          obj.description=values.description;
        }
          return obj;
       });

      
        console.log(newdetail)
        this.setState(detail:newdetail)
      }
      form.resetFields();
      

      this.setState({ 
        visible: false ,
        editdata:null });
    });


  }
  saveFormRef(form) {
    this.form = form;
  }

	componentDidMount(){

      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
       this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
 		      var content = document.getElementById('content');
    	    content.classList.add('content-' + Math.floor(Math.random() * 3));
          		
      		//change status 
      	 	props.dispatch(ChangeToModify());
      		//add change card

              
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
  RemoveRow(e)
  {
     const deletedata = e.target.rel;
      const {detail} = this.state;
      let newdetail = detail.filter((obj)=>{
          if(obj.id != deletedata)
            return obj
      });
      this.setState({detail:newdetail})

  }

EditRow(e)
{

  let data = JSON.parse(e.target.rel);
      this.setState({
        visible:true,
        editdata:data}
        )

}
    
    render() {
 
      const columns= [
      { title: '行数',
        dataIndex: 'id',
        key: 'id',
        },
      {
        title: '条目',
        dataIndex: 'title',
        key: 'title',
      },     
       {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      { title: '操作', dataIndex: '', key: 'x', render: (key,record) =>( 
        <span>
        <a onClick={this.RemoveRow.bind(this)} rel={record.id}>删除|</a>
        <a onClick={this.EditRow.bind(this)} rel={JSON.stringify(record)}>修改</a>

        </span>
       )}

      ];
   
        return (
        <div  class="workFlowDetailPanel">  
        <Card  title={this.state.targetdata.title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>

        <Table dataSource={this.state.detail} columns={columns} pagination={false} />


          <Button type="primary" onClick={this.showModal.bind(this)}>新建条目</Button>
        <CollectionCreateForm 
          initdata = {this.state.editdata?this.state.editdata:null}
          ref={this.saveFormRef.bind(this)}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onCreate={this.handleCreate.bind(this)}
        />
        
		</Card>
        </div>
      );
  }
}

