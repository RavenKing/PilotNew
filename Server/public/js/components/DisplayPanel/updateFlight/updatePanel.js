import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay,UPDATE_PILOT_FLIGHT} from "../../../Actions/pilotAction"
import {Card,Row,Col,Icon,Button,Select,Upload,message,Table,Input,Modal,Spin,Collapse} from "antd";
const Panel = Collapse.Panel;
const Dragger=Upload.Dragger;
const Option = Select.Option;


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class updatePanel extends React.Component {
        
//modal  setup 
    handleOk()
    {
      this.UploadToMongo();
      this.setState({visible:false})
      this.RemoveCard();
    }
    handleCancel(){
      this.setState({visible:false})
    }

    Confirm(){
      this.setState({visible:true})
    }
//end of modal setup 




        Reload(){
          this.setState({showresult:false,type:"updateFlight",loading:false})
        }
        constructor(props)
        {
          super(props)
          this.state={showresult:false,visible:false,loading:false}
        }
        RemoveCard(){
              var targetcard = {
              cardid : this.props.cardid
            }
            this.props.dispatch(RemoveCard(targetcard));

        }
        UploadToMongo(){

        this.setState({loading:true});
          const {data} = this.state.targetFile;

          data.map((record)=>{
            const target={
            target:{
            cert_id:record.cert_id},
            updatepart:record
            }
            this.props.dispatch(UPDATE_PILOT_FLIGHT(target))

          });


        }
        handleChange(){

        }

        componentDidMount() {
         setCardDragable(ReactDOM.findDOMNode(this));
              handleFocus(ReactDOM.findDOMNode(this));   
          }


       onChange(info) {
                      const status = info.file.status;
                      let fileList = info.fileList;
                      this.setState({loading:true})
                      if (status !== 'uploading') {
                              console.log(info.file, info.fileList);
                            }
                            if (status === 'done') {
                              const {response} = info.file
                              this.setState({targetFile:response,showresult:true,loading:false});
                              message.success(`${info.file.name} file uploaded successfully.`);
                            } else if (status === 'error') {
                              message.error(`${info.file.name} file upload failed.`);
                            }
                            console.log(info)
        }


render() {

            //settings for upload

              const uploadprops = {
                          name: 'file',
                          multiple: true,
                          action: 'http://localhost:8083/api/upload_flight',
                          onChange:this.onChange.bind(this),
                          showUploadList:false  ,
                  };
            //end of setting


          let displayTable = <div></div>
           if(this.state.showresult)
          {

            let columns=[]
            const {data} = this.state.targetFile;
            for( var key in data[0])
            {

            
              let title="";
              if(key == "OriginFlightTime")
              {
                title="已有飞行时间"
              } 
              else if(key=="UpdatedFlightTime"){
                title="更新后飞行时间"
              }
              else if(key=="cert_id")
              {
                title="身份证"
              }
              else if(key=="flightTime")
              {
                title="更新时间"
              }
              else if(key=="flightRoute")
              {
                title="更新航段"
              }      
              else if(key=="name")
              {
                title="飞行员"
              }
               else if(key=="OriginFlightRoute")
              {
                title="已有航段数"
              }
                 else if(key=="UpdatedflightRoute")
              {
                title="更新后航段数"
              }
              else if(key=="OriginflightRealTime")
              {
                title="已有模拟机时间"
              }
                   else if(key=="UpdatedflightRealTime")
              {
                title="更新后模拟机时间"
              }
          else if(key=="OriginFlightRealRoute")
              {
                title="已有起落数"
              }
                else if(key=="UpdatedflightRealRoute")
              {
                title="更新后起落数"
              }
                 else if(key=="OriginFlightTotalTime")
              {
                title="已有总经历时间"
              }
               else if(key=="UpdatedflightTotalTime")
              {
                title="更新后总经历时间"
              }
               else if(key=="flightTotalTime")
              {
                title="更新总经历时间"
              } else if(key=="flightRealTime")
              {
                title="更新模拟机时间"
              }

              else if(key=="flightRealRoute")
              {
                title="更新起落数"
              }






             const columnone={
              title:title==""?key:title,
              dataIndex:key,
              key:key
             }

             columns.push(columnone);
            }
            displayTable=<div> <h1>上传预览</h1><Table bordered  columns={columns} dataSource={data}  /> </div>
          }
          else{
       displayTable=(<div style={{ marginTop: 16, height: 180 }}>
          <Dragger {...uploadprops} name="flightinfo" id='upFlight' >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">拖动或者点击上传文件</p>
            <p className="ant-upload-hint">请根据模板上传</p>
          </Dragger>
        </div>)

      }
              return (
              <div className="detail-panel">

              <Card title="更新飞行员信息" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
              <Spin spinning={this.state.loading}>
              <Collapse defaultActiveKey={['1']} >
    

                <Panel header="上传提示" key="1">
                  <p>请根据模板上传，仅限更新飞行员飞行信息，飞行时间，起落数</p>
                          </Panel>
            </Collapse>
                 <Row class="margin-top10">
                        <Col span={21}>
              <Select
                style={{ width: 400 }}
                  placeholder="请选择一个模板"
                  defaultValue="updateflights"
                  onChange={this.handleChange.bind(this)}  
                  >
                  <Option value="updateflights">更新飞行信息</Option>
                  <Option value="test">空白</Option>
              </Select>

              </Col>
              <Col span={2}><Button type="ghost"  shape="circle" icon= "reload" onClick={this.Reload.bind(this)}/> </Col>
              <Col span={1}><Button type="primary"  shape="circle" icon= "caret-right" onClick={this.Confirm.bind(this)}/></Col>
              </Row>
                  {displayTable}
                  </Spin>
              </Card>



          <Modal title="确认框" visible={this.state.visible}
                onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
            >
              <p>确定要更新吗？</p>
            </Modal>
                  </div>
            );
        }

}