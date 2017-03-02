import React from "react";
import ReactDOM from "react-dom";
import { Button,Badge  } from "antd";
import { Link } from "react-router";
import { connect} from "react-redux"; 
import { setNodeDragable } from "../../interactScript";


export default class DataItem extends React.Component {
    

  componentDidMount() {
    this.interactable = setNodeDragable(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
  }
    render() {
   
        return (
           <Button className={this.props.className} data-type="ITEM" type="dashed" data-id={this.props.uniquekey} data-courseid={this.props.courseid} title={this.props.title}>

             <Badge dot={this.props.uniquekey==3?true:false} > {this.props.title}  </Badge>
            </Button>
          
      );
  }
}
