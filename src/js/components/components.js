import React from "react";
import {Card,Icon,Tooltip,message,Button,Table,Carousel,Slider,Modal,Form,Cascader,Col,Switch,Select,Radio,Input,Steps,LocaleProvider,QueueAnim,Alert} from "antd"
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var rc = window.rc ; 
var $ = window.jQuery;
var global = window;
import  ReactHighCharts  from "react-ReactHighCharts";

/*(function (React, rc, ReactHighCharts, $, global) {
*/
	if (!rc) {
		rc = window.rc = {};
	}

	var displayAreaChangeActions = global.displayAreaChangeActions;
	var dataPanelItemChangeActions = global.dataPanelItemChangeActions;
	var functionPanelItemChangeActions = global.functionPanelItemChangeActions;
	var displayAreaDataStore = global.displayAreaDataStore;
	var dataPanelDataStore = global.dataPanelDataStore;
	var functionPanelDataStore = global.functionPanelDataStore;
	var pageStatusChangeActions = global.pageStatusChangeActions;
	var pageStatusDataStore = global.pageStatusDataStore;
		u/*
	var Card = antd.Card;
	var Icon = antd.Icon;
	var Tooltip = antd.Tooltip;
	var message = antd.message;
	var Button = antd.Button;
	var Table = antd.Table;
	var Carousel = antd.Carousel;
	var Slider = antd.Slider;
	var Modal = antd.Modal;
	var Form = antd.Form;
	var Cascader = antd.Cascader;
	var Col = antd.Col;
	var Switch = antd.Switch;
	var Select = antd.Select;
	var Radio = antd.Radio;
	var Input = antd.Input;
	var Steps = antd.Steps;
	var LocaleProvider = antd.LocaleProvider;
	var QueueAnim = antd.QueueAnim;
	var Alert = antd.Alert;*/


	var componentMixin = {
		removeCard: function removeCard() {
			var that = this;
			return function () {
				// if (that.interactable) {
				//   that.interactable.unset();
				//   that.interactable = null;
				// }
				// if (that.interactDrag) {
				//   that.interactDrag.unset();
				//   that.interactDrag = null;
				// }
				// if (that.interactDrop) {
				//   that.interactDrop.unset();
				//   that.interactDrop = null;
				// }
				var currentStatus = pageStatusDataStore.getCurrentStatus();

				if (currentStatus === "INIT" || this.props.card.type !== "ITEM" || currentStatus.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.');
				}
			};
		}
	};

	var PredictLineChart = React.createClass({
		displayName: "PredictLineChart",


		getInitialState: function getInitialState() {
			return {
				axisMin: this.props.axisMin,
				axisMax: this.props.axisMax,
				axisLimit: this.props.axisMax
			};
		},
		componentDidMount: function componentDidMount() {

			var axisMin = this.state.axisMin;
			var axisMax = this.state.axisMax;

			var axisArr = this.props.chartAxisArr[0].slice(axisMin, axisMax);
			var valueArr = this.props.chartValueArr;
			var nameArr = this.props.lineNameArr;
			var len = nameArr.length;

			/*this.setState({
   axisMin: this.props.axisMin,
   axisMax: this.props.axisMax
   });*/

			switch (this.props.factorCate) {
				case "B":
					var axisTitle = "Entries of Table";
					break;

				case "S":
					var axisTitle = "Response Time [ms]";
					break;

				case "R":
					var axisTitle = "Utility [%]";
					break;
				default:
					;
			}

			var seriesArr = [];
			for (var i = 0; i < len; i++) {
				seriesArr.push({
					id: 'series-' + i,
					name: nameArr[i],
					data: valueArr[i].slice(axisMin, axisMax)
				});
			}

			this.chart = new ReactHighCharts['Chart'](this.getDOMNode(), {
				chart: {
					type: "line"
				},
				title: {
					text: ''
				},
				xAxis: {
					id: 'xAxis',
					categories: axisArr,
					tickInterval: Math.round((axisMax - axisMin) / 10)
				},
				yAxis: {
					title: {
						text: axisTitle
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				series: seriesArr
			});
		},

		componentWillUnmount: function componentWillUnmount() {
			this.chart.destroy();
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (this.state.axisLimit < nextProps.axisMax) {
				this.setState({
					axisMin: nextProps.axisMin,
					axisMax: this.state.axisLimit
				});
			} else {
				this.setState({
					axisMin: nextProps.axisMin,
					axisMax: nextProps.axisMax
				});
			}
		},

		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			if (this.state !== nextState) {
				return true;
			}
		},

		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {

			var axisMin = nextState.axisMin;
			var axisMax = nextState.axisMax;

			var nameArr = nextProps.lineNameArr;
			var chartSeriesLen = this.chart.series.length;
			var axisArr = nextProps.chartAxisArr[0].slice(axisMin, axisMax);
			var dataLen = nameArr.length;
			var flag = chartSeriesLen - dataLen;

			/*this.setState({
   	axisMin: this.props.axisMin,
   	axisMax: this.props.axisMax
   });*/

			if (flag < 0) {
				var valueArr = nextProps.chartValueArr;
				for (var i = chartSeriesLen; i < dataLen; i++) {
					var seriesObj = {
						id: 'series-' + i,
						name: nameArr[i],
						data: valueArr[i].slice(axisMin, axisMax)
					};

					this.chart.addSeries(seriesObj, false);
				}
				this.chart.redraw();
			} else if (flag > 0) {
				//this.chart.series.splice(1, chartSeriesLen - 1);
				for (var i = chartSeriesLen - 1; i > 0; i--) {
					this.chart.series[i].remove();
				}
				this.chart.redraw();
			} else {
				var valueArr = nextProps.chartValueArr;
				this.chart.xAxis[0].update({
					tickInterval: Math.round((axisMax - axisMin) / 10)
				});
				this.chart.get('xAxis').setCategories(axisArr, false);
				for (var i = 0; i < dataLen; i++) {
					var seriesObj = {
						//id: 'series-' + i,
						//name: nameArr[i],
						data: valueArr[i].slice(axisMin, axisMax)
					};

					this.chart.series[i].setData(seriesObj.data);
				}
				/*for (var i = chartSeriesLen - 1; i >= 0; i--) {
            this.chart.series[i].remove();
          }
    for (var i = 0; i < dataLen; i++) {
            var seriesObj = {
              name: nameArr[i],
              data: valueArr[i].slice(axisMin,axisMax)
            };
    this.chart.addSeries(seriesObj, false);
    }*/

				//this.chart.redraw();
			}
		},

		render: function render() {

			return React.createElement(
				"div",
				{ className: "line" },
				" "
			)

			//<Slider min={1} max={this.state.axisLimit} range defaultValue={[this.state.axisMin, this.state.axisMax]} onChange={this.onChange} />

			;
		}
	});

	var LineChart = React.createClass({
		displayName: "LineChart",


		getInitialState: function getInitialState() {
			return {
				axisMin: this.props.axisMin,
				axisMax: this.props.axisMax,
				axisLimit: this.props.axisMax,
				showLabel: this.props.showLabel
			};
		},
		componentDidMount: function componentDidMount() {

			var axisMin = this.state.axisMin;
			var axisMax = this.state.axisMax;

			var axisArr = this.props.chartAxisArr.slice(axisMin, axisMax);
			var valueArr = this.props.chartValueArr;
			var nameArr = this.props.lineNameArr;
			var len = nameArr.length;

			/*this.setState({
   axisMin: this.props.axisMin,
   axisMax: this.props.axisMax
   });*/

			switch (this.props.factorCate) {
				case "B":
					var axisTitle = "Entries of Table";
					break;

				case "S":
					var axisTitle = "Response Time [ms]";
					break;

				case "R":
					var axisTitle = "Utility [%]";
					break;
				default:
					;
			}

			var seriesArr = [];

			seriesArr.push({

				name: nameArr,
				data: valueArr.slice(axisMin, axisMax)
			});

			this.chart = new ReactHighCharts['Chart'](this.getDOMNode(), {
				chart: {
					type: "line"
				},
				title: {
					text: ''
				},
				xAxis: {
					id: 'xAxis',
					categories: axisArr,
					tickInterval: Math.round((axisMax - axisMin) / 10),
					labels: {
						enabled: this.state.showLabel
					}
				},
				yAxis: {
					title: {
						text: axisTitle
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				series: seriesArr
			});
		},

		componentWillUnmount: function componentWillUnmount() {
			this.chart.destroy();
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (this.state.axisLimit < nextProps.axisMax) {
				this.setState({
					axisMin: nextProps.axisMin,
					axisMax: this.state.axisLimit,
					showLabel: nextProps.showLabel
				});
			} else {
				this.setState({
					axisMin: nextProps.axisMin,
					axisMax: nextProps.axisMax,
					showLabel: nextProps.showLabel
				});
			}
		},

		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			if (this.state !== nextState) {
				return true;
			}
		},

		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {

			var axisMin = nextState.axisMin;
			var axisMax = nextState.axisMax;

			var nameArr = nextProps.lineNameArr;
			var chartSeriesLen = this.chart.series.length;
			var axisArr = nextProps.chartAxisArr.slice(axisMin, axisMax);
			var dataLen = nameArr.length;
			var flag = chartSeriesLen - dataLen;

			/*this.setState({
   	axisMin: this.props.axisMin,
   	axisMax: this.props.axisMax
   });*/

			if (flag < 0) {
				var valueArr = nextProps.chartValueArr;

				var seriesObj = {
					name: nameArr,
					data: valueArr.slice(axisMin, axisMax)
				};
				this.chart.xAxis[0].update({
					tickInterval: Math.round((axisMax - axisMin) / 10),
					labels: {
						enabled: nextState.showLabel
					}
				});
				this.chart.get('xAxis').setCategories(axisArr, false);
				//this.chart.addSeries(seriesObj, false);
				this.chart.series[0].setData(seriesObj.data);
				//this.chart.redraw();
			} else if (flag > 0) {

				//this.chart.series.splice(1, chartSeriesLen - 1);
				for (var i = chartSeriesLen - 1; i > 0; i--) {
					this.chart.series[i].remove();
				}
				this.chart.redraw();
			} else {

				var valueArr = nextProps.chartValueArr;
				this.chart.xAxis[0].update({
					tickInterval: Math.round((axisMax - axisMin) / 10)
				});
				this.chart.get('xAxis').setCategories(axisArr, false);
				for (var i = 0; i < dataLen; i++) {
					var seriesObj = {
						//id: 'series-' + i,
						//name: nameArr[i],
						data: valueArr.slice(axisMin, axisMax)
					};

					this.chart.series[i].setData(seriesObj.data);
				}
				/*for (var i = chartSeriesLen - 1; i >= 0; i--) {
            this.chart.series[i].remove();
          }
    for (var i = 0; i < dataLen; i++) {
            var seriesObj = {
              name: nameArr[i],
              data: valueArr[i].slice(axisMin,axisMax)
            };
    this.chart.addSeries(seriesObj, false);
    }*/

				//this.chart.redraw();
			}
		},

		render: function render() {

			if (this.props.showLabel) {

				return React.createElement(
					"div",
					{ className: "line" },
					" "
				);
			} else {

				return React.createElement(
					"div",
					{ className: "line-item" },
					" "
				);
			}
		}
	});

	rc.CreateObjCard = React.createClass({
		displayName: "CreateObjCard",

		mixins: [componentMixin],

		getInitialState: function getInitialState() {
			var editObj = this.props.card.editObj;
			if (editObj === 0) {
				return {
					step: 0,
					status: 'process',
					btnTextLeft: 'Cancel',
					btnTextRight: 'Next',
					dataStep0: {
						type: [],
						techName: '',
						busiName: '',
						freq: "2",
						pin: false
					},
					dataStep1: {
						objList: [],
						skip: true
					}
				};
			} else {

				var item = this.props.card.objList;
				var itemLen = item.length;

				for (var i = 0; i < itemLen; i++) {

					if (item[i].FACTOR_GUID.toString() === editObj) {

						var type1 = [item[i].FACTOR_CATEGORY, item[i].FACTOR_TYPE];
						return {
							step: 0,
							status: 'process',
							btnTextLeft: 'Cancel',
							btnTextRight: 'Next',
							dataStep0: {
								type: type1,
								techName: item[i].FACTOR_NAME,
								busiName: item[i].FACTOR_BUSINESS_NAME,
								freq: "2",
								pin: item[i].PIN === 'X' ? true : false
							},
							dataStep1: {
								objList: [],
								skip: true
							}
						};
					}
				}
			}
		},

		componentDidMount: function componentDidMount() {
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		doNothing: function doNothing() {
			return;
		},
		onBack: function onBack() {
			if (this.state.step === 0) {

				this.removeCard();
			} else if (this.state.step === 1) {
				if (this.refs.step1.checkValidity()) {
					this.setState({
						step: this.state.step - 1,
						status: 'process',
						btnTextLeft: 'Cancel',
						dataStep1: {
							objList: this.refs.step1.state.objList,
							skip: this.refs.step1.state.skip
						}
					});
				} else {
					this.setState({
						status: 'error'
					});
				}
			} else if (this.state.step === 2) {
				this.setState({
					step: this.state.step - 1,
					btnTextRight: 'Next'
				});
			}
		},
		onNext: function onNext() {
			var that = this;
			if (this.state.step === 2) {

				if (!this.state.dataStep1.skip) {
					var factorStr = "";
					var objList = this.state.dataStep1.objList;
					var objLen = objList.length;

					for (var i = 0; i < objLen; i++) {
						factorStr = factorStr + objList[i] + ",";
					}
					factorStr = factorStr.substr(0, factorStr.length - 1);
				} else {
					var factorStr = "0";
				}

				var editObj = this.props.card.editObj;
				var dataInfo = {

					"factorId": editObj === 0 ? "0" : editObj,
					"factorType": this.state.dataStep0.type[1],
					"factorTechName": this.state.dataStep0.techName,
					"sysID": "KEV",
					"factorBusiName": this.state.dataStep0.busiName,
					"factorStat": "A",
					"factorCategory": this.state.dataStep0.type[0],
					"sysClient": "001",
					"checkPin": this.state.dataStep0.pin ? "X" : "",
					"factorString": factorStr

				};

				if (displayAreaDataStore.createObject(dataInfo)) {
					this.setState({
						step: this.state.step + 1,
						status: 'process',
						btnTextLeft: '',
						btnTextRight: 'Close'
					});
					dataPanelDataStore.getInitPageData("INIT");
				} else {
					this.setState({
						status: 'error'
					});
				}
			} else if (this.state.step === 1) {

				if (this.refs.step1.checkValidity()) {
					this.setState({
						step: this.state.step + 1,
						status: 'process',
						btnTextRight: 'Submit',
						dataStep1: {
							objList: this.refs.step1.state.objList,
							skip: this.refs.step1.state.skip
						}
					});
				} else {
					this.setState({
						status: 'error'
					});
				}
			} else if (this.state.step === 0) {
				var dataStep0 = this.refs.step0.getFieldsValue();

				this.refs.step0.validateFields(function (errors, values) {
					if (!!errors) {

						that.setState({
							status: 'error'
						});
					} else {
						that.setState({
							step: that.state.step + 1,
							status: 'process',
							btnTextLeft: 'Back',
							dataStep0: {
								type: dataStep0.type,
								techName: dataStep0.techName,
								busiName: dataStep0.busiName,
								freq: dataStep0.freq,
								pin: dataStep0.pin
							}
						});
					}
				});
				return false;
				/*this.setState({
    	step: this.state.step + 1,
    	btnTextLeft: 'Back',
    	dataStep0: {
    		type: dataStep0.type,
    		techName: dataStep0.techName,
    		busiName: dataStep0.busiName,
    		freq: dataStep0.freq,
    		pin: dataStep0.pin
    	}
    });*/
			}
		},
		render: function render() {
			var FormItem = Form.Item;
			var Option = Select.Option;
			var RadioButton = Radio.Button;
			var RadioGroup = Radio.Group;
			var Step = Steps.Step;
			var ButtonGroup = Button.Group;

			var displayStep;
			switch (this.state.step) {
				case 0:
					{
						displayStep = React.createElement(CreateCardStep0, { ref: "step0", formData: this.state.dataStep0, content: this.props.card, editObj: this.props.card.editObj === 0 ? false : true });
						break;
					}
				case 1:
					{
						displayStep = React.createElement(CreateCardStep1, { ref: "step1", formData: this.state.dataStep1, content: this.props.card });
						break;
					}
				case 2:
					{
						displayStep = React.createElement(CreateCardStep2, { ref: "step2", formData: this.state.dataStep0 });
						break;
					}
				case 3:
					{
						displayStep = React.createElement(CreateCardStep3, { ref: "step3", formData: this.state.dataStep0, editObj: this.props.card.editObj === 0 ? false : true });
						break;
					}
				default:
					;

			}

			return React.createElement(
				Card,
				{ className: "create-obj-card",
					title: this.props.card.title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },
				React.createElement(
					Steps,
					{ size: "small", current: this.state.step, status: this.state.status },
					React.createElement(Step, { title: "Basic Info" }),
					React.createElement(Step, { title: "Relation" }),
					React.createElement(Step, { title: "Confirmation" }),
					React.createElement(Step, { title: "Finish" })
				),
				displayStep,
				React.createElement(
					ButtonGroup,
					{ style: { marginTop: 20 } },
					React.createElement(
						Button,
						{ type: "primary", onClick: this.state.step === 0 ? this.removeCard().bind(this) : this.onBack },
						React.createElement(Icon, { type: "left" }),
						this.state.btnTextLeft
					),
					React.createElement(
						Button,
						{ type: "primary", htmlType: "submit", onClick: this.state.step === 3 ? this.removeCard().bind(this) : this.onNext },
						this.state.btnTextRight,
						React.createElement(Icon, { type: "right" })
					)
				)
			);
		}
	});

	var CreateCardStep0 = React.createClass({
		displayName: "CreateCardStep0",

		onSetSkip: function onSetSkip() {},

		checkTechName: function checkTechName(rule, value, callback) {

			if (!!value && !this.props.editObj) {
				var type = this.props.form.getFieldValue('type');
				var item = this.props.content.objList;
				var itemLen = item.length;
				for (var i = 0; i < itemLen; i++) {

					if (value === item[i].FACTOR_NAME) {
						if (type[0] === item[i].FACTOR_CATEGORY && type[1] === item[i].FACTOR_TYPE) {
							callback([new Error('Factor Name Existed')]);
						}
					}
				}
				callback();
			} else {
				callback();
			}
		},

		render: function render() {
			var FormItem = Form.Item;
			var Option = Select.Option;
			var RadioButton = Radio.Button;
			var RadioGroup = Radio.Group;
			var Step = Steps.Step;
			var ButtonGroup = Button.Group;

			var getFieldProps = this.props.form.getFieldProps;


			var areaData = [{
				value: 'B',
				label: 'Business',
				children: [{
					value: 'TBL',
					label: 'Table'
				}, {
					value: 'DVM',
					label: 'DVM Object'
				}]
			}, {
				value: 'S',
				label: 'Service',
				children: [{
					value: 'BTC',
					label: 'Background Job'
				}, {
					value: 'DIA',
					label: 'Dialog Transaction'
				}, {
					value: 'RFC',
					label: 'RFC Call'
				}]
			}, {
				value: 'R',
				label: 'Resource',
				children: [{
					value: 'SYS',
					label: 'System Load'
				}]
			}];

			return React.createElement(
				"div",
				{ style: { marginTop: 20 } },
				React.createElement(
					Form,
					{ horizontal: true },
					React.createElement(
						FormItem,
						{
							label: "Category / Type",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 },
							style: { marginTop: 25 },
							required: true,
							validateStatus: !!this.props.form.getFieldError('type') ? 'error' : 'success',
							help: this.props.form.isFieldValidating('type') ? 'Validating...' : (this.props.form.getFieldError('type') || []).join(', ')
						},
						React.createElement(Cascader, _extends({}, getFieldProps('type', {
							initialValue: this.props.formData.type,
							validate: [{
								rules: [{ required: true, type: 'array', message: 'Category & Type Cannot Be Empty' }],
								trigger: ['onBlur', 'onChange']

							}]
						}), { options: areaData }))
					),
					React.createElement(
						FormItem,
						{
							label: "Technical Name",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 },
							required: true,
							validateStatus: !!this.props.form.getFieldError('techName') ? 'error' : 'success',
							help: this.props.form.isFieldValidating('techName') ? 'Validating...' : (this.props.form.getFieldError('techName') || []).join(', ')
						},
						React.createElement(Input, _extends({ id: "tech-input" }, getFieldProps('techName', {
							initialValue: this.props.formData.techName,
							validate: [{
								rules: [{ required: true, message: 'Factor Name Cannot Be Empty' }],
								trigger: 'onBlur'

							}, {
								rules: [{ max: 50, message: 'Factor Name Must Be Less Than 50 Chars' }, { validator: this.checkTechName }],
								trigger: 'onChange'
							}]
						}), { placeholder: "Input Technical Name of Factor ..." }))
					),
					React.createElement(
						FormItem,
						{
							label: "Business Name",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 },
							required: true,
							validateStatus: !!this.props.form.getFieldError('busiName') ? 'error' : 'success',
							help: this.props.form.isFieldValidating('busiName') ? 'Validating...' : (this.props.form.getFieldError('busiName') || []).join(', ')
						},
						React.createElement(Input, _extends({ id: "busi-input" }, getFieldProps('busiName', {
							initialValue: this.props.formData.busiName,
							validate: [{
								rules: [{ required: true, message: 'Business Name Cannot Be Empty' }],
								trigger: ['onBlur']

							}, {
								rules: [{ max: 50, message: 'Business Name Must Be Less Than 50 Chars' }],
								trigger: 'onChange'
							}]
						}), { placeholder: "Input Business Description ..." }))
					),
					React.createElement(
						FormItem,
						{
							label: "Update Frequency",
							labelCol: { span: 5 }

						},
						React.createElement(
							RadioGroup,
							getFieldProps('freq', { initialValue: this.props.formData.freq }),
							React.createElement(
								RadioButton,
								{ value: "1" },
								"hourly"
							),
							React.createElement(
								RadioButton,
								{ value: "2" },
								"daily"
							),
							React.createElement(
								RadioButton,
								{ value: "3" },
								"weekly"
							),
							React.createElement(
								RadioButton,
								{ value: "4" },
								"monthly"
							)
						)
					),
					React.createElement(
						FormItem,
						{
							label: "Pin to Data Area",
							labelCol: { span: 5 }

						},
						React.createElement(Switch, _extends({}, getFieldProps('pin', { valuePropName: 'checked', initialValue: this.props.formData.pin }), { checkedChildren: React.createElement(Icon, { type: "check" }), unCheckedChildren: React.createElement(Icon, { type: "cross" }) }))
					)
				)
			);
		}

	});

	CreateCardStep0 = Form.create()(CreateCardStep0);

	var CreateCardStep1 = React.createClass({
		displayName: "CreateCardStep1",


		getInitialState: function getInitialState() {
			return {
				skip: this.props.formData.skip,
				objList: this.props.formData.objList
			};
		},

		onSetSkip: function onSetSkip(checked) {
			this.setState({
				skip: checked
			});
		},

		typeTrans: function typeTrans(type) {
			switch (type) {
				case "TBL":
					return "Table";
					break;
				case "DVM":
					return "Arch Obj";
					break;
				case "SYS":
					return "System Load";
					break;
				case "DIA":
					return "Dialog Job";
					break;
				case "BTC":
					return "Batch Job";
					break;
				case "RFC":
					return "RFC Call";
					break;
				default:
					return "";
			}
		},

		checkValidity: function checkValidity() {

			if (this.state.skip) {

				return true;
			} else {

				if (this.state.objList.length != 0) {

					return true;
				} else {

					return false;
				}
			}
		},

		render: function render() {
			var FormItem = Form.Item;
			var Option = Select.Option;
			var RadioButton = Radio.Button;
			var RadioGroup = Radio.Group;
			var Step = Steps.Step;
			var ButtonGroup = Button.Group;

			var areaData = [{
				value: 'B',
				label: 'Business',
				children: [{
					value: 'TBL',
					label: 'Table'
				}, {
					value: 'DVM',
					label: 'DVM Object'
				}]
			}, {
				value: 'S',
				label: 'Service',
				children: [{
					value: 'BTC',
					label: 'Background Job'
				}, {
					value: 'DIA',
					label: 'Dialog Transaction'
				}, {
					value: 'RFC',
					label: 'RFC Call'
				}]
			}, {
				value: 'R',
				label: 'Resource',
				children: [{
					value: 'SYS',
					label: 'System Load'
				}]
			}];

			var columns = [{
				title: 'Tech Object',
				dataIndex: 'factor_name',
				width: 200
				//sorter: (a, b) => a.factor_name - b.factor_name,
			}, {
				title: 'Factor Business Name',
				dataIndex: 'factor_business_name',
				width: 220
			}, {
				title: 'Type',
				dataIndex: 'factor_type',
				width: 80
			}];

			var item = this.props.content.objList;
			var data = [];

			var itemLen = item.length;

			for (var i = 0; i < itemLen; i++) {

				var type = this.typeTrans(item[i].FACTOR_TYPE);

				data.push({
					key: item[i].FACTOR_GUID,
					factor_name: item[i].FACTOR_NAME,
					factor_business_name: item[i].FACTOR_BUSINESS_NAME,
					factor_type: type
				});
			}

			var pagination = {
				total: data.length, //------
				pageSize: 5,
				showSizeChanger: true,
				pageSizeOptions: ['5', '10', '20', '30'],
				onShowSizeChange: function onShowSizeChange(current, pageSize) {
					//console.log('Current: ', current, '; PageSize: ', pageSize);
				},
				onChange: function onChange(current) {
					//console.log('Current: ', current);
				}
			};
			if (this.state.skip) {

				var rowSelection = {
					selectedRowKeys: this.state.objList,
					onChange: function onChange(selectedRowKeys, selectedRows) {
						//console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
					},
					onSelect: function onSelect(record, selected, selectedRows) {
						//console.log(record, selected, selectedRows);
					},
					onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {
						//console.log(selected, selectedRows, changeRows);
					},

					getCheckboxProps: function getCheckboxProps(record) {
						return {
							disabled: record.key != ''
						};
					}
				};
			} else {
				var that = this;
				var rowSelection = {
					selectedRowKeys: this.state.objList,
					onChange: function onChange(selectedRowKeys, selectedRows) {
						//console.log('onChange');
						//console.log('selectedRowKeys: ', selectedRowKeys, 'selectedRows: ', selectedRows);

						that.setState({
							objList: selectedRowKeys
						});
					},
					onSelect: function onSelect(record, selected, selectedRows) {
						//console.log('onSelect');
						//console.log(record, selected, selectedRows);
					},
					onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {
						//console.log('onSelectAll');
						//console.log(selected, selectedRows, changeRows);
					},

					getCheckboxProps: function getCheckboxProps(record) {
						return {
							disabled: record.key === ''
						};
					}
				};
			}

			return React.createElement(
				"div",
				{ style: { marginTop: 20 } },
				React.createElement(
					Form,
					null,
					React.createElement(
						FormItem,
						{
							label: "Skip Factor Selection",
							labelCol: { span: 6 },
							validateStatus: !!this.checkValidity() ? 'success' : 'warning',
							help: !!this.checkValidity() ? 'Factor selection Skiped. Pre-difine template will be used.' : 'Please select at least one factor, or switch to SKIP.'
						},
						React.createElement(Switch, { defaultChecked: this.state.skip, onChange: this.onSetSkip, checkedChildren: React.createElement(Icon, { type: "check" }), unCheckedChildren: React.createElement(Icon, { type: "cross" }) })
					),
					React.createElement(Table, { rowSelection: rowSelection, columns: columns, dataSource: data, pagination: pagination, scroll: { y: 280 }, onChange: this.onChange })
				)
			);
		}

	});

	//CreateCardStep1 = Form.create()(CreateCardStep1);
	var CreateCardStep2 = React.createClass({
		displayName: "CreateCardStep2",


		pinTrans: function pinTrans(pin) {
			switch (pin) {
				case true:
					return "Yes";
					break;
				default:
					return "No";
			}
		},
		freqTrans: function freqTrans(freq) {
			switch (freq) {
				case "1":
					return "hourly";
					break;
				case "2":
					return "daily";
					break;
				case "3":
					return "weekly";
					break;
				case "4":
					return "monthly";
					break;
				default:
					return "";
			}
		},
		typeTrans: function typeTrans(type) {
			switch (type) {
				case "TBL":
					return "Table";
					break;
				case "DVM":
					return "Arch Obj";
					break;
				case "SYS":
					return "System Load";
					break;
				case "DIA":
					return "Dialog Job";
					break;
				case "BTC":
					return "Batch Job";
					break;
				case "RFC":
					return "RFC Call";
					break;
				default:
					return "";
			}
		},
		cateTrans: function cateTrans(cate) {
			switch (cate) {
				case "S":
					return "Service";
					break;
				case "B":
					return "Business";
					break;
				case "R":
					return "Resource";
					break;
				default:
					return "";
			}
		},

		render: function render() {
			var FormItem = Form.Item;
			return React.createElement(
				"div",
				{ style: { marginTop: 25 } },
				React.createElement(
					"h5",
					null,
					"Please confirm the following information:"
				),
				React.createElement(
					Form,
					{ horizontal: true, style: { marginTop: 25 } },
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Factor Name",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.props.formData.techName
						)
					),
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Description",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.props.formData.busiName
						)
					),
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Category",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.cateTrans(this.props.formData.type[0])
						)
					),
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Type",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.typeTrans(this.props.formData.type[1])
						)
					),
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Aggregation",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.freqTrans(this.props.formData.freq)
						)
					),
					React.createElement(
						FormItem,
						{ className: "form-item",
							label: "Pin or not",
							labelCol: { span: 5 },
							wrapperCol: { span: 17 }
						},
						React.createElement(
							"h6",
							null,
							this.pinTrans(this.props.formData.pin)
						)
					)
				)
			);
		}

	});

	var CreateCardStep3 = React.createClass({
		displayName: "CreateCardStep3",


		render: function render() {

			if (this.props.editObj) {
				var successInfo = "Object # " + this.props.formData.techName + " # Has Been Successfully Updated !";
			} else {
				var successInfo = "New Object # " + this.props.formData.techName + " # Has Been Successfully Created !";
			}

			return React.createElement(
				"div",
				{ style: { marginTop: 25 } },
				React.createElement(Alert, { message: "Success",
					description: successInfo,
					type: "success",
					showIcon: true
				})
			);
		}

	});

	/*let ConfigModal = React.createClass({
   getInitialState: function() {
 	return {
 	  ModalText: '对话框的内容',
 	  visible: true,
 	};
   },
   showModal: function() {
 	this.setState({
 	  visible: true,
 	});
   },
   handleOk: function() {
 	console.log('点击了queren');
 	this.setState({
 	  visible: false,
 	});
   },
   handleCancel() {
 	console.log('点击了取消');
 	this.setState({
 	  visible: false,
 	});
   },
   render() {
 	return (
 			<Modal title="对话框标题"
 		  visible={this.state.visible}
 		  onOk={this.handleOk}
 		  onCancel={this.handleCancel}
 		>
 		  <p>{this.state.ModalText}</p>
 		</Modal>
 		);
   },
 });*/

	var PieChart = React.createClass({
		displayName: "PieChart",

		componentDidMount: function componentDidMount() {
			var that = this;
			this.chart = new ReactHighCharts['Chart'](this.getDOMNode(), {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: ''
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							color: '#000000',
							connectorColor: '#000000',
							format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						}
					}
				},
				series: [{
					type: "pie",
					name: "Category Share",
					data: that.props.seriesArr
				}],
				className: 'pie-chart'
			});
		},

		componentWillUnmount: function componentWillUnmount() {
			this.chart.destroy();
		},

		render: function render() {
			return React.createElement("div", { className: "pie" });
		}
	});

	rc.Tile = React.createClass({
		displayName: "Tile",


		//-----
		//mixins: [componentMixin],
		componentDidMount: function componentDidMount() {
			//this.interactDrag = global.setNodeDragable(this.getDOMNode());
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		onChange: function onChange(pagination, filters, sorter) {},
		pinTrans: function pinTrans(pin) {
			switch (pin) {
				case "X":
					return "X";
					break;
				default:
					return "";
			}
		},
		typeTrans: function typeTrans(type) {
			switch (type) {
				case "TBL":
					return "Table";
					break;
				case "DVM":
					return "Arch Obj";
					break;
				case "SYS":
					return "System Load";
					break;
				case "DIA":
					return "Dialog Job";
					break;
				case "BTC":
					return "Batch Job";
					break;
				case "RFC":
					return "RFC Call";
					break;
				default:
					return "";
			}
		},
		cateTrans: function cateTrans(cate) {
			switch (cate) {
				case "Table":
					return "B";
					break;
				case "Arch Obj":
					return "B";
					break;
				case "System Load":
					return "R";
					break;
				case "Dialog Job":
					return "S";
					break;
				case "Batch Job":
					return "S";
					break;
				case "RFC Call":
					return "S";
					break;
				default:
					return "";
			}
		},
		onRowClick: function onRowClick(record, index) {

			var data = {};
			data.style = {
				top: this.props.content.style.top + this.getDOMNode().clientHeight + 30,
				left: 240
			};

			//data.style.left = 300;
			//data.style.top = 100;

			data.type = "ITEM";
			data.guidArr = new Array(record.key.toString());
			data.FACTOR_NAME = new Array(record.factor_name);
			data.category = new Array(this.cateTrans(record.factor_type));

			displayAreaChangeActions.displayAreaAddCardAction(pageStatusDataStore.getCurrentStatus(), data);
		},
		//-----
		render: function render() {
			var that = this;
			var item = this.props.content.objList;
			var data = [];

			var itemLen = item.length;

			for (var i = 0; i < itemLen; i++) {

				var type = this.typeTrans(item[i].FACTOR_TYPE);
				var pin = this.pinTrans(item[i].PIN);

				data.push({
					key: item[i].FACTOR_GUID,
					factor_name: item[i].FACTOR_NAME,
					factor_business_name: item[i].FACTOR_BUSINESS_NAME,
					factor_type: type,
					factor_trend: item[i].TREND + "%",
					factor_pin: pin
				});
			}

			var pagination = {
				total: data.length,
				pageSize: 5,
				showSizeChanger: true,
				pageSizeOptions: ['5', '10', '20', '30'],
				onShowSizeChange: function onShowSizeChange(current, pageSize) {
					//console.log('Current: ', current, '; PageSize: ', pageSize);
				},
				onChange: function onChange(current) {
					//console.log('Current: ', current);
				}
			};

			var columns = [{
				title: 'Tech Object',
				dataIndex: 'factor_name',
				width: 200
				//sorter: (a, b) => a.factor_name - b.factor_name,
			}, {
				title: 'Factor Business Name',
				dataIndex: 'factor_business_name',
				width: 220
			}, {
				title: 'Type',
				dataIndex: 'factor_type',
				width: 80
			}, {
				title: 'Growth',
				dataIndex: 'factor_trend',
				width: 60
			}, {
				title: 'Sticked',
				dataIndex: "factor_pin",
				width: 60
			}];

			return(
				/*<Card className="tile" data-type="ITEM" data-factor_guid={this.props.content.FACTOR_GUID} data-factor_name={this.props.content.FACTOR_NAME} bodyStyle={{ paddingLeft: 10, paddingRight: 10 }}>
      {this.props.content.FACTOR_NAME}<br/>
    {this.props.content.FACTOR_BUSINESS_NAME}<br/>
      {this.props.content.TREND+"%"}<br/>
      {this.props.content.FACTOR_GUID}
    </Card>*/
				//var currentStatus = pageStatusDataStore.getCurrentStatus();
				//var item = this.props.item;
				React.createElement(
					LocaleProvider,
					null,
					React.createElement(Table, { columns: columns, dataSource: data, pagination: pagination, scroll: { y: 300 }, onChange: this.onChange, onRowClick: this.onRowClick.bind(this) })
				)
			);
		}
	});

	rc.DataCard = React.createClass({
		displayName: "DataCard",

		mixins: [componentMixin],
		componentDidMount: function componentDidMount() {
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		render: function render() {

			return React.createElement(
				Card,
				{ className: "data-card",
					title: this.props.card.title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },


				/*this.props.card.objList.map(function(item) {	
      return (<rc.Tile content={this.props.card.objList} />);
          })*/
				React.createElement(rc.Tile, { content: this.props.card }),
				" "
			);
		}
	});

	rc.LineChartCard = React.createClass({
		displayName: "LineChartCard",

		mixins: [componentMixin],
		getInitialState: function getInitialState() {
			return {
				rangeMin: this.props.card.lineChartAxis[0].length - 30,
				rangeMax: this.props.card.lineChartAxis[0].length,
				rangeLimit: this.props.card.lineChartAxis[0].length
			};
		},
		onChange: function onChange(value) {
			this.setState({
				rangeMin: value[0],
				rangeMax: value[1]
			});
		},
		//var confirm = Modal.confirm;
		showConfirmEdit: function showConfirmEdit(text) {
			var that = this;
			Modal.confirm({
				title: 'Edit Object',
				content: 'coming soon ...',
				onOk: function onOk() {

					that.removeCard().bind(that);
				},
				onCancel: function onCancel() {},
				okText: 'OK',
				cancelText: 'Cancel'
			});
		},
		showConfirmMark: function showConfirmMark(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Pin to Data Area',
				content: 'Please confirm to pin [' + text + '] to left Data Area',
				onOk: function onOk() {
					if (displayAreaDataStore.pinObject(guid, '1')) {
						message.success('Object Successfully Pinned to Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Pin Object', 3.5);
					}
				},
				onCancel: function onCancel() {
					if (displayAreaDataStore.pinObject(guid, '0')) {
						message.success('Object Successfully Un-Pinned From Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Un-Pin Object', 3.5);
					}
				},
				okText: 'Pin',
				cancelText: 'Un-Pin'
			});
		},
		showConfirmDelete: function showConfirmDelete(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Caution! Delete Object',
				content: 'Please confirm to delete object [' + text + ']',
				onOk: function onOk() {

					if (displayAreaDataStore.deleteObject(guid)) {
						message.success('Object Successfully Deleted', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
						//that.removeCard();
						displayAreaChangeActions.displayAreaRemoveCardAction(pageStatusDataStore.getCurrentStatus(), that.props.card.id);
					} else {
						message.error('Failed to Delete Object', 3.5);
					}
				},
				onCancel: function onCancel() {},
				okText: 'Delete',
				cancelText: 'Cancel'
			});
		},
		componentDidMount: function componentDidMount() {
			var that = this;

			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			this.interactDrop = global.setAreaDropable({
				element: this.getDOMNode(),
				accept: '.function-button, .data-item, .config-button',
				ondrop: function ondrop(event) {
					var draggableElement = event.relatedTarget,
					    dropzoneElement = event.target;
					var currentStatus = pageStatusDataStore.getCurrentStatus();
					var cardId = that.props.card.id;
					var data = {};

					data.info = draggableElement.getAttribute('data-info');

					switch (data.info) {
						case "ANALYSIS":
							console.log('case ANALYSIS');
							var factorName = that.props.card.FACTOR_NAME[0];
							var nextStatus = "ANALYSIS " + factorName;
							if (pageStatusDataStore.getAllStatus().indexOf(nextStatus) < 0) {
								var sIntervalCallId;

								(function () {
									var addStatus = function addStatus() {
										if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
											clearInterval(sIntervalCallId);
											pageStatusChangeActions.pageStatusAddAction(nextStatus);
										}
									};

									displayAreaChangeActions.displayAreaAddPageAction(nextStatus, cardId);
									dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
									functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);

									sIntervalCallId = setInterval(function () {
										addStatus();
									}, 100);
									;
								})();
							} else {
								pageStatusChangeActions.pageStatusChangeAction(nextStatus);
							}

							break;
						case "RCA":
							console.log('case RCA');
							if (!dataPanelDataStore.isSubItemExisted(currentStatus)) {
								var cardGuid;
								var sIntervalCallId;

								(function () {
									var addPieCard = function addPieCard() {
										if (dataPanelDataStore.isSubItemExisted(currentStatus)) {
											clearInterval(sIntervalCallId);
											var oData = {
												type: "PIE",
												style: style,
												objList: dataPanelDataStore.getObjList(currentStatus)
											};
											displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
										}
									};

									var style = {
										top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
										left: 240
									};
									cardGuid = that.props.card.guidArr[0];

									dataPanelItemChangeActions.dataPanelRCAAddItemAction(currentStatus, cardGuid);

									sIntervalCallId = setInterval(function () {
										addPieCard();
									}, 200);
								})();
							} else if (!displayAreaDataStore.isCardExisted(currentStatus, "PIE")) {
								var _style = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "PIE",
									style: _style,
									objList: dataPanelDataStore.getObjList(currentStatus)
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case "WHAT_IF":
							console.log('case WHAT_IF');
							if (!displayAreaDataStore.isCardExisted(currentStatus, "WHAT_IF") && displayAreaDataStore.getCardLineNumber(currentStatus, cardId) > 1) {
								var _style2 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: that.getDOMNode().clientWidth + 240 + 30
								};
								var guidArr = that.props.card.guidArr;
								var oData = {
									FACTOR_NAME: that.props.card.FACTOR_NAME,
									type: "WHAT_IF",
									style: _style2,
									factorGuid: guidArr[0],
									factorGuidStr: guidArr.slice(1).join(","),
									category: that.props.card.category[0]
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case currentStatus + "-ITEM":
							console.log('case ' + currentStatus + '-ITEM');
							if (currentStatus != "INIT" && that.props.card.type != "WHAT_IF") {

								data.guid = draggableElement.getAttribute('data-factor_guid');
								data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
								data.category = draggableElement.getAttribute('data-category');
								displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
							}
							break;
						// case "INIT-ITEM":
						//   data.guid = draggableElement.getAttribute('data-factor_guid');
						//   data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
						//   displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
						//   break;

						case "NOTE":
							console.log('NOTE');

							break;

						case "DELETE":
							console.log('DELETE');

							that.showConfirmDelete(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;

						case "EDIT":
							console.log('EDIT');
							//that.showConfirmEdit(that.props.card.FACTOR_NAME);
							if (!displayAreaDataStore.isCardExisted(currentStatus, "EDIT")) {

								var _style3 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "EDIT",
									style: _style3,
									title: "Edit Object - " + that.props.card.FACTOR_NAME[0],
									editObj: that.props.card.guidArr[0]
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}
							break;

						case "MARK":
							console.log('MARK');
							that.showConfirmMark(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;
						default:
							;
					}
				}
			});
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		render: function render() {
			var title = "",
			    lineNameArr = [];
			if (this.props.card.type === "ITEM") {
				lineNameArr = this.props.card.FACTOR_NAME[0];
				title = "Trend Analysis " + lineNameArr;
			} else if (this.props.card.type === "WHAT_IF") {
				lineNameArr = this.props.card.lineNameArr;
				title = "Predict Analysis " + this.props.card.FACTOR_NAME[0];
			}

			////////////////
			if (this.props.card.type === "ITEM") {
				var arrLen = this.props.card.FACTOR_NAME.length;
				var subLineChart = [];

				for (var i = 0; i < arrLen; i++) {

					subLineChart[i] = React.createElement(LineChart, {
						chartAxisArr: this.props.card.lineChartAxis[i],
						chartValueArr: this.props.card.lineChartValue[i],
						lineNameArr: this.props.card.FACTOR_NAME[i],
						axisMin: this.state.rangeMin,
						axisMax: this.state.rangeMax,
						factorCate: this.props.card.category[i],
						showLabel: i === 0 ? true : false

					});
				}
			} else if (this.props.card.type === "WHAT_IF") {
				var subLineChart = React.createElement(PredictLineChart, { chartAxisArr: this.props.card.lineChartAxis,
					chartValueArr: this.props.card.lineChartValue,
					lineNameArr: lineNameArr,
					axisMin: this.state.rangeMin,
					axisMax: this.state.rangeMax,
					factorCate: this.props.card.category[0]
				});
			}

			////////////////

			return React.createElement(
				Card,
				{ className: "line-card",
					title: title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }),
					bodyStyle: {
						padding: 0
					} },
				subLineChart,
				React.createElement(Slider, { min: 1, max: this.state.rangeLimit, range: true, defaultValue: [this.state.rangeMin, this.state.rangeMax], onChange: this.onChange.bind(this) })
			);
		}
	});

	var InfDetailBlock = React.createClass({
		displayName: "InfDetailBlock",

		render: function render() {
			var objList = this.props.objs;
			var map = {
				B: 'Business Volume',
				S: 'Service Response',
				R: 'Resource'
			};
			var objs = {};
			var objArr = [];
			for (var i = 0; i < objList.length; i++) {
				var li = React.createElement(
					"li",
					{ key: i },
					React.createElement(
						Tooltip,
						{ placement: "right", title: 'Influence rate: ' + parseFloat(objList[i].INFLUENCE_RATE).toFixed(2) },
						React.createElement(
							"span",
							null,
							objList[i].FACTOR_NAME
						)
					)
				);
				if (objs[map[objList[i].FACTOR_CATEGORY]]) {
					objs[map[objList[i].FACTOR_CATEGORY]].push(li);
				} else {
					objs[map[objList[i].FACTOR_CATEGORY]] = [li];
				}
			}
			// convert into array
			for (var obj in objs) {
				objArr.push({
					category: obj,
					list: objs[obj]
				});
			}
			return React.createElement(
				"div",
				{ className: "inf-detail" },
				objArr.map(function (item) {
					return React.createElement(
						"div",
						null,
						React.createElement(
							"h3",
							null,
							item.category
						),
						React.createElement(
							"ul",
							null,
							item.list
						)
					);
				})
			);
		}
	});

	rc.PieChartCard = React.createClass({
		displayName: "PieChartCard",

		mixins: [componentMixin],
		componentDidMount: function componentDidMount() {
			this.interactable = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		render: function render() {
			return React.createElement(
				Card,
				{ className: "pie-card",
					title: "Why This Performance Issue Happened(By Probability)?",
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }),
					bodyStyle: {
						padding: 0
					} },
				React.createElement(PieChart, { seriesArr: this.props.card.seriesArr }),
				" ",
				React.createElement(InfDetailBlock, { objs: this.props.card.objList
				}),
				" "
			);
		}
	});/*
})(window.React, window.rc, window.ReactHighCharts, window.jQuery, window);*/