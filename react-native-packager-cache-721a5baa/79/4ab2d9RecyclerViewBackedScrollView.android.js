




'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _components={_component:{}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Components/ScrollView/RecyclerViewBackedScrollView.android.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var React=require('React');
var ScrollResponder=require('ScrollResponder');
var ScrollView=require('ScrollView');
var View=require('View');
var StyleSheet=require('StyleSheet');

var requireNativeComponent=require('requireNativeComponent');

var INNERVIEW='InnerView';




































var RecyclerViewBackedScrollView=_wrapComponent('_component')(React.createClass({displayName:'RecyclerViewBackedScrollView',

propTypes:_extends({},
ScrollView.propTypes),


mixins:[ScrollResponder.Mixin],

getInitialState:function getInitialState(){
return this.scrollResponderMixinGetInitialState();
},

getScrollResponder:function getScrollResponder(){
return this;
},

setNativeProps:function setNativeProps(props){
this.refs[INNERVIEW].setNativeProps(props);
},

_handleContentSizeChange:function _handleContentSizeChange(event){var _event$nativeEvent=
event.nativeEvent,width=_event$nativeEvent.width,height=_event$nativeEvent.height;
this.props.onContentSizeChange(width,height);
},












scrollTo:function scrollTo(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
}else{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;
}
this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});
},

render:function render(){
var recyclerProps=_extends({},
this.props,{
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
onScroll:this.scrollResponderHandleScroll,
ref:INNERVIEW});


if(this.props.onContentSizeChange){
recyclerProps.onContentSizeChange=this._handleContentSizeChange;
}

var wrappedChildren=React.Children.map(this.props.children,function(child){
if(!child){
return null;
}
return(
React.createElement(View,{
collapsable:false,
style:styles.absolute},
child));


});

var refreshControl=this.props.refreshControl;
if(refreshControl){

return React.cloneElement(
refreshControl,
{style:[styles.base,this.props.style]},
React.createElement(NativeAndroidRecyclerView,_extends({},recyclerProps,{style:styles.base}),
wrappedChildren));


}

return(
React.createElement(NativeAndroidRecyclerView,_extends({},recyclerProps,{style:[styles.base,this.props.style]}),
wrappedChildren));


}}));


var styles=StyleSheet.create({
absolute:{
position:'absolute',
top:0,
left:0,
right:0},

base:{
flex:1}});



var NativeAndroidRecyclerView=requireNativeComponent(
'AndroidRecyclerViewBackedScrollView',
RecyclerViewBackedScrollView);


module.exports=RecyclerViewBackedScrollView;