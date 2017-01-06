Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _reactNative=require('react-native');











var _style=require('./style');var _style2=_interopRequireDefault(_style);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={DatePicker:{displayName:'DatePicker'}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native-datepicker/index.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var FORMATS={
'date':'YYYY-MM-DD',
'datetime':'YYYY-MM-DD HH:mm',
'time':'HH:mm'};var DatePicker=_wrapComponent('DatePicker')(function(_Component){_inherits(DatePicker,_Component);



function DatePicker(props){_classCallCheck(this,DatePicker);var _this=_possibleConstructorReturn(this,(DatePicker.__proto__||Object.getPrototypeOf(DatePicker)).call(this,
props));

_this.state={
date:_this.getDate(),
modalVisible:false,
animatedHeight:new _reactNative.Animated.Value(0)};


_this.datePicked=_this.datePicked.bind(_this);
_this.onPressDate=_this.onPressDate.bind(_this);
_this.onPressCancel=_this.onPressCancel.bind(_this);
_this.onPressConfirm=_this.onPressConfirm.bind(_this);
_this.onDatePicked=_this.onDatePicked.bind(_this);
_this.onTimePicked=_this.onTimePicked.bind(_this);
_this.onDatetimePicked=_this.onDatetimePicked.bind(_this);
_this.onDatetimeTimePicked=_this.onDatetimeTimePicked.bind(_this);
_this.setModalVisible=_this.setModalVisible.bind(_this);return _this;
}_createClass(DatePicker,[{key:'componentWillMount',value:function componentWillMount()

{

console.ignoredYellowBox=[
'Warning: Failed propType'];


}},{key:'setModalVisible',value:function setModalVisible(

visible){var _props=
this.props,height=_props.height,duration=_props.duration;

this.setState({modalVisible:visible});


if(visible){
_reactNative.Animated.timing(
this.state.animatedHeight,
{
toValue:height,
duration:duration}).

start();
}else{
this.setState({
animatedHeight:new _reactNative.Animated.Value(0)});

}
}},{key:'onStartShouldSetResponder',value:function onStartShouldSetResponder(

e){
return true;
}},{key:'onMoveShouldSetResponder',value:function onMoveShouldSetResponder(

e){
return true;
}},{key:'onPressCancel',value:function onPressCancel()

{
this.setModalVisible(false);
}},{key:'onPressConfirm',value:function onPressConfirm()

{
this.datePicked();
this.setModalVisible(false);
}},{key:'getDate',value:function getDate()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.props.date;var _props2=
this.props,mode=_props2.mode,minDate=_props2.minDate,maxDate=_props2.maxDate,_props2$format=_props2.format,format=_props2$format===undefined?FORMATS[mode]:_props2$format;


if(!date){
var now=new Date();
if(minDate){
var _minDate=this.getDate(minDate);

if(now<_minDate){
return _minDate;
}
}

if(maxDate){
var _maxDate=this.getDate(maxDate);

if(now>_maxDate){
return _maxDate;
}
}

return now;
}

if(date instanceof Date){
return date;
}

return(0,_moment2.default)(date,format).toDate();
}},{key:'getDateStr',value:function getDateStr()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.props.date;var _props3=
this.props,mode=_props3.mode,_props3$format=_props3.format,format=_props3$format===undefined?FORMATS[mode]:_props3$format;

if(date instanceof Date){
return(0,_moment2.default)(date).format(format);
}else{
return(0,_moment2.default)(this.getDate(date)).format(format);
}
}},{key:'datePicked',value:function datePicked()

{
if(typeof this.props.onDateChange==='function'){
this.props.onDateChange(this.getDateStr(this.state.date),this.state.date);
}
}},{key:'getTitleElement',value:function getTitleElement()

{var _props4=
this.props,date=_props4.date,placeholder=_props4.placeholder,customStyles=_props4.customStyles;

if(!date&&placeholder){
return _react3.default.createElement(_reactNative.Text,{style:[_style2.default.placeholderText,customStyles.placeholderText]},placeholder);
}
return _react3.default.createElement(_reactNative.Text,{style:[_style2.default.dateText,customStyles.dateText]},this.getDateStr());
}},{key:'onDatePicked',value:function onDatePicked(_ref)

{var action=_ref.action,year=_ref.year,month=_ref.month,day=_ref.day;
if(action!==_reactNative.DatePickerAndroid.dismissedAction){
this.setState({
date:new Date(year,month,day)});

this.datePicked();
}
}},{key:'onTimePicked',value:function onTimePicked(_ref2)

{var action=_ref2.action,hour=_ref2.hour,minute=_ref2.minute;
if(action!==_reactNative.DatePickerAndroid.dismissedAction){
this.setState({
date:(0,_moment2.default)().hour(hour).minute(minute).toDate()});

this.datePicked();
}
}},{key:'onDatetimePicked',value:function onDatetimePicked(_ref3)

{var action=_ref3.action,year=_ref3.year,month=_ref3.month,day=_ref3.day;var _props5=
this.props,mode=_props5.mode,_props5$format=_props5.format,format=_props5$format===undefined?FORMATS[mode]:_props5$format,_props5$is24Hour=_props5.is24Hour,is24Hour=_props5$is24Hour===undefined?!format.match(/h|a/):_props5$is24Hour;

if(action!==_reactNative.DatePickerAndroid.dismissedAction){
var timeMoment=(0,_moment2.default)(this.state.date);

_reactNative.TimePickerAndroid.open({
hour:timeMoment.hour(),
minute:timeMoment.minutes(),
is24Hour:is24Hour}).
then(this.onDatetimeTimePicked.bind(this,year,month,day));
}
}},{key:'onDatetimeTimePicked',value:function onDatetimeTimePicked(

year,month,day,_ref4){var action=_ref4.action,hour=_ref4.hour,minute=_ref4.minute;
if(action!==_reactNative.DatePickerAndroid.dismissedAction){
this.setState({
date:new Date(year,month,day,hour,minute)});

this.datePicked();
}
}},{key:'onPressDate',value:function onPressDate()

{
if(this.props.disabled){
return true;
}


this.setState({
date:this.getDate()});


if(_reactNative.Platform.OS==='ios'){
this.setModalVisible(true);
}else{var _props6=

this.props,mode=_props6.mode,_props6$format=_props6.format,format=_props6$format===undefined?FORMATS[mode]:_props6$format,minDate=_props6.minDate,maxDate=_props6.maxDate,_props6$is24Hour=_props6.is24Hour,is24Hour=_props6$is24Hour===undefined?!format.match(/h|a/):_props6$is24Hour;


if(mode==='date'){
_reactNative.DatePickerAndroid.open({
date:this.state.date,
minDate:minDate&&this.getDate(minDate),
maxDate:maxDate&&this.getDate(maxDate)}).
then(this.onDatePicked);
}else if(mode==='time'){


var timeMoment=(0,_moment2.default)(this.state.date);

_reactNative.TimePickerAndroid.open({
hour:timeMoment.hour(),
minute:timeMoment.minutes(),
is24Hour:is24Hour}).
then(this.onTimePicked);
}else if(mode==='datetime'){


_reactNative.DatePickerAndroid.open({
date:this.state.date,
minDate:minDate&&this.getDate(minDate),
maxDate:maxDate&&this.getDate(maxDate)}).
then(this.onDatetimePicked);
}
}
}},{key:'render',value:function render()

{var _this2=this;var _props7=













this.props,mode=_props7.mode,style=_props7.style,customStyles=_props7.customStyles,disabled=_props7.disabled,showIcon=_props7.showIcon,iconSource=_props7.iconSource,minDate=_props7.minDate,maxDate=_props7.maxDate,minuteInterval=_props7.minuteInterval,timeZoneOffsetInMinutes=_props7.timeZoneOffsetInMinutes,cancelBtnText=_props7.cancelBtnText,confirmBtnText=_props7.confirmBtnText;

var dateInputStyle=[
_style2.default.dateInput,customStyles.dateInput,
disabled&&_style2.default.disabled,
disabled&&customStyles.disabled];


return(
_react3.default.createElement(_reactNative.TouchableHighlight,{
style:[_style2.default.dateTouch,style],
underlayColor:'transparent',
onPress:this.onPressDate},

_react3.default.createElement(_reactNative.View,{style:[_style2.default.dateTouchBody,customStyles.dateTouchBody]},
_react3.default.createElement(_reactNative.View,{style:dateInputStyle},
this.getTitleElement()),

showIcon&&_react3.default.createElement(_reactNative.Image,{
style:[_style2.default.dateIcon,customStyles.dateIcon],
source:iconSource}),

_reactNative.Platform.OS==='ios'&&_react3.default.createElement(_reactNative.Modal,{
transparent:true,
visible:this.state.modalVisible,
onRequestClose:function onRequestClose(){_this2.setModalVisible(false);}},

_react3.default.createElement(_reactNative.View,{
style:{flex:1}},

_react3.default.createElement(_reactNative.TouchableHighlight,{
style:_style2.default.datePickerMask,
activeOpacity:1,
underlayColor:'#00000077',
onPress:this.onPressCancel},

_react3.default.createElement(_reactNative.TouchableHighlight,{
underlayColor:'#fff',
style:{flex:1}},

_react3.default.createElement(_reactNative.Animated.View,{
style:[_style2.default.datePickerCon,{height:this.state.animatedHeight},customStyles.datePickerCon]},

_react3.default.createElement(_reactNative.DatePickerIOS,{
date:this.state.date,
mode:mode,
minimumDate:minDate&&this.getDate(minDate),
maximumDate:maxDate&&this.getDate(maxDate),
onDateChange:function onDateChange(date){return _this2.setState({date:date});},
minuteInterval:minuteInterval,
timeZoneOffsetInMinutes:timeZoneOffsetInMinutes,
style:[_style2.default.datePicker,customStyles.datePicker]}),

_react3.default.createElement(_reactNative.TouchableHighlight,{
underlayColor:'transparent',
onPress:this.onPressCancel,
style:[_style2.default.btnText,_style2.default.btnCancel,customStyles.btnCancel]},

_react3.default.createElement(_reactNative.Text,{
style:[_style2.default.btnTextText,_style2.default.btnTextCancel,customStyles.btnTextCancel]},

cancelBtnText)),


_react3.default.createElement(_reactNative.TouchableHighlight,{
underlayColor:'transparent',
onPress:this.onPressConfirm,
style:[_style2.default.btnText,_style2.default.btnConfirm,customStyles.btnConfirm]},

_react3.default.createElement(_reactNative.Text,{style:[_style2.default.btnTextText,customStyles.btnTextConfirm]},confirmBtnText))))))))));









}}]);return DatePicker;}(_react2.Component));


DatePicker.defaultProps={
mode:'date',
date:'',

height:259,


duration:300,
confirmBtnText:'确定',
cancelBtnText:'取消',
iconSource:require('./date_icon.png'),
customStyles:{},


showIcon:true,
disabled:false,
placeholder:'',
modalOnResponderTerminationRequest:function modalOnResponderTerminationRequest(e){return true;}};


DatePicker.propTypes={
mode:_react3.default.PropTypes.oneOf(['date','datetime','time']),
date:_react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string,_react3.default.PropTypes.instanceOf(Date)]),
format:_react3.default.PropTypes.string,
minDate:_react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string,_react3.default.PropTypes.instanceOf(Date)]),
maxDate:_react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string,_react3.default.PropTypes.instanceOf(Date)]),
height:_react3.default.PropTypes.number,
duration:_react3.default.PropTypes.number,
confirmBtnText:_react3.default.PropTypes.string,
cancelBtnText:_react3.default.PropTypes.string,
iconSource:_react3.default.PropTypes.oneOfType([_react3.default.PropTypes.number,_react3.default.PropTypes.object]),
customStyles:_react3.default.PropTypes.object,
showIcon:_react3.default.PropTypes.bool,
disabled:_react3.default.PropTypes.bool,
onDateChange:_react3.default.PropTypes.func,
placeholder:_react3.default.PropTypes.string,
modalOnResponderTerminationRequest:_react3.default.PropTypes.func,
is24Hour:_react3.default.PropTypes.bool};exports.default=


DatePicker;