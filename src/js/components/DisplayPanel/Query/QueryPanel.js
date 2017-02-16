import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction";
import {GetQueryResults} from "../../../Actions/QueryAction";
import {Button,Table,Card,Icon,Form,Modal} from "antd";
import QuerySearchForm from "./QuerySearchForm";
import fillPersonalInfo from "../fillpersonalInfo";

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
                  </span>
                )
            }];

//end of columns


      this.state={
        selectedRowKeys:[],
        columns:columns,
        pilotsquerydata:[]
      }
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

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }


  render() {

      return (
        <div className="detail-panel">  
        <Card title="报表系统" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <QuerySearchForm
               ref={this.saveFormRef.bind(this)}
               handleSearch={this.handleSearch.bind(this)}
             />
             <Table columns={this.state.columns} dataSource={ this.state.pilotsquerydata} />
        </Card>
        </div>
      );
  }

}