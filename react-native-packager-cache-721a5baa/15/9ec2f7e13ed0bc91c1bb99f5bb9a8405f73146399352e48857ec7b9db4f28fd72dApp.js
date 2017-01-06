Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../node_modules/react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _reactNative=require('react-native');
var _Clientes=require('./Clientes');var _Clientes2=_interopRequireDefault(_Clientes);
var _Evento=require('./Evento');var _Evento2=_interopRequireDefault(_Evento);
var _Init=require('./Init');var _Init2=_interopRequireDefault(_Init);
var _reactNativeSplashScreen=require('react-native-splash-screen');var _reactNativeSplashScreen2=_interopRequireDefault(_reactNativeSplashScreen);
var _reactNativeStorage=require('react-native-storage');var _reactNativeStorage2=_interopRequireDefault(_reactNativeStorage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={App:{displayName:'App'}};var _node_modulesReactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/components/App.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _node_modulesReactTransformHmrLibIndexJs2(Component,id);};}var App=_wrapComponent('App')(function(_Component){_inherits(App,_Component);





function App(props){_classCallCheck(this,App);var _this=_possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this,
props));

_this.state={
storage:new _reactNativeStorage2.default({
size:1000,
storageBackend:_reactNative.AsyncStorage,
defaultExpires:null,
enableCache:true,
sync:{}})};return _this;


}_createClass(App,[{key:'componentDidMount',value:function componentDidMount()

{
_reactNativeSplashScreen2.default.hide();
this.state.storage.save({
key:'user',
rawData:{nome:'joao'}});

}},{key:'render',value:function render()

{
return(
_react3.default.createElement(_reactNative.Navigator,{
style:{flex:1},
initialRoute:{name:'Init'},
renderScene:this.exibeView}));

}},{key:'exibeView',value:function exibeView(

route,navigator){
if(route.name=='Init'){
return _react3.default.createElement(_Init2.default,{navigator:navigator,storage:this.state.storage});
}

if(route.name=='Clientes'){
return _react3.default.createElement(_Clientes2.default,{navigator:navigator,storage:this.state.storage});
}
if(route.name=='Evento'){
return _react3.default.createElement(_Evento2.default,{navigator:navigator,titulo:route.cliente,idCliente:route.idCliente,storage:this.state.storage});
}
}}]);return App;}(_react2.Component));exports.default=App;