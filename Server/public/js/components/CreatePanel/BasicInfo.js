import React from "react";
import { 
          Button,Card,Icon,Form,Input,Row,Col,
          Collapse,Rate,Popover,Modal
        } from "antd";
import { connect } from "react-redux";

import { ForwardStep,SetBasicInfo,GetSAPBestPractice} from "../../Actions/KnowledgeAction";
import BackButton from "./BackButton";

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;


@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})
export default class BasicInfo extends React.Component {
     constructor(props) {

        super(props);
        const { newArticle } = this.props.articles; 
        console.log(newArticle);

        var parms = {archobj:newArticle.ARCHOBJ};

    this.props.dispatch(GetSAPBestPractice(parms))


        var tables = [];     
        var size = [];
        var dsc = [];
        if(this.props.tables){
          tables = this.props.tables;
        }
        if(newArticle.SIZE){          

          size = newArticle.SIZE;
        }
        if(newArticle.TABLESDSC){
          dsc = newArticle.TABLESDSC;
        }
        
        this.state={ 
          tables:tables,
          size:size,
          dsc:dsc
          
        }
    }

        componentWillMount(){
       const {newArticle} = this.props.articles;
       const {bestpractice} = newArticle;
       var RANK;
       console.log(bestpractice);
       if(bestpractice)
       {
        RANK= bestpractice.result.RANK;
       }
            this.setState({

              Rank:RANK

            })

        }
    GoToStepFive()
    {
        var { tables } = this.state;
        var { size } = this.state;
        var { dsc } = this.state;

        var validInput = true;
        for(var i = 0;i < this.state.tables.length;i++){
          if(size[i] == undefined){
            size[i] = ""
          }
          if(isNaN(size[i])){
              validInput = false;
              break;
          }
          if(dsc[i] == undefined){
            dsc[i] = ""
          }

        }
        if(validInput){

            this.setState({
              tables:tables,
              size:size,
              dsc:dsc
            });
      
            this.props.dispatch(SetBasicInfo(this.state));
            this.props.dispatch(ForwardStep());
        }
        else{
          const modal = Modal.warning({
            title: 'Warning! ',
            content: 'Please input the correct number'
          });
        }
        

    }

    handleSizeChange(e){

      var name = e.target.name;
     
      var idx = name.substring(4);

      var inputSize = e.target.value;
      
      var {size} = this.state;
      size[idx] = inputSize;
      this.setState({
        size:size
      });
      
      
    }
    handleDscChange(e){
      var name = e.target.name;
     
      var idx = name.substring(3);

      var inputDsc = e.target.value;
     
      var { dsc } = this.state;
      dsc[idx] = inputDsc;
      this.setState({
        dsc:dsc
      })
     
    }
    SaveName(){
      var input = this.refs.tablename.refs.input;
      var inputValue = input.value;
      if(inputValue == ""){
        alert("input the table name");
      }
      else{

        var { tables } = this.state;
        tables.push(inputValue);
        
        this.setState({
          tables:tables
        });
      }
    }
    render() {
      var header =  "Archiving Object "+this.props.obj;
      var tables = this.props.tables;
      const { newTables } = this.state;

       const {newArticle} = this.props.articles;
       const {bestpractice} = newArticle;
       console.log(bestpractice);

var ranknumber;
    if(bestpractice)
    {
      ranknumber=parseInt(bestpractice.result.RANK)
    }
    else{
      ranknumber = 3 ;
    }
 console.log(ranknumber)


     var that = this;
      
      const formItemLayout = {
          labelCol: { span: 14},
          wrapperCol: { span: 10 },
        };

        return (
        	<div>
            <Collapse defaultActiveKey={['1']} accordion >
            <Panel header={header} key="1">
    
            <Popover content="Popular Object In Our Database">
              <div>Rank:<Rate disabled  value={ranknumber} /></div>
            </Popover>
            <p>Business Content of the Archiving Object</p>
            </Panel>
            </Collapse>


          <div className="margin-top10">
         

            <Form horizontal className="ant-advanced-search-form" >
            <Row gutter={16}>
            <Col sm={12}>
            {
              tables.map(function(table,idx){
                
                var sizeInputName = "size"+idx;
                
               return ( 
                  
                  
                    <FormItem 
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      label={table}
                    >
                      <Col span="15">
                        <Input name={sizeInputName} defaultValue={that.state.size[idx]} size="default" placeholder="input Table Size" onChange={that.handleSizeChange.bind(that)}/>
                      </Col>
                      <Col span="3">
                        <p className="ant-form-split">GB</p>
                      </Col>
                    </FormItem>
                    )
             })
           }
              </Col>
              <Col sm={12}>
              {
                tables.map(function(table,idx){

                  var dscInputName = "dsc"+idx;
                  return (

                      <FormItem   
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        label="Desicription"
                      >
                        <Input name={dscInputName} defaultValue={that.state.dsc[idx]} size="default" placeholder="input desicription" onChange={that.handleDscChange.bind(that)} />
                      </FormItem>

                    )
                })
              }

              </Col>        
              
              </Row>
              
              <Row gutter={16}>
                <Col sm={16}>
                  <FormItem   
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    label="Table name:"
                  >
                    <Input  ref="tablename" size="default" placeholder="table name"/>
                 
                  </FormItem> 
                </Col>

                <Col sm={8}>
                  <Button type="primary" onClick={this.SaveName.bind(this)}>Add One Row</Button>
                </Col>
            </Row>
             
            </Form>
            

                     

            <ButtonGroup>
              <BackButton/>
              <Button type="primary" onClick={this.GoToStepFive.bind(this)}>
                Go forward <Icon type="right" />
              </Button>
            </ButtonGroup>
           



            
          </div>
        </div>

      );
  }
}
