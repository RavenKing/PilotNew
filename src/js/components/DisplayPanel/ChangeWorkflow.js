import React from "react";

import ReactDOM from "react-dom";

import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {Card,Icon,Button,Form,Input,InputNumber,Steps,Timeline, Menu, Dropdown} from "antd";
const Step = Steps.Step;
const array = [...Array(Math.floor(Math.random() * 3) + 3)];
const steps = array.map((item, i) => ({
  title: 'Step ${i + 1}',
}));
const onClick = function (e) {
	console.log(e);
	const {props} =e.item;
	console.log(props.children)
};


const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="hehe">
    	FTS
    </Menu.Item>
    <Menu.Item>
 		FdSS
    </Menu.Item>
    <Menu.Item>
      THRID cLASS
    </Menu.Item>
  </Menu>
);



@connect((store)=>{    
    return {
        Pilot:store.pilotinfo.Pilot
    };
    
})
export default class PersonnalPanel extends React.Component {
 
    componentDidMount() {
        this.interactable = setNodeDragable(ReactDOM.findDOMNode(this));
    }
    componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
    }



    render() {
        return (
				<div class="detail-panel">
				<Card >
		 <Timeline>
    <Timeline.Item>
    <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Hover me <Icon type="down" />
    </a>
  </Dropdown></Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
				</Card>
				</div>
      );
  }
}

