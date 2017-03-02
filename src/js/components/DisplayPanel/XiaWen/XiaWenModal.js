import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import moment from 'moment';

import {Button,Table,Card,Icon,Form,Modal,Input,Select,Checkbox,Row,Col,DatePicker} from "antd";
const FormItem = Form.Item;

class CollectionCreateForm1 extends React.Component{
  
    constructor(props)
    { 
      super(props);
    }



    render(){
    
    const { visible, onCancel, onCreate, form} = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    return (
      <Modal
        visible={visible}
        title={"添加下文"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
    
                 <Row>
                    <Col span={12}>
                        <FormItem label="下文名称">
                        {getFieldDecorator('xiawen_name', {
                          //initialValue:personaldata.name
                        })(
                          <Input addonBefore={<Icon type="book" />} placeholder="下文名称"      style={{ width: 200 }}/>
                        )}
                      </FormItem>
                </Col>
                <Col span={12}>
                     <FormItem label="下文时间">
                        {getFieldDecorator('xiawen_date', {
                          //initialValue:personaldata.cert_id
                        })(
                           <DatePicker format = 'YYYY-MM-DD' style={{ width: 200 }} />
                        )}
                      </FormItem>
                </Col>
              </Row>
        </Form>
      </Modal>
    ); 
  } 
}


const CollectionCreateForm = Form.create()(CollectionCreateForm1);

export default CollectionCreateForm;