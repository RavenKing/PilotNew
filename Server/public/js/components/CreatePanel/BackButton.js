import React from "react";
import { Button,Icon } from "antd";

import { connect } from "react-redux";

import { BackwardStep } from "../../Actions/KnowledgeAction";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class BackButton extends React.Component { 


Goback(){

  this.props.dispatch(BackwardStep())

}

    render() {	    	
    	return (
          <Button type="primary" onClick={this.Goback.bind(this)}>
          <Icon type="left" />Go back</Button>

      );
  }
}
