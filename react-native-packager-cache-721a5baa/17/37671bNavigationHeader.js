































'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_temp;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={NavigationHeader:{displayName:'NavigationHeader'}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/CustomComponents/NavigationExperimental/NavigationHeader.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var React=require('React');
var ReactNative=require('react-native');
var NavigationHeaderTitle=require('NavigationHeaderTitle');
var NavigationHeaderBackButton=require('NavigationHeaderBackButton');
var NavigationPropTypes=require('NavigationPropTypes');
var NavigationHeaderStyleInterpolator=require('NavigationHeaderStyleInterpolator');
var ReactComponentWithPureRenderMixin=require('react/lib/ReactComponentWithPureRenderMixin');var


Animated=



ReactNative.Animated,Platform=ReactNative.Platform,StyleSheet=ReactNative.StyleSheet,View=ReactNative.View;































var APPBAR_HEIGHT=Platform.OS==='ios'?44:56;
var STATUSBAR_HEIGHT=Platform.OS==='ios'?20:0;var
PropTypes=React.PropTypes;var NavigationHeader=_wrapComponent('NavigationHeader')((_temp=_class=function(_React$Component){_inherits(NavigationHeader,_React$Component);function NavigationHeader(){_classCallCheck(this,NavigationHeader);return _possibleConstructorReturn(this,(NavigationHeader.__proto__||Object.getPrototypeOf(NavigationHeader)).apply(this,arguments));}_createClass(NavigationHeader,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(








































nextProps,nextState){
return ReactComponentWithPureRenderMixin.shouldComponentUpdate.call(
this,
nextProps,
nextState);

}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,scenes=_props.scenes,style=_props.style,viewProps=_props.viewProps;

var scenesProps=scenes.map(function(scene){
var props=NavigationPropTypes.extractSceneRendererProps(_this2.props);
props.scene=scene;
return props;
});

var barHeight=this.props.statusBarHeight instanceof Animated.Value?
Animated.add(this.props.statusBarHeight,new Animated.Value(APPBAR_HEIGHT)):
APPBAR_HEIGHT+this.props.statusBarHeight;

return(
React.createElement(Animated.View,_extends({style:[
styles.appbar,
{height:barHeight},
style]},

viewProps),

scenesProps.map(this._renderLeft,this),
scenesProps.map(this._renderTitle,this),
scenesProps.map(this._renderRight,this)));


}},{key:'_renderLeft',value:function _renderLeft(

props){
return this._renderSubView(
props,
'left',
this.props.renderLeftComponent,
NavigationHeaderStyleInterpolator.forLeft);

}},{key:'_renderTitle',value:function _renderTitle(

props){
return this._renderSubView(
props,
'title',
this.props.renderTitleComponent,
NavigationHeaderStyleInterpolator.forCenter);

}},{key:'_renderRight',value:function _renderRight(

props){
return this._renderSubView(
props,
'right',
this.props.renderRightComponent,
NavigationHeaderStyleInterpolator.forRight);

}},{key:'_renderSubView',value:function _renderSubView(


props,
name,
renderer,
styleInterpolator)
{var

scene=

props.scene,navigationState=props.navigationState;var


index=


scene.index,isStale=scene.isStale,key=scene.key;

var offset=navigationState.index-index;

if(Math.abs(offset)>2){


return null;
}

var subViewProps=_extends({},props,{onNavigateBack:this.props.onNavigateBack});
var subView=renderer(subViewProps);
if(subView===null){
return null;
}

var pointerEvents=offset!==0||isStale?'none':'box-none';
return(
React.createElement(Animated.View,{
pointerEvents:pointerEvents,
key:name+'_'+key,
style:[
styles[name],
{marginTop:this.props.statusBarHeight},
styleInterpolator(props)]},

subView));


}}]);return NavigationHeader;}(React.Component),_class.defaultProps={renderTitleComponent:function renderTitleComponent(props){var title=String(props.scene.route.title||'');return React.createElement(NavigationHeaderTitle,null,title);},renderLeftComponent:function renderLeftComponent(props){if(props.scene.index===0||!props.onNavigateBack){return null;}return React.createElement(NavigationHeaderBackButton,{onPress:props.onNavigateBack});},renderRightComponent:function renderRightComponent(props){return null;},statusBarHeight:STATUSBAR_HEIGHT},_class.propTypes=_extends({},NavigationPropTypes.SceneRendererProps,{onNavigateBack:PropTypes.func,renderLeftComponent:PropTypes.func,renderRightComponent:PropTypes.func,renderTitleComponent:PropTypes.func,style:View.propTypes.style,statusBarHeight:PropTypes.number,viewProps:PropTypes.shape(View.propTypes)}),_class.

HEIGHT=APPBAR_HEIGHT+STATUSBAR_HEIGHT,_class.
Title=NavigationHeaderTitle,_class.
BackButton=NavigationHeaderBackButton,_temp));



var styles=StyleSheet.create({
appbar:{
alignItems:'center',
backgroundColor:Platform.OS==='ios'?'#EFEFF2':'#FFF',
borderBottomColor:'rgba(0, 0, 0, .15)',
borderBottomWidth:Platform.OS==='ios'?StyleSheet.hairlineWidth:0,
elevation:4,
flexDirection:'row',
justifyContent:'flex-start'},


title:{
bottom:0,
left:APPBAR_HEIGHT,
position:'absolute',
right:APPBAR_HEIGHT,
top:0},


left:{
bottom:0,
left:0,
position:'absolute',
top:0},


right:{
bottom:0,
position:'absolute',
right:0,
top:0}});



module.exports=NavigationHeader;