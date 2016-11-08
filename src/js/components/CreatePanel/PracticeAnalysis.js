import React from "react";
import { 
          Button,Card,Icon,
          Progress,Modal,Tag,
          Tabs
        } from "antd";
import { connect } from "react-redux";

import { ForwardStep} from "../../Actions/KnowledgeAction";
import BackButton from "./BackButton";


const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})
export default class PracticeAnalysis extends React.Component {
    
    GoToStepFour(){
      this.props.dispatch(ForwardStep());
    }
    componentWillMount(){
       
       

    }
    
    render() {
        const { articles } = this.props;
        const { newArticle } = articles;
       
      
      return(
        <div>
        
          <br />
          <h3>Avg Saving Percent for the first DVM Run:&nbsp;
          
          <Progress type="circle" percent={parseInt(newArticle.AVGS).toFixed(2)}/>
          </h3>
          <br />
          <h3>Average Residence Time in our database: 
            <Tag closable color="red" closable={false}>{newArticle.Retention?parseInt(newArticle.Retention):0}</Tag>
            Month &nbsp;&nbsp;&nbsp;
          VS &nbsp;&nbsp;&nbsp;Residence Time of Best Practice is:
          <Tag closable color="green" closable={false}>{newArticle.BEST_PRACTICE?parseInt(newArticle.BEST_PRACTICE):0}</Tag>
            Month
          </h3>
          <Tabs>
            <TabPane tab="Best Practice for Archiving" key="1" disabled={newArticle.ARCHIVING?false:true}>{newArticle.ARCHIVING}</TabPane>
            <TabPane tab="Best Practice for Deletion" key="2" disabled={newArticle.DELETION?false:true}>{newArticle.DELETION}</TabPane>
            <TabPane tab="Best Practice for Summarization" key="3" disabled={newArticle.SUMMARIZATION?false:true}>{newArticle.SUMMARIZATION}</TabPane>
            <TabPane tab="Best Practice for Avoidance" key="4" disabled={newArticle.AVOIDANCE?false:true}>{newArticle.AVOIDANCE}</TabPane>
          </Tabs>
          <ButtonGroup>
            <BackButton/>
            <Button type="primary" onClick={this.GoToStepFour.bind(this)}>Next<Icon type="right" /></Button>
          </ButtonGroup>
        </div>
      )
      
    }


}
