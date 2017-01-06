










'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_temp2;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={ViewPagerAndroid:{displayName:'ViewPagerAndroid'}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Components/ViewPager/ViewPagerAndroid.android.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var React=require('React');
var ReactNative=require('ReactNative');
var UIManager=require('UIManager');
var View=require('View');

var dismissKeyboard=require('dismissKeyboard');
var requireNativeComponent=require('requireNativeComponent');

var ReactPropTypes=React.PropTypes;

var VIEWPAGER_REF='viewPager';var ViewPagerAndroid=_wrapComponent('ViewPagerAndroid')((_temp2=_class=function(_React$Component){_inherits(ViewPagerAndroid,_React$Component);function ViewPagerAndroid(){var _ref;var _temp,_this,_ret;_classCallCheck(this,ViewPagerAndroid);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=ViewPagerAndroid.__proto__||Object.getPrototypeOf(ViewPagerAndroid)).call.apply(_ref,[this].concat(args))),_this),_this.




























































































































getInnerViewNode=function(){
return _this.refs[VIEWPAGER_REF].getInnerViewNode();
},_this.

_childrenWithOverridenStyle=function(){



return React.Children.map(_this.props.children,function(child){
if(!child){
return null;
}
var newProps=_extends({},
child.props,{
style:[child.props.style,{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0,
width:undefined,
height:undefined}],

collapsable:false});

if(child.type&&
child.type.displayName&&
child.type.displayName!=='RCTView'&&
child.type.displayName!=='View'){
console.warn('Each ViewPager child must be a <View>. Was '+child.type.displayName);
}
return React.createElement(child.type,newProps);
});
},_this.

_onPageScroll=function(e){
if(_this.props.onPageScroll){
_this.props.onPageScroll(e);
}
if(_this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();
}
},_this.

_onPageScrollStateChanged=function(e){
if(_this.props.onPageScrollStateChanged){
_this.props.onPageScrollStateChanged(e.nativeEvent.pageScrollState);
}
},_this.

_onPageSelected=function(e){
if(_this.props.onPageSelected){
_this.props.onPageSelected(e);
}
},_this.





setPage=function(selectedPage){
UIManager.dispatchViewManagerCommand(
ReactNative.findNodeHandle(_this),
UIManager.AndroidViewPager.Commands.setPage,
[selectedPage]);

},_this.





setPageWithoutAnimation=function(selectedPage){
UIManager.dispatchViewManagerCommand(
ReactNative.findNodeHandle(_this),
UIManager.AndroidViewPager.Commands.setPageWithoutAnimation,
[selectedPage]);

},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(ViewPagerAndroid,[{key:'componentDidMount',value:function componentDidMount(){if(this.props.initialPage!=null){this.setPageWithoutAnimation(this.props.initialPage);}}},{key:'render',value:function render()

{
return(
React.createElement(NativeAndroidViewPager,_extends({},
this.props,{
ref:VIEWPAGER_REF,
style:this.props.style,
onPageScroll:this._onPageScroll,
onPageScrollStateChanged:this._onPageScrollStateChanged,
onPageSelected:this._onPageSelected,
children:this._childrenWithOverridenStyle()})));


}}]);return ViewPagerAndroid;}(React.Component),_class.propTypes=_extends({},View.propTypes,{initialPage:ReactPropTypes.number,onPageScroll:ReactPropTypes.func,onPageScrollStateChanged:ReactPropTypes.func,onPageSelected:ReactPropTypes.func,pageMargin:ReactPropTypes.number,keyboardDismissMode:ReactPropTypes.oneOf(['none','on-drag']),scrollEnabled:ReactPropTypes.bool}),_temp2));


var NativeAndroidViewPager=requireNativeComponent('AndroidViewPager',ViewPagerAndroid);

module.exports=ViewPagerAndroid;