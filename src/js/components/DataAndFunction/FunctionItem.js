import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import { setNodeDragable } from "../../interactScript";


export default class FunctionItem extends React.Component {
    
  

  componentDidMount() {
    this.interactable = setNodeDragable(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
  }
    render() {

          return (
            <Button className="func-item1 ant-btn ant-btn-ghost ant-btn-lg function-button draggable" data-type="ANALYSIS" type="ghost" data-id={this.props.id}>
              {this.props.text}
            </Button>
          )    
        
  }
}
