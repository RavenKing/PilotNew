import React from "react";
import ReactDOM from "react-dom";
import {Checkbox,Button,Table,Card,Icon,Form,Modal,Input,Select,Upload, message} from "antd";
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option=Select.Option;

const CollectionCreateForm = Form.create()(
  React.createClass({

getInitialState(){

    const { initdata } =this.props;
    if(initdata)
    { 
      if(initdata.attachments)
      {
        let data = initdata.attachments.map((one,index)=>{
          one.key = index;
          return one });
        initdata.attachments = data;
      }
    }

  let list = initdata?initdata.attachments:[];
  return {
    attachments:list,
    fileList:list
  }
},

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
     
    if(nextProps.initdata==null)
    {
      this.setState({attachments:[]});
    }

     if(nextProps.initdata)
      {  
        const{initdata}=nextProps;
        if(initdata.attachments)
      {
        let data = initdata.attachments.map((one,index)=>{
          one.key = index;
          return one });
        initdata.attachments = data;
      }
      else{
        this.setState({attachments:[]})
      }
        this.setState({attachments:initdata.attachments})
      }
     },

    deleteRow(filename){
      console.log(filename)
      let newattachments = this.state.attachments.filter((attachment)=>{if(attachment.filename!=filename) return attachment})
      this.setState({attachments:newattachments})
    },


onChange(info) {
              const status = info.file.status;
              let fileList = info.fileList 
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                  let data = {
                      name:info.file.name,
                       filename:info.file.response.filename,
                       url:"http://localhost:8083/uploads/"+info.file.response.filename};
                this.state.attachments.push(data);
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
              console.log(info)
              this.setState({fileList});
            },
onNewCreate(){
   const {form,onCreate} = this.props;
   console.log(this.state);
   form.setFieldsValue({attachments:this.state.attachments});
    this.props.form.setFieldsValue({attachmentsvalue:this.state.attachments})
   let data = form.getFieldValue("attachments");
   console.log(data)
   onCreate();
},
render(){ 
   const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = this.props.form;
  const {initdata} =this.props;
    const uploadprops = {
            name: 'file',
            multiple: true,
            action: 'http://localhost:8083/api/upload_course',
            onChange:this.onChange,
            showUploadList:false  ,
            fileList:this.state.fileList
    };
    this.state.fileList=this.state.attachments;
    let uploadedfile = <div></div>
    if(this.state.attachments)
    {   
      console.log(this.state.attachments)
         uploadedfile = this.state.attachments.map((one)=>{
          return (<div key={one.url}><a href={one.url}>{one.name}|</a><Icon type='delete' /><a onClick={this.deleteRow.bind(this,one.filename)}>Delete</a></div>)
          });    
    }

    console.log(this.state)
    return (
      <Modal
        visible={visible}
        title={initdata?"修改课程":"创建新课程"}
        okText="保存"
        onCancel={onCancel}
        onOk={this.onNewCreate.bind(this)}
      >
        <Form vertical>
          <FormItem label="课程编号">
            {getFieldDecorator('course_id', {
              rules: [{ required: true, message: '自定义课程编号' }],
              initialValue: initdata?initdata.course_id:""

            })(
              <Input />
            )}
          </FormItem>
                    <FormItem label="课程标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入课程标题' }],
              initialValue: initdata?initdata.title:""

            })(
              <Input />
            )}
          </FormItem>
            <FormItem label="课程类型">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: '请输入课程标题' }],
              initialValue: initdata?initdata.category:""

            })(
                <Select style={{width:200}}>
                <Option value="课程">课程</Option>
                <Option value="表格">表格</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator('description',
            {initialValue:initdata?initdata.description:""}
            )(<Input type="textarea" />)}
          </FormItem>         
<FormItem label="已经上传文档">
  {uploadedfile}
</FormItem>
           <FormItem label="模板文档">
            {getFieldDecorator('attachments')(
            <div style={{ marginTop: 16, height: 180 }}>
        <Dragger {...uploadprops} name="attachments" id='upfile' >
          <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            </div>
              )}
          </FormItem>


        </Form>
      </Modal>
    );
  },
})
);

export default CollectionCreateForm;