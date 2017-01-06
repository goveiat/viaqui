










'use strict';var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../../../react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _components={_component:{}};var _reactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/node_modules/react-native/Libraries/Image/Image.android.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _reactTransformHmrLibIndexJs2(Component,id);};}

var NativeMethodsMixin=require('NativeMethodsMixin');
var NativeModules=require('NativeModules');
var ImageResizeMode=require('ImageResizeMode');
var ImageStylePropTypes=require('ImageStylePropTypes');
var ViewStylePropTypes=require('ViewStylePropTypes');
var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var StyleSheet=require('StyleSheet');
var StyleSheetPropType=require('StyleSheetPropType');
var View=require('View');

var flattenStyle=require('flattenStyle');
var merge=require('merge');
var requireNativeComponent=require('requireNativeComponent');
var resolveAssetSource=require('resolveAssetSource');
var Set=require('Set');
var filterObject=require('fbjs/lib/filterObject');

var PropTypes=React.PropTypes;var

ImageLoader=
NativeModules.ImageLoader;

var _requestId=1;
function generateRequestId(){
return _requestId++;
}
























var ImageViewAttributes=merge(ReactNativeViewAttributes.UIView,{
src:true,
loadingIndicatorSrc:true,
resizeMethod:true,
resizeMode:true,
progressiveRenderingEnabled:true,
fadeDuration:true,
shouldNotifyLoadEvents:true});


var ViewStyleKeys=new Set(Object.keys(ViewStylePropTypes));
var ImageSpecificStyleKeys=new Set(Object.keys(ImageStylePropTypes).filter(function(x){return!ViewStyleKeys.has(x);}));

var Image=_wrapComponent('_component')(React.createClass({displayName:'Image',
propTypes:_extends({},
View.propTypes,{
style:StyleSheetPropType(ImageStylePropTypes),








source:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number,

PropTypes.arrayOf(
PropTypes.shape({
uri:PropTypes.string,
width:PropTypes.number,
height:PropTypes.number}))]),







loadingIndicatorSource:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),

progressiveRenderingEnabled:PropTypes.bool,
fadeDuration:PropTypes.number,



onLoadStart:PropTypes.func,



onError:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func,



testID:PropTypes.string,



















resizeMethod:PropTypes.oneOf(['auto','resize','scale']),



















resizeMode:PropTypes.oneOf(['cover','contain','stretch','center'])}),


statics:{
resizeMode:ImageResizeMode,

getSize:function getSize(
url,
success,
failure)
{
return ImageLoader.getSize(url).
then(function(sizes){
success(sizes.width,sizes.height);
}).
catch(failure||function(){
console.warn('Failed to get size for image: '+url);
});
},





prefetch:function prefetch(url,callback){
var requestId=generateRequestId();
callback&&callback(requestId);
return ImageLoader.prefetchImage(url,requestId);
},




abortPrefetch:function abortPrefetch(requestId){
ImageLoader.abortRequest(requestId);
},








queryCache:function queryCache(urls){return regeneratorRuntime.async(function queryCache$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(
ImageLoader.queryCache(urls));case 2:return _context.abrupt('return',_context.sent);case 3:case'end':return _context.stop();}}},null,this);},







resolveAssetSource:resolveAssetSource},


mixins:[NativeMethodsMixin],






viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


_updateViewConfig:function _updateViewConfig(props){
if(props.children){
this.viewConfig={
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView};

}else{
this.viewConfig={
uiViewClassName:'RCTImageView',
validAttributes:ImageViewAttributes};

}
},

componentWillMount:function componentWillMount(){
this._updateViewConfig(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
this._updateViewConfig(nextProps);
},

contextTypes:{
isInAParentText:React.PropTypes.bool},


render:function render(){
var source=resolveAssetSource(this.props.source);
var loadingIndicatorSource=resolveAssetSource(this.props.loadingIndicatorSource);




if(source&&source.uri===''){
console.warn('source.uri should not be an empty string');
}

if(this.props.src){
console.warn('The <Image> component requires a `source` property rather than `src`.');
}

if(source&&(source.uri||Array.isArray(source))){
var style=void 0;
var sources=void 0;
if(source.uri){var
_width=source.width,_height=source.height;
style=flattenStyle([{width:_width,height:_height},styles.base,this.props.style]);
sources=[{uri:source.uri}];
}else{
style=flattenStyle([styles.base,this.props.style]);
sources=source;
}var _props=

this.props,onLoadStart=_props.onLoadStart,onLoad=_props.onLoad,onLoadEnd=_props.onLoadEnd,onError=_props.onError;
var nativeProps=merge(this.props,{
style:style,
shouldNotifyLoadEvents:!!(onLoadStart||onLoad||onLoadEnd||onError),
src:sources,
loadingIndicatorSrc:loadingIndicatorSource?loadingIndicatorSource.uri:null});


if(nativeProps.children){

var containerStyle=filterObject(style,function(val,key){return!ImageSpecificStyleKeys.has(key);});
var imageStyle=filterObject(style,function(val,key){return ImageSpecificStyleKeys.has(key);});
var imageProps=merge(nativeProps,{
style:[imageStyle,styles.absoluteImage],
children:undefined});


return(
React.createElement(View,{style:containerStyle},
React.createElement(RKImage,imageProps),
this.props.children));


}else{
if(this.context.isInAParentText){
return React.createElement(RCTTextInlineImage,nativeProps);
}else{
return React.createElement(RKImage,nativeProps);
}
}
}
return null;
}}));


var styles=StyleSheet.create({
base:{
overflow:'hidden'},

absoluteImage:{
left:0,
right:0,
top:0,
bottom:0,
position:'absolute'}});



var cfg={
nativeOnly:{
src:true,
loadingIndicatorSrc:true,
shouldNotifyLoadEvents:true}};


var RKImage=requireNativeComponent('RCTImageView',Image,cfg);
var RCTTextInlineImage=requireNativeComponent('RCTTextInlineImage',Image,cfg);

module.exports=Image;