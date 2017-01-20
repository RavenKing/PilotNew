import React from "react";
import ReactDOM from "react-dom";
import {Button,Table,Card,Icon,Form,Modal,Input,Select,Tag} from "antd";

const FormItem = Form.Item;
const Option=Select.Option;



const CollectionCreateForm = Form.create()(
React.createClass({
  getInitialState(){

    this.props.form.setFieldsValue({keys:[0]});
    return {
      counter:0
    }
  },
  componentWillMount(){
    this.props.form.setFieldsValue({shit:1});
        this.props.form.setFieldsValue({keys:[0]});
  },
  componentWillReceiveProps(nextProps){
     if(nextProps.initdata)
        this.setState({counter:nextProps.initdata.departments.length})
     },
  onCloseTag(department1)
  {
    const {initdata} = this.props;

    var newdepartments = initdata.departments.filter((department)=>{if(department.name!=  department1.name)return department1});
   this.props.form.setFieldsValue({departments:newdepartments});
  },
addDepartment()
    {
    let newcounter = this.state.counter;
    newcounter++;
    this.setState({counter:newcounter})
    const {form} = this.props;
    let keys=form.getFieldValue('keys');
    if(keys == null)
    {
       this.props.form.setFieldsValue({keys:[0]});
    }
    else
    {
    const nextkeys= keys.concat(newcounter);
    form.setFieldsValue({keys:nextkeys});
    }
    },
    removeDepartment(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');

    const keysdata=keys.filter(key => key !== k)

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  },

  render(){
   const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator,getFieldValue,setFieldsValue } = form;
    const { initdata } = this.props;
    //init null
    var departmenttag =null
    var formItems=null;

 let formitemsdata =getFieldValue('keys'); 
 console.log(getFieldValue("shit"))
 console.log(formitemsdata);
 if(!formitemsdata)
 {
   getFieldDecorator('keys', { initialValue: [0] });
   }

    if(formitemsdata)
    { 
      formItems = formitemsdata.map((k) => {
      return (
        <Form.Item  label={`部门：`} key={k}>
          {getFieldDecorator(`department${k}`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "department"
            }],
          })(
            <Input style={{ width: '60%', marginRight: 8 }} />
          )}
          <Button onClick={() => this.removeDepartment(k)}>Remove</Button>
        </Form.Item>
      );
    });}
  else
   {  formItems=<div></div>}
if(initdata)
{    
  if(initdata.departments.length!=0)
  {
  let displaydata =  initdata.departments.map((department,k)=><Tag closable key={k} onClose={this.onCloseTag.bind(this,department)}>{department.name}</Tag>);
  
  departmenttag=
  <FormItem>
  {getFieldDecorator('departments',{
    initialValue:initdata.departments
  })(
  
  <div>
  {displaydata}
  </div>

  )
  }
</FormItem>
   
  }
}

return (
      <Modal
        visible={this.props.visible}
        title={initdata?"修改公司信息":"创建新公司"}
        okText="保存"
        onCancel={this.props.onCancel}
        onOk={this.props.onCreate}
      >
        <Form vertical>
          <FormItem label="公司编号">
            {getFieldDecorator('company_id', {
              rules: [{ required: true, message: '自定义公司编号' }],
              initialValue: initdata?initdata.company_id:""

            })(
              <Input disabled={initdata?true:false}/>
            )}
          </FormItem>
                    <FormItem label="公司名称">
            {getFieldDecorator('company_name', {
              rules: [{ required: true, message: '请输入公司名称' }],
              initialValue: initdata?initdata.company_name:""

            })(
              <Input />
            )}
          </FormItem>
            <FormItem label="公司地址">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入公司地址' }],
              initialValue: initdata?initdata.address:""

            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator('description',
            {initialValue:initdata?initdata.description:""}
            )(<Input type="textarea" />)}
          </FormItem>
          {departmenttag?departmenttag:<div></div>}
          {formItems?formItems:<div></div>}
          
          <FormItem wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={this.addDepartment} style={{ marginRight: 8 }}>添加部门</Button>

        </FormItem>

        </Form>
      </Modal>
    );
  }

})
)


export default CollectionCreateForm;