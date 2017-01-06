










'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={BoxInspector:{displayName:'BoxInspector'},BoxContainer:{displayName:'BoxContainer'}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Inspector/BoxInspector.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');
var resolveBoxStyle=require('resolveBoxStyle');

var blank={
top:0,
left:0,
right:0,
bottom:0};var BoxInspector=_wrapComponent('BoxInspector')(function(_React$Component){_inherits(BoxInspector,_React$Component);function BoxInspector(){_classCallCheck(this,BoxInspector);return _possibleConstructorReturn(this,(BoxInspector.__proto__||Object.getPrototypeOf(BoxInspector)).apply(this,arguments));}_createClass(BoxInspector,[{key:'render',value:function render()



{
var frame=this.props.frame;
var style=this.props.style;
var margin=style&&resolveBoxStyle('margin',style)||blank;
var padding=style&&resolveBoxStyle('padding',style)||blank;
return(
React.createElement(BoxContainer,{title:'margin',titleStyle:styles.marginLabel,box:margin},
React.createElement(BoxContainer,{title:'padding',box:padding},
React.createElement(View,null,
React.createElement(Text,{style:styles.innerText},'(',
frame.left,', ',frame.top,')'),

React.createElement(Text,{style:styles.innerText},
frame.width,' \xD7 ',frame.height)))));





}}]);return BoxInspector;}(React.Component));var BoxContainer=_wrapComponent('BoxContainer')(function(_React$Component2){_inherits(BoxContainer,_React$Component2);function BoxContainer(){_classCallCheck(this,BoxContainer);return _possibleConstructorReturn(this,(BoxContainer.__proto__||Object.getPrototypeOf(BoxContainer)).apply(this,arguments));}_createClass(BoxContainer,[{key:'render',value:function render()



{
var box=this.props.box;
return(
React.createElement(View,{style:styles.box},
React.createElement(View,{style:styles.row},
React.createElement(Text,{style:[this.props.titleStyle,styles.label]},this.props.title),
React.createElement(Text,{style:styles.boxText},box.top)),

React.createElement(View,{style:styles.row},
React.createElement(Text,{style:styles.boxText},box.left),
this.props.children,
React.createElement(Text,{style:styles.boxText},box.right)),

React.createElement(Text,{style:styles.boxText},box.bottom)));


}}]);return BoxContainer;}(React.Component));


var styles=StyleSheet.create({
row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

marginLabel:{
width:60},

label:{
fontSize:10,
color:'rgb(255,100,0)',
marginLeft:5,
flex:1,
textAlign:'left',
top:-3},

buffer:{
fontSize:10,
color:'yellow',
flex:1,
textAlign:'center'},

innerText:{
color:'yellow',
fontSize:12,
textAlign:'center',
width:70},

box:{
borderWidth:1,
borderColor:'grey'},

boxText:{
color:'white',
fontSize:12,
marginHorizontal:3,
marginVertical:2,
textAlign:'center'}});



module.exports=BoxInspector;