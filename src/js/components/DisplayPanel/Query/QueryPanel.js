import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction";

import {GetQueryResults} from "../../../Actions/QueryAction";

import {Button,Table,Card,Icon,Form,Modal} from "antd";
import QuerySearchForm from "./QuerySearchForm";

@connect((store)=>{    
    return {
        pilots:store.query
    };
    
})
export default class QueryPanel extends React.Component { 
  constructor(props)
  {
      super(props)

  }

  handleSearch = (e) => {
       const form = this.form;

    e.preventDefault();
  form.validateFields((err, values) => {
    let querystring = "?"
      for (let i = 0; i < 10; i++) {

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
        <Card title="课程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <QuerySearchForm
     ref={this.saveFormRef.bind(this)}
     handleSearch={this.handleSearch.bind(this)}
           />
          

         <Table  />
        </Card>
        </div>
      );
  }

}