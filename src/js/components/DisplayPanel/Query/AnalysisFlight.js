import React from "react";
import { Table, Input, Popconfirm,Row,Col } from 'antd';
import  ReactHighCharts  from "react-highcharts";
import _ from "underscore";
import * as d3 from "d3";




export default class EditableCell extends React.Component {
	constructor(props)
	{
		super(props)
    const leveldata = this.props.data.map((one)=>{return {
      Level:one.level.current_level,
      flightInfo:one.flightinfo}
    })
    let averagedata =d3.nest()
    .key(function(d){return d.Level})
    .rollup(function(v){
      return {
        count:v.length,
        AvgFlightTime:d3.mean(v,function(d){return d.flightInfo.flightTime}),
        AvgRealFlightTime:d3.mean(v,function(d){return d.flightInfo.flightRealTime}),       
        AvgFlightRoute:d3.mean(v,function(d){return d.flightInfo.flightRoute}),
        AvgRealFlightRoute:d3.mean(v,function(d){return d.flightInfo.flightRealRoute}),
      }
    })
    .entries(leveldata);
    console.log(averagedata);


    let categories=[];
    let seriescount=[];
    let seriesavg=[]
    averagedata.map(one=>{
      categories.push(one.key),
      seriescount.push(one.value.count);
      seriesavg.push(one.value.AvgFlightTime);
    });



 //columns setup 
      const columns = [{
              title: '等级',
              dataIndex: 'key',
              key: 'key'
            }, {
              title: '飞行员数目',
              dataIndex: 'value.count',
              key: 'value.count',
            }, {
              title: '平均飞行时间(小时)',
              dataIndex: 'value.AvgFlightTime',
              key: 'value.AvgFlightTime',
              render: function(text) {
                return (
                  parseFloat(text).toFixed(2)
                );
              }
            },{
              title: '平均航段数(次)',
              dataIndex: 'value.AvgFlightRoute',
              key: 'value.AvgFlightRoute',
              render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
            },{
              title: '平均真实飞行时间(小时)',
              dataIndex: 'value.AvgFlightRealTime',
              key: 'value.AvgFlightRealTime',
                    render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
              },{
              title: '平均起落数(次)',
              dataIndex: 'value.AvgFlightRealRoute',
              key: 'value.AvgFlightRealRoute',
              render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
              }
              ];


    this.state={
                columns:columns,
                showdata:averagedata,
                categories:categories,
                seriescount:seriescount,
                seriesavg:seriesavg}
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
    categories: this.state.categories
  },
  series: 
  [{
    name:"平均飞行时间[小时]",
    data:this.state.seriesavg
  }]
};

var secondconfig={

       chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Browser<br>shares',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                ['Chrome', 12.8],
                ['Safari',    8.5],
                ['Opera',     6.2],
                {
                    name: 'Others',
                    y: 0.7,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
}

    return (
    	<div>
<Row>
    <Col span={12}><ReactHighCharts config={config}/></Col>  
    <Col span={12}>
     <ReactHighCharts config={secondconfig}/></Col>
</Row>
        <Table dataSource={this.state.showdata}  columns={this.state.columns}/>

    	</div>
    	);
  }
}