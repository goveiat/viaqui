









'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _components={_component:{}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Components/ProgressBarAndroid/ProgressBarAndroid.android.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var View=require('View');
var ColorPropType=require('ColorPropType');

var requireNativeComponent=require('requireNativeComponent');

var ReactPropTypes=React.PropTypes;

var STYLE_ATTRIBUTES=[
'Horizontal',
'Normal',
'Small',
'Large',
'Inverse',
'SmallInverse',
'LargeInverse'];


var indeterminateType=function indeterminateType(props,propName,componentName){
var checker=function checker(){
var indeterminate=props[propName];
var styleAttr=props.styleAttr;
if(!indeterminate&&styleAttr!=='Horizontal'){
return new Error('indeterminate=false is only valid for styleAttr=Horizontal');
}
};

return ReactPropTypes.bool(props,propName,componentName)||checker();
};
























var ProgressBarAndroid=_wrapComponent('_component')(React.createClass({displayName:'ProgressBarAndroid',
propTypes:_extends({},
View.propTypes,{











styleAttr:ReactPropTypes.oneOf(STYLE_ATTRIBUTES),




indeterminate:indeterminateType,



progress:ReactPropTypes.number,



color:ColorPropType,



testID:ReactPropTypes.string}),


getDefaultProps:function getDefaultProps(){
return{
styleAttr:'Normal',
indeterminate:true};

},

mixins:[NativeMethodsMixin],

componentDidMount:function componentDidMount(){
if(this.props.indeterminate&&this.props.styleAttr!=='Horizontal'){
console.warn(
'Circular indeterminate `ProgressBarAndroid`'+
'is deprecated. Use `ActivityIndicator` instead.');

}
},

render:function render(){
return React.createElement(AndroidProgressBar,this.props);
}}));


var AndroidProgressBar=requireNativeComponent(
'AndroidProgressBar',
ProgressBarAndroid,
{nativeOnly:{animating:true}});


module.exports=ProgressBarAndroid;