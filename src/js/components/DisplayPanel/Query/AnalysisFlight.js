import React from "react";
import { Table, Input, Popconfirm } from 'antd';
import  ReactHighCharts  from "react-highcharts";
import _ from "underscore";

export default class EditableCell extends React.Component {
	constructor(props)
	{
		super(props)
		console.log(props);
		const categories = this.props.data.map((one)=>{return one.level.current_level});
		var newdata = _.uniq(categories);
		console.log(categories);
		console.log(newdata);

	}

  render() {



var config = {
	chart: {
        type: 'bar'
    },
    title:{
    	text:'平均飞行时间/等级'
    },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};

    return (
    	<div>

				<ReactHighCharts config={config}/>

    	</div>
    	);
  }
}