import React from "react";
import { Button,Card,Icon } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class TemplateSelect extends React.Component {

GoToStepTwo()
{


var newArticle = { 
  type:"DVM",
  currentstep:1
  }
   this.props.dispatch(NewArticleStepOne(newArticle))


}

    render() {

        return (
        	<div>
      <div class="templatecontainer"> 
  <Card class="margin10" style={{ width: 240 }} onClick={this.GoToStepTwo.bind(this)}>
    <div class="custom-size">
        DVM
        </div>
    <div className="custom-card">
      <h3>Data Volume Management</h3>
      <p>Tables and objects</p>
    </div>
  </Card>
    <Card class="margin10" style={{ width: 240 }}>
    <div class="custom-size">
        Coming Soon
        </div>
    <div className="custom-card">
      <h3>Capacity Management</h3>
      <p>Performance </p>
    </div>
  </Card>
    <Card class="margin10" style={{ width: 240 }}>
    <div class="custom-size">
        Coming Soon
        </div>
    <div className="custom-card">
      <h3>Others</h3>
      <p>Business API</p>
    </div>
  </Card> 
          </div>

         
        </div>

      );
  }
}
