import React from "react";
import ReactDOM from "react-dom";
import {Modal,Row,Col,Form,Checkbox } from "antd";

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const { conditions } =props;
   	const list = conditions.map((condition)=>{
    		return (
    			<Row key={condition}>
    			<Col span={12} >
    			{condition}
    			</Col>
    			<Col span={12}>
    			<Checkbox />
    			</Col>
    			</Row>

    			)

    })
    return (
      <Modal
        visible={visible}
        title={"检查申请材料"}
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
      {list}
      </Modal>
    );
  }
);

export default CollectionCreateForm;