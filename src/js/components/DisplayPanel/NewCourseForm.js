import React from "react";
import ReactDOM from "react-dom";
import {Button,Table,Card,Icon,Form,Modal,Input,Select,Upload, message} from "antd";
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option=Select.Option;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const { initdata } =props;
    const uploadprops = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            action: 'http://localhost:8083/api/upload_course',
            onChange(info) {
              const status = info.file.status;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
};
    return (
      <Modal
        visible={visible}
        title={initdata?"修改课程":"创建新课程"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
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

           <FormItem label="模板文档">
            {getFieldDecorator('url',
            {initialValue:initdata?initdata.url:""}
            )(
            <div style={{ marginTop: 16, height: 180 }}>
              <Dragger {...uploadprops}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或者拖动上传文件</p>
                <p className="ant-upload-hint">支持单点上传</p>
              </Dragger>
            </div>
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CollectionCreateForm;