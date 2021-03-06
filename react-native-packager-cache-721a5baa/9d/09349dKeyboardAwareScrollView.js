Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reactNative=require('react-native');
var _KeyboardAwareMixin=require('./KeyboardAwareMixin');var _KeyboardAwareMixin2=_interopRequireDefault(_KeyboardAwareMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _components={_component:{}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var KeyboardAwareScrollView=_wrapComponent('_component')(_react3.default.createClass({displayName:'KeyboardAwareScrollView',
propTypes:_extends({},
_reactNative.ScrollView.propTypes,{
viewIsInsideTabBar:_react2.PropTypes.bool,
resetScrollToCoords:_react2.PropTypes.shape({
x:_react2.PropTypes.number,
y:_react2.PropTypes.number})}),


mixins:[_KeyboardAwareMixin2.default],

componentWillMount:function componentWillMount(){
this.setViewIsInsideTabBar(this.props.viewIsInsideTabBar);
this.setResetScrollToCoords(this.props.resetScrollToCoords);
},

getScrollResponder:function getScrollResponder(){
return this.refs._rnkasv_keyboardView.getScrollResponder();
},

render:function render(){var _this=this;
return(
_react3.default.createElement(_reactNative.ScrollView,_extends({
ref:'_rnkasv_keyboardView',
keyboardDismissMode:'interactive',
contentInset:{bottom:this.state.keyboardSpace},
showsVerticalScrollIndicator:true},
this.props,{
scrollEventThrottle:8,
onScroll:function onScroll(e){
_this.handleOnScroll(e);
_this.props.onScroll&&_this.props.onScroll(e);
}}),

this.props.children));


}}));exports.default=


KeyboardAwareScrollView;