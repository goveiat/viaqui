










'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _components={_component:{}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Components/ToolbarAndroid/ToolbarAndroid.android.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var Image=require('Image');
var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var UIManager=require('UIManager');
var View=require('View');
var ColorPropType=require('ColorPropType');

var requireNativeComponent=require('requireNativeComponent');
var resolveAssetSource=require('resolveAssetSource');

var ReactPropTypes=React.PropTypes;

var optionalImageSource=ReactPropTypes.oneOfType([
Image.propTypes.source,


ReactPropTypes.oneOf([])]);





































var ToolbarAndroid=_wrapComponent('_component')(React.createClass({displayName:'ToolbarAndroid',
mixins:[NativeMethodsMixin],

propTypes:_extends({},
View.propTypes,{













actions:ReactPropTypes.arrayOf(ReactPropTypes.shape({
title:ReactPropTypes.string.isRequired,
icon:optionalImageSource,
show:ReactPropTypes.oneOf(['always','ifRoom','never']),
showWithText:ReactPropTypes.bool})),




logo:optionalImageSource,



navIcon:optionalImageSource,




onActionSelected:ReactPropTypes.func,



onIconClicked:ReactPropTypes.func,



overflowIcon:optionalImageSource,



subtitle:ReactPropTypes.string,



subtitleColor:ColorPropType,



title:ReactPropTypes.string,



titleColor:ColorPropType,








contentInsetStart:ReactPropTypes.number,








contentInsetEnd:ReactPropTypes.number,










rtl:ReactPropTypes.bool,



testID:ReactPropTypes.string}),


render:function render(){
var nativeProps=_extends({},
this.props);

if(this.props.logo){
nativeProps.logo=resolveAssetSource(this.props.logo);
}
if(this.props.navIcon){
nativeProps.navIcon=resolveAssetSource(this.props.navIcon);
}
if(this.props.overflowIcon){
nativeProps.overflowIcon=resolveAssetSource(this.props.overflowIcon);
}
if(this.props.actions){
var nativeActions=[];
for(var i=0;i<this.props.actions.length;i++){
var action=_extends({},
this.props.actions[i]);

if(action.icon){
action.icon=resolveAssetSource(action.icon);
}
if(action.show){
action.show=UIManager.ToolbarAndroid.Constants.ShowAsAction[action.show];
}
nativeActions.push(action);
}
nativeProps.nativeActions=nativeActions;
}

return React.createElement(NativeToolbar,_extends({onSelect:this._onSelect},nativeProps));
},

_onSelect:function _onSelect(event){
var position=event.nativeEvent.position;
if(position===-1){
this.props.onIconClicked&&this.props.onIconClicked();
}else{
this.props.onActionSelected&&this.props.onActionSelected(position);
}
}}));


var NativeToolbar=requireNativeComponent('ToolbarAndroid',ToolbarAndroid,{
nativeOnly:{
nativeActions:true}});



module.exports=ToolbarAndroid;