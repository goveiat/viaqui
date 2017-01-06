Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../node_modules/react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _reactNative=require('react-native');
var _nativeBase=require('native-base');
var _logo=require('../img/logo.png');var _logo2=_interopRequireDefault(_logo);
var _reactNativeEasyGrid=require('react-native-easy-grid');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={Init:{displayName:'Init'}};var _node_modulesReactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/components/Init.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _node_modulesReactTransformHmrLibIndexJs2(Component,id);};}
var styles=_reactNative.StyleSheet.create({});var Init=_wrapComponent('Init')(function(_Component){_inherits(Init,_Component);






function Init(props){_classCallCheck(this,Init);var _this=_possibleConstructorReturn(this,(Init.__proto__||Object.getPrototypeOf(Init)).call(this,
props));

_this.state={};return _this;

}_createClass(Init,[{key:'componentDidMount',value:function componentDidMount()

{
this.props.storage.load({
key:'user',
id:'1002'}).
then(function(ret){
console.log(ret.nome);
}).catch(function(err){
console.warn(err.message);
switch(err.name){
case'NotFoundError':
console.log('NotFoundError');
break;
case'ExpiredError':
console.log('ExpiredError');
break;}

});
}},{key:'render',value:function render()

{
return(
_react3.default.createElement(_reactNative.Image,{style:{flex:10,width:null,height:null},resizeMode:'cover',source:require('../img/background.jpg')},
_react3.default.createElement(_nativeBase.Container,null,
_react3.default.createElement(_nativeBase.Content,null,
_react3.default.createElement(_reactNativeEasyGrid.Grid,{style:{padding:30}},
_react3.default.createElement(_reactNativeEasyGrid.Row,{style:{padding:20}},
_react3.default.createElement(_reactNativeEasyGrid.Col,null,
_react3.default.createElement(_reactNative.Image,{style:{alignSelf:'center'},source:_logo2.default}))),


_react3.default.createElement(_reactNativeEasyGrid.Row,null,
_react3.default.createElement(_reactNativeEasyGrid.Col,null,
_react3.default.createElement(_nativeBase.Card,null,
_react3.default.createElement(_nativeBase.CardItem,{header:true},
_react3.default.createElement(_reactNative.Text,{style:{textAlign:'center',fontWeight:'bold'}},'Seja Bem Vindo ao Viaqui, sua plataforma de Marketing Digital.')),

_react3.default.createElement(_nativeBase.CardItem,{cardBody:true},
_react3.default.createElement(_reactNative.Text,{style:{textAlign:'center'}},'Uma palavra chave foi enviada para o seu email pessoal. Informe-a no campo abaixo para prosseguir.'),
_react3.default.createElement(_reactNative.TextInput,{style:{color:'white',marginTop:15},placeholder:'Palavra Chave'}))))),




_react3.default.createElement(_reactNativeEasyGrid.Row,null,
_react3.default.createElement(_reactNativeEasyGrid.Col,null,
_react3.default.createElement(_nativeBase.Button,{large:true,block:true,success:true},'Enviar'))))))));







}}]);return Init;}(_react2.Component));exports.default=Init;