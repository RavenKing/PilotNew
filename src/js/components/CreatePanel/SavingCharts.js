import React from "react";
import { 
          Button,Card,Icon,
          Modal
        } from "antd";
import { connect } from "react-redux";

import { ForwardStep,SetBasicInfo,GetSAPBestPractice} from "../../Actions/KnowledgeAction";
import BackButton from "./BackButton";


const ButtonGroup = Button.Group;


@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})
export default class PracticeAnalysis extends React.Component {
   
    componentWillMount(){
       

    }
    
    render() {
      return(
        <div>
          <p>chart 1</p>
          <p>chart 2</p>

          <ButtonGroup>
            <BackButton/>
          </ButtonGroup>
        </div>
      )
      
    }


}
