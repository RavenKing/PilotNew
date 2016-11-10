import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal} from "antd";



import NewCourseForm from "./NewCourseForm";



@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class Courselist extends React.Component { 
  constructor(props)
  {
      super(props)


    console.log(this.props.pilot);
    const {Courses} = this.props.pilot;
      this.state={ 
        visible:false,
        editdata:null,
        list:Courses
      }



  }

  showModal()
{
  this.setState({visible:true})
}


    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

OpenCourseDetail(e)
{

  let course_id = e.target.rel;
  let data = {
    type:"coursedetail",
    course_id : course_id
  }
  this.props.dispatch(AddCardToDisplay(data));
}

  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }


///
saveFormRef(form){this.form = form;}


    RemoveRow(e){

      const deletedata = e.target.rel;
      const {list} = this.state;
      let newlist = list.filter((obj)=>{
          if(obj.course_id != deletedata)
            return obj
      });
      this.setState({list:newlist})
    }


    EditRow(e){
       let data = JSON.parse(e.target.rel);
      this.setState({
        visible:true,
        editdata:data}
        )

    }

    // close course
    onCancel(){this.setState({visible:false})}

    //create course
    onCreate(){
  const form = this.form;
//edit null? create : save
   const {list} = this.state;
 form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(this.state.editdata==null )
      {
        list.push(values)
      }
      else
      {
        //find target 
          let newcourse=list.filter((course)=>{

                if(course.course_id == this.state.editdata.course_id)
                {
              
                    course.course_id   = values.course_id;
                    course.title = values.title;
                    course.description = values.description;
                    course.category = values.category;
                }
                return course
          })
        //setState

        this.setState({list:newcourse,editdata:null})
      }





    })


   form.resetFields();
      this.setState({ 
        visible: false ,
        editdata:null });


    }

////



  render() {

//table colume config 
const columns = [{
  title: '课程编号',
  dataIndex: 'course_id',
  key: 'course_id',
  render: (text,record) => <a href="#" onClick={this.OpenCourseDetail.bind(this)} rel={record.course_id}>{text}</a>,
}, {
  title: '课程名字',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '课程类型',
  dataIndex: 'category',
  key: 'category',
}, {
  title: '描述',
  key: 'description',
  dataIndex:'description'
},
      { 
        title: '操作', dataIndex: '', key: 'x', render: (key,record) =>( 
        <span>
        <a onClick={this.RemoveRow.bind(this)} rel={record.course_id}>删除|</a>
        <a onClick={this.EditRow.bind(this)} rel={JSON.stringify(record)}>修改</a>
        </span>
       )}

  
];

        return (
        <div className="detail-panel">  
        <Card title="课程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>课程列表</h1>
        <Button type="primary" onClick={this.showModal.bind(this)}>新建课程</Button>
         <Table columns={columns} dataSource={this.state.list}  />
        </Card>


        <NewCourseForm
          visible={this.state.visible}
          initdata={this.state.editdata}
          ref={this.saveFormRef.bind(this)}
            onCancel={this.onCancel.bind(this)}
            onCreate={this.onCreate.bind(this)}
        />
        </div>
      );
  }

}