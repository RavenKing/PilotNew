import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay,UPDATE_PILOT_DATA} from "../../../Actions/pilotAction";
import {GetQueryResults,DeletePilot,GetWorkFlowById} from "../../../Actions/QueryAction";
import {Button,Table,Card,Icon,Form,Modal,Select,notification } from "antd";
import AnalysisFlight from "./AnalysisFlight"
import QuerySearchForm from "./QuerySearchForm";
import fillPersonalInfo from "../fillpersonalInfo";
import json2csv  from "json2csv";
const Option=Select.Option;

@connect((store)=>{    
    return {
        query:store.query
    };
    
})
export default class QueryPanel extends React.Component { 
  constructor(props)
  {
      super(props)
      //columns setup 
      const columns = [{
              title: '名字',
              dataIndex: 'name',
              key: 'name',
              render: (text,record) => <a href="#" onClick={this.getPersonDetail.bind(this,record)} >{text}</a>,
            }, {
              title: '公司',
              dataIndex: 'company',
              key: 'company',
            }, {
              title: '部门',
              dataIndex: 'department',
              key: 'department',
            },{
              title: '等级',
              dataIndex: 'level.current_level',
              key: 'level.current_level',
            },{
              title: '航段',
              dataIndex: 'flightinfo.flightRoute',
              key: 'flightinfo.flightRoute',
            },{
              title: '飞行时间',
              dataIndex: 'flightinfo.flightTime',
              key: 'flightinfo.flightTime',
            },{
              title: '模拟机时间',
              dataIndex: 'flightinfo.flightRealTime',
              key: 'flightinfo.flightRealTime',
            },{
              title: '经历时间',
              dataIndex: 'flightinfo.flightTotalTime',
              key: 'flightinfo.flightTotalTime',
            },
            {
              title:'操作',
              key:'action',
              render: (text, record) => (
                  <span>
                     <a href="#" onClick={this.getPersonDetail.bind(this,record)} >查看个人信息</a>
                    <span className="ant-divider" />
                    <a href="#" onClick={this.getWorkFlowDetail.bind(this,record)}>查看晋升信息</a>                    
                    <span className="ant-divider" />
                    <a href="#" onClick={this.DeleteConfirm.bind(this,record)}>删除此人</a>
                    <span className="ant-divider" />
                     <Select labelInValue defaultValue={{ key: record.role?record.role:"Pilot" }} style={{ width: 120 }} onChange={this.handleSelect.bind(this,record)}>
                            <Option value="Pilot">飞行员</Option>
                            <Option value="INS">检查员</Option>
                            <Option value="AUD">审查员</Option>
                            <Option value="ADM">管理员</Option>
                          </Select>
                  </span>
                )
            }];

//end of columns
      this.state={
        selectedRowKeys:[],
        columns:columns,
        pilotsquerydata:[],
        deleteModal:false,
        FlightAnalysis:false,
        queryRange:[]
      }
  }
handleSelect(record,selected)
{
  this.props.dispatch(UPDATE_PILOT_DATA(record.cert_id,{role:selected.key}));
  notification["success"]({
    message: '成功更新',
    description: record.name+"已经提升为"+selected.label,
  });
}

//getgetWorkFlowDetail

getWorkFlowDetail(record)
{

  this.props.dispatch(GetWorkFlowById(record.cert_id));


       var cardinfo ={
                      type:"displaypromotion",
                      targetdata:record
                    }
    this.props.dispatch(AddCardToDisplay(cardinfo));



}
BackToQuery(){
  this.setState({FlightAnalysis:false})
}

      DeleteConfirm(record)
      {
        this.setState({deleteModal:true,
                       deleteTarget:record.cert_id
                      })
      }
  getPersonDetail(data)
  {

       var cardinfo ={
                      type:"fillpersonalinfo",
                      person:data
                    }
    this.props.dispatch(AddCardToDisplay(cardinfo))
  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.query)
    {
      const {pilots} = nextProps.query;
      this.setState({pilotsquerydata:pilots});
    }
  }

  //model ok and cancel 
  handleCancel(){this.setState({deleteModal:false,deleteTarget:null})}

  handleDelete()
  {
    if(this.state.deleteTarget)
    this.props.dispatch(DeletePilot(this.state.deleteTarget))
    this.handleCancel();
  }

  //mondel ok and cancel

  handleSearch = (e) => {
  const form = this.form;
  alert("what")
    e.preventDefault();
  form.validateFields((err, values) => {
    let querystring = '{'
      for (let i = 0; i < 5; i++) {
        let selectKey= `field-${i}`;
        let selectValue = `value-${i}`;
        if(values[selectKey]!=null&&values[selectValue]!=null)
        {

      if(querystring!='{')
        {
          querystring=querystring+','
        }


          let string=""      
           string = '"'+values[selectKey]+'":"'+values[selectValue]+'"';
        querystring=querystring+string;
        }
      }
        for (let i = 1; i < 4 ; i++) {


        let selectLow =`flightTime${i}`
        let selectHigh = `flightValue${i}`;
             //判断是不是飞行时间 经历时间或者模拟机时间
             console.log(selectHigh)
        let key="";
        if(i==1)
        key = "flightTime"
        if(i==2)
          key ="flightRealTime"
        if(i==3)
          key ="flightTotalTime"
        if(values[selectLow])
        {
         if(querystring!='{')
        {
          querystring =querystring + ',';

        }
          let data = {
            key:key,
            low:values[selectLow],
            high:parseFloat(values[selectHigh])
          }
            this.state.queryRange.push(data);
            let string="";
            string = '"'+"flightinfo."+key+'":{"$gt":"'+values[selectLow]+'"';
            if(values[selectHigh])
              string = string + ',"$lt":"'+values[selectHigh]+'"';
            string =string + '}'
            querystring=querystring+ string
        }
        }

        console.log(querystring);

 // close query string;
         querystring = querystring + '}';
     let paradata= JSON.parse(querystring);
     console.log(paradata);
       this.props.dispatch(GetQueryResults(querystring)); 
    });
  }
saveFormRef(form){
  this.form =form;
}
  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }
  ExportToCsv(args)
  {

    var fields = [ "cert_idd","name","company","department","level.current_level","flightinfo.flightTime","flightinfo.flightRoute","flightinfo.flightRealTime","flightinfo.flightRealRoute","flightinfo.flightTotalTime"]
    var newdata= this.state.pilotsquerydata.map((one)=>{
      one.cert_idd="I"+one.cert_id
      return one;
    })
    var result = json2csv({data:this.state.pilotsquerydata,fields:fields})
    var args={ filename: "flight-data.csv" };
        var data, filename, link;

        var csv = result;
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,\uFEFF' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();

  }

    componentDidMount(){
       setCardDragable(ReactDOM.findDOMNode(this));
       handleFocus(ReactDOM.findDOMNode(this));
    }
FlightAnalysis(){
    this.setState({
      FlightAnalysis:true
    })

}
  render() {


let displaydata= this.state.pilotsquerydata;


let displayQueryPart =          
          (<div>
          <QuerySearchForm
               ref={this.saveFormRef.bind(this)}
               handleSearch={this.handleSearch.bind(this)}
             />



             <Table bordered class="margin-top10" columns={this.state.columns} dataSource={ displaydata } footer={()=>{
                if(this.state.pilotsquerydata.length>0)
                      {
                        return (
                          <div>
                          <Button style={{ marginLeft: 8 }} onClick={this.FlightAnalysis.bind(this)}>
                                飞行分析
                              </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.ExportToCsv.bind(this)}>
                                导出
                              </Button>
                              </div>)
                      }
                      else return ""
                   }} />
            </div>);
          if(this.state.FlightAnalysis)
          {

              displayQueryPart = (
                <div>

                <AnalysisFlight data={this.state.pilotsquerydata}/>
            <Button style={{ marginLeft: 8 }} onClick={this.BackToQuery.bind(this)}>
                                返回
                              </Button>               
                     </div>
                )


          }
      return (
        <div class="query-panel">  
        <Card title="报表系统" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>

        {displayQueryPart}
        </Card>

          <Modal title="确认框" visible={this.state.deleteModal}
                onOk={this.handleDelete.bind(this)} onCancel={this.handleCancel.bind(this)}
            >
              <p>确定要删除{this.state.deleteTarget}吗？</p>
            </Modal>
        </div>
      );
  }

}