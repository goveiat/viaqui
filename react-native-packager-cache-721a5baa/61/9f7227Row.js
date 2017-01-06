
'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _reactNative=require('react-native');

var _computeProps=require('../Utils/computeProps');var _computeProps2=_interopRequireDefault(_computeProps);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={RowNB:{displayName:'RowNB'}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native-easy-grid/Components/Row.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}var RowNB=_wrapComponent('RowNB')(function(_Component){_inherits(RowNB,_Component);function RowNB(){_classCallCheck(this,RowNB);return _possibleConstructorReturn(this,(RowNB.__proto__||Object.getPrototypeOf(RowNB)).apply(this,arguments));}_createClass(RowNB,[{key:'prepareRootProps',value:function prepareRootProps()



{

var type={
flexDirection:'row',
flex:this.props.size?this.props.size:this.props.style&&this.props.style.height?0:1};


var defaultProps={
style:type};

return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'setNativeProps',value:function setNativeProps(

nativeProps){
this._root.setNativeProps(nativeProps);
}},{key:'render',value:function render()

{var _this2=this;
return(
_react3.default.createElement(_reactNative.View,_extends({
ref:function ref(component){return _this2._root=component;}},
this.props,
this.prepareRootProps()),
this.props.children));

}}]);return RowNB;}(_react2.Component));exports.default=RowNB;