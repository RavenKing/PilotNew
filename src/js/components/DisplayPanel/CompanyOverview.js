import React from "react";
import ReactDOM from "react-dom"
import { Button,Card,Icon,message } from "antd";

import { connect } from "react-redux";
import CreateCompanyForm from "./CreateCompanyForm"
import CompanyDetailPanel from "./CompanyDetailPanel"
import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class CompanyView extends React.Component {

	constructor(props)
	{
		super(props)
		this.state={
			companys:this.props.pilotinfo.Companys,
			visible:false,
      targetdata:null
		}

	}

    componentDidMount() {
         
      const props = this.props;
      const that = this;
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   
         this.interactable = setAreaDropable({
          element: ReactDOM.findDOMNode(this),
          accept: '.function-button,.func-item,.func-item1',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              var x = event.dragEvent.clientX + window.scrollX;
              var y = event.dragEvent.clientY + window.scrollY;
              var data_id = draggableElement.getAttribute('data-id');
              var data = {
                x:x,
                y:y
              }
              switch(data_id){
              case "Create":
              { 

               that.setState({
                targetdata:null,
                visible:true})
               break;
              }
              case "Edit":
              {
                if(that.state.targetdata==null)
                  message.error("请选择一个公司")
                else
                that.setState({visible:true})
                break;
              }
              case "Delete":
              {
               if(that.state.targetdata) 
              {const newcompanys = that.state.companys.filter((company)=>{if(company.company_id!= that.state.targetdata.company_id)return company})
                that.setState({companys:newcompanys,targetdata:null})                
              }
              else 
                message.error("请选择一个公司")
              }

              default:
                  ;
              }
              
          }
      });
  }
 

// create and modify panel 

onCancel(){

	this.setState({visible:false})
}


saveFormRef(form){
  this.form =form;
}

onCreate(){

   const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

//get maxid 
 const {companys} = this.state;
if(this.state.targetdata == null)
      {

       let keys = form.getFieldValue('keys');
       values.departments=keys.map((key)=>{

        return{
          name:form.getFieldValue('department'+key)
        }

       })

      companys.push(values); 


      }
      else
      {
        const newdetail = companys.filter((obj)=>{
        if(obj.company_id == this.state.targetdata.company_id)
        {
          obj.company_name = values.company_name;
          obj.address=values.address;

        }
          return obj;
       });
        this.setState(detail:newdetail)
      }
      form.resetFields();
      

      this.setState({ 
        visible: false});
    });




}

GoToDetail(company_id)
{
  const detaildata = this.state.companys.filter((company)=>{
    if(company.company_id == company_id)
      {return company}
  })

  this.setState({targetdata:detaildata[0]})

}


// end of create and modify panel




  RemoveCard()
  {
    console.log(this.props.cardid)
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }


    render() {
    	const {companys} = this.state;
      var detaildata;
      if(this.state.targetdata)
        detaildata = <CompanyDetailPanel company={this.state.targetdata}/>
      else{
          detaildata = <div></div>
      }
    	const displaycards=companys.map((company)=>{

    		let display=
    (<Card class="margin10" style={{ width: 200 }} key={company.company_id} onClick={this.GoToDetail.bind(this,company.company_id)}>
    
    <div class="custom-size">
        {company.company_id}
        </div>
    <div className="custom-card">
      <h3>{company.company_name}</h3>
      <p>注册员工数:100</p>
    </div>
  </Card>)

    		return display;
  

    	})




   return (
      <Card className="detail-panel workFlowDetailPanel" title="公司概况" extra={<Icon type="cross" onClick = {this.RemoveCard.bind(this)}/>}>
      <div class="templatecontainer"> 
      		{displaycards?displaycards:<div></div>}

      </div>
      {detaildata}
        <CreateCompanyForm 
		visible={this.state.visible}
		initdata={this.state.targetdata}
		onCancel ={this.onCancel.bind(this)}
    onCreate = { this.onCreate.bind(this)}
     ref={this.saveFormRef.bind(this)}
        />
          </Card>

        
      );
  }
}
