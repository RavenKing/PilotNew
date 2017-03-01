import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction";
import {GetQueryResults,DeletePilot} from "../../../Actions/QueryAction";
import {Button,Table,Card,Icon,Form,Modal} from "antd";
import AnalysisFlight from "./AnalysisFlight"
import QuerySearchForm from "./QuerySearchForm";
import fillPersonalInfo from "../fillpersonalInfo";
import json2csv  from "json2csv";

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
              title: '航行时间',
              dataIndex: 'flightinfo.flightTime',
              key: 'flightinfo.flightTime',
            },{
              title:'操作',
              key:'action',
              render: (text, record) => (
                  <span>
                     <a href="#" onClick={this.getPersonDetail.bind(this,record)} >查看个人信息</a>
                    <span className="ant-divider" />
                    <a href="#">查看晋升信息</a>                    
                    <span className="ant-divider" />
                    <a href="#" onClick={this.DeleteConfirm.bind(this,record)}>删除此人</a>
                  </span>
                )
            }];

//end of columns
      this.state={
        selectedRowKeys:[],
        columns:columns,
        pilotsquerydata:[],
        deleteModal:false,
        FlightAnalysis:false
      }
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

    console.log(nextProps);
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
    e.preventDefault();
  form.validateFields((err, values) => {
    let querystring = "?"
      for (let i = 0; i < 5; i++) {

        var selectKey= `field-${i}`;
        let selectValue = `value-${i}`;
        if(values[selectKey]!=null&&values[selectValue]!=null)
        {let string = values[selectKey]+"="+values[selectValue]+"&";
        querystring=querystring+string;
        }
      }
      console.log("search string is",querystring);
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

 convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

  ExportToCsv(args)
  {

    var fields = [ "cert_idd","flightinfo.flightTime","name"]

    var newdata= this.state.pilotsquerydata.map((one)=>{
      one.cert_idd="I"+one.cert_id
      return one;
    })
    var result = json2csv({data:this.state.pilotsquerydata,fields:fields})
    console.log(result);

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

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }
FlightAnalysis(){
    this.setState({
      FlightAnalysis:true
    })

}
  render() {


let displayQueryPart =          
          (<div>
          <QuerySearchForm
               ref={this.saveFormRef.bind(this)}
               handleSearch={this.handleSearch.bind(this)}
             />
             <Table class="margin-top10" columns={this.state.columns} dataSource={ this.state.pilotsquerydata} footer={()=>{
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
        <div className="detail-panel">  
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