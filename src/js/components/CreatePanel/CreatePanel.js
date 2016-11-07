import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Steps} from "antd";
import { CloseCreatePanel } from "../../Actions/KnowledgeAction";

import TemplateSelect from "./TemplateSelect";
import ObjectDefinition from "./ObjectDefinition";
import PracticeAnalysis from "./PracticeAnalysis";
import SavingCharts from "./SavingCharts";
import BasicInfo from "./BasicInfo";


import { connect } from "react-redux";
import { setCardDragable,handleFocus } from "../../interactScript";

import StrategyDefine from "./StrategyDefine";

const Step = Steps.Step;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class CreatePanel extends React.Component {

    componentDidMount() {
      setCardDragable(ReactDOM.findDOMNode(this));
      handleFocus(ReactDOM.findDOMNode(this));
    }

    componentWillMount(){

        const { articles } =this.props;
        
        const { newArticle } = articles;
        if(newArticle == null )
        {

          this.setState({currentstep:0});
        
        }
        else{
          this.setState({currentstep:newArticle.currentstep})

        }

    }

 
    MoveDoc(){

        alert("shitty");

    }
 
    CloseCreatePanel(){

        this.props.dispatch(CloseCreatePanel());

    }



    render() {

      const { articles } =this.props;
      const { newArticle } = articles;
      var currentstep;
      if(newArticle!=null)
      {

        currentstep=newArticle.currentstep;
      }
      else
      {
          currentstep=0
      }

      var displaystep;

      switch(parseInt(currentstep))
      {
          case 0 :{
            displaystep = <TemplateSelect/> ; 
             break;
          } 
          case 1 : {
            displaystep = <ObjectDefinition/> ; 
            break;
          }
          case 2: {
            displaystep = <PracticeAnalysis/>;
            break;
          }
          case 3 :{ 
            if(newArticle.ARCHOBJ && newArticle.TABLES){
              displaystep= <BasicInfo obj={newArticle.ARCHOBJ} tables={newArticle.TABLES}></BasicInfo>; 
              break;
            }
            else{
              break;
            }
            
          }
          case 4 :{

            displaystep =<StrategyDefine/>;
            break;

          }
          /*case 5:{
            displaystep = <SavingCharts/>;
            break;
          }*/

      }


  return (
  <div >

   <Card className="create-panel" title="Create New Article" extra={<Icon type="cross" onClick = {this.CloseCreatePanel.bind(this)}/>}>
    <div>
      <Steps current={currentstep}>
        <Step title="Template Selection" description="Currenct template in System" />
        <Step title="Object Definition" description="What do you want to record" />
        <Step title="Practice Analysis" description="Best Practice vs Industry Practice"/>
        <Step title="Basic Info" description="Type in more info " />
        <Step title="Strategy Definition" description="Do you have exsiting Strategy" />
        
      </Steps>
     </div>
  <div className="mainstep">
    
  {displaystep}

  </div>



   </Card>

  </div>
   
  
      );
  }
}
