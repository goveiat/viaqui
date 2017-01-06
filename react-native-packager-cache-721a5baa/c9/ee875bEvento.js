Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../node_modules/react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _nativeBase=require('native-base');














var _reactNative=require('react-native');

var _reactNativeDatepicker=require('react-native-datepicker');var _reactNativeDatepicker2=_interopRequireDefault(_reactNativeDatepicker);

var _reactNativeEasyGrid=require('react-native-easy-grid');

var _reactNativeImagePicker=require('react-native-image-picker');var _reactNativeImagePicker2=_interopRequireDefault(_reactNativeImagePicker);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={Evento:{displayName:'Evento'}};var _node_modulesReactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/components/Evento.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _node_modulesReactTransformHmrLibIndexJs2(Component,id);};}

var Item=_nativeBase.Picker.Item;

var opcoesCamera={
title:'Selecionar Foto',
cancelButtonTitle:'Cancelar',
takePhotoButtonTitle:'Nova Foto',
chooseFromLibraryButtonTitle:'Foto da Galeria',
storageOptions:{
skipBackup:true,
path:'images'}};



var servicos=[
{
id:-1,
nome:'Selecione um Serviço',
valor:0.00},

{
id:1,
nome:'Escova',
valor:30.00},

{
id:2,
nome:'Corte masculino',
valor:12.00},

{
id:3,
nome:'Corte feminino',
valor:20.00}];



var styles=_reactNative.StyleSheet.create({
card:{margin:15},
foto:{height:130}});var Evento=_wrapComponent('Evento')(function(_Component){_inherits(Evento,_Component);





function Evento(props){_classCallCheck(this,Evento);var _this=_possibleConstructorReturn(this,(Evento.__proto__||Object.getPrototypeOf(Evento)).call(this,
props));

_this.state={
servicos:[],
selecionado:-1,
data:new Date(),
hora:new Date(),
antes:null,
depois:null,
salvando:false};return _this;


}_createClass(Evento,[{key:'componentDidMount',value:function componentDidMount()


{
this.setState({servicos:servicos,salvando:false});
}},{key:'render',value:function render()


{var _this2=this;
return(
_react3.default.createElement(_nativeBase.Container,null,
_react3.default.createElement(_nativeBase.Header,null,
_react3.default.createElement(_nativeBase.Button,{transparent:true,onPress:function onPress(){return _this2.voltar();}},
_react3.default.createElement(_nativeBase.Icon,{name:'ios-arrow-back'})),

_react3.default.createElement(_nativeBase.Title,null,this.props.titulo)),


_react3.default.createElement(_nativeBase.Content,null,
_react3.default.createElement(_nativeBase.Card,{style:styles.card},
_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_nativeBase.Picker,{
mode:'dropdown',
selectedValue:this.state.selecionado,
onValueChange:this.selecionar.bind(this)},
this.state.servicos.map(function(item,k){return _react3.default.createElement(Item,{key:k,label:item.nome,value:item.id});}))),


_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_reactNativeEasyGrid.Grid,null,
_react3.default.createElement(_reactNativeEasyGrid.Row,null,
_react3.default.createElement(_reactNativeEasyGrid.Col,null,
_react3.default.createElement(_reactNative.Text,null,'Data')),

_react3.default.createElement(_reactNativeEasyGrid.Col,{alignItems:'center'},
_react3.default.createElement(_reactNativeDatepicker2.default,{
date:this.state.data,
mode:'date',
showIcon:false,
format:'DD/MM/YYYY',
confirmBtnText:'Ok',
cancelBtnText:'Cancelar',
customStyles:{
dateInput:{
borderWidth:0}},


onDateChange:function onDateChange(data){_this2.setState({data:data});}}))))),





_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_reactNativeEasyGrid.Grid,null,
_react3.default.createElement(_reactNativeEasyGrid.Row,null,
_react3.default.createElement(_reactNativeEasyGrid.Col,null,_react3.default.createElement(_reactNative.Text,null,'Hora')),
_react3.default.createElement(_reactNativeEasyGrid.Col,{alignItems:'center'},
_react3.default.createElement(_reactNativeDatepicker2.default,{
date:this.state.hora,
mode:'time',
showIcon:false,
format:'HH:mm',
confirmBtnText:'Ok',
cancelBtnText:'Cancelar',
customStyles:{
dateInput:{
borderWidth:0}},


onDateChange:function onDateChange(hora){_this2.setState({hora:hora});}}))))),





_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_reactNativeEasyGrid.Grid,null,
_react3.default.createElement(_reactNativeEasyGrid.Row,{style:styles.foto},
_react3.default.createElement(_reactNativeEasyGrid.Col,null,_react3.default.createElement(_nativeBase.Button,{block:true,onPress:function onPress(){return _this2.obterFoto('antes');}},' Antes ')),
_react3.default.createElement(_reactNativeEasyGrid.Col,{alignItems:'center'},this.exibirFoto('antes'))))),



_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_reactNativeEasyGrid.Grid,null,
_react3.default.createElement(_reactNativeEasyGrid.Row,{style:styles.foto},
_react3.default.createElement(_reactNativeEasyGrid.Col,null,_react3.default.createElement(_nativeBase.Button,{block:true,onPress:function onPress(){return _this2.obterFoto('depois');}},' Depois ')),
_react3.default.createElement(_reactNativeEasyGrid.Col,{alignItems:'center'},this.exibirFoto('depois'))))),



_react3.default.createElement(_nativeBase.CardItem,null,
this.exibirBotao())))));





}},{key:'exibirBotao',value:function exibirBotao()

{var _this3=this;
if(!this.state.salvando){
return _react3.default.createElement(_nativeBase.Button,{block:true,onPress:function onPress(){return _this3.salvar();}},' Salvar ');
}else{
return _react3.default.createElement(_nativeBase.Button,{block:true,disabled:true},' Enviando... ');
}
}},{key:'salvar',value:function salvar()

{
var state=this.state;
var dados={
cliente:this.props.idCliente,
servico:state.selecionado,
data:state.data,
hora:state.hora,
antes:state.antes,
depois:state.depois};


this.setState({salvando:true});
}},{key:'selecionar',value:function selecionar(


id){
this.setState({selecionado:id});
}},{key:'voltar',value:function voltar()


{
this.props.navigator.pop();
}},{key:'exibirFoto',value:function exibirFoto(


foto){
if(this.state[foto]!=null){
return _react3.default.createElement(_nativeBase.Thumbnail,{square:true,size:120,source:this.state[foto]});
}else{
return _react3.default.createElement(_reactNative.Text,null,'Selecione uma Foto');
}
}},{key:'obterFoto',value:function obterFoto(


tipo){var _this4=this;
_reactNativeImagePicker2.default.showImagePicker(opcoesCamera,function(response){
console.log('Response = ',response);

if(response.didCancel){
console.log('User cancelled image picker');
}else if(response.error){
console.log('ImagePicker Error: ',response.error);
}else if(response.customButton){
console.log('User tapped custom button: ',response.customButton);
}else{
var source={uri:'data:image/jpeg;base64,'+response.data,isStatic:true};
if(tipo=='antes'){
_this4.setState({
antes:source});

}else{
_this4.setState({
depois:source});

}
}
});
}}]);return Evento;}(_react2.Component));exports.default=Evento;