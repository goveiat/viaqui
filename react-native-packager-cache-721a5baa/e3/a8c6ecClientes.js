Object.defineProperty(exports,"__esModule",{value:true});var _react2=require('react');var _react3=_interopRequireDefault(_react2);var _index=require('./../node_modules/react-transform-hmr/lib/index.js');var _index2=_interopRequireDefault(_index);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _nativeBase=require('native-base');
















var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _components={Clientes:{displayName:'Clientes'}};var _node_modulesReactTransformHmrLibIndexJs2=(0,_index2.default)({filename:'/home/thiago/C\xF3digos/node/viaqui/components/Clientes.js',components:_components,locals:[module],imports:[_react3.default]});function _wrapComponent(id){return function(Component){return _node_modulesReactTransformHmrLibIndexJs2(Component,id);};}

var clientes=[
{
id:1,
nome:'Silvio Santos',
fone:'(31) 98888-1010',
endereco:'Rua José F. de Almeida, 1, Bromélias, Timóteo',
img:'https://papodepobre.files.wordpress.com/2010/03/silviosantos11.jpg'},

{
id:2,
nome:'Sr. Bean',
fone:'(31) 98888-5555',
endereco:'Rua Lagoa Bonita, 2, Recanto, Ipatinga',
img:'https://lh4.googleusercontent.com/-GHbxQwi10Tw/TXMnL75BVzI/AAAAAAAAAHI/qoyGEPaluRQ/s1600/mrbean-270x300.jpg'},

{
id:3,
nome:'Maria da Silva',
fone:'(31) 98888-9999',
endereco:'Rua José F. de Almeida, 3, Bromélias, Timóteo',
img:'https://viintagegirl.files.wordpress.com/2013/07/sev-hayley-williams-beauty-makeover-2011-mdn.jpg'}];




var pontos=[
{
idCliente:1,
pontos:100},

{
idCliente:2,
pontos:200},

{
idCliente:3,
pontos:300}];




var styles=_reactNative.StyleSheet.create({
card:{margin:15},
avatar:{marginRight:10},
nome:{fontWeight:'bold'}});var Clientes=_wrapComponent('Clientes')(function(_Component){_inherits(Clientes,_Component);





function Clientes(props){_classCallCheck(this,Clientes);var _this=_possibleConstructorReturn(this,(Clientes.__proto__||Object.getPrototypeOf(Clientes)).call(this,
props));

_this.state={
clientes:[],
filtrados:[],
pontos:[]};return _this;

}_createClass(Clientes,[{key:'componentDidMount',value:function componentDidMount()


{
this.setState({
clientes:clientes,
filtrados:clientes});

}},{key:'render',value:function render()


{
return(
_react3.default.createElement(_nativeBase.Container,null,
_react3.default.createElement(_nativeBase.Header,null,
_react3.default.createElement(_nativeBase.Title,null,'Clientes')),


_react3.default.createElement(_nativeBase.Content,null,
_react3.default.createElement(_nativeBase.Card,{style:styles.card},
_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_nativeBase.InputGroup,{borderType:'underline',iconRight:true},
_react3.default.createElement(_nativeBase.Input,{placeholder:'Pesquisar',onChangeText:this.filtrar.bind(this)}),
_react3.default.createElement(_nativeBase.Icon,{name:'ios-search'})))),



_react3.default.createElement(_nativeBase.Card,{style:styles.card},
this.exibir()))));






}},{key:'exibir',value:function exibir()

{var _this2=this;
if(this.state.filtrados.length>0){
return(
this.state.filtrados.map(function(item,k){return(
_react3.default.createElement(_nativeBase.CardItem,{key:k,button:true,onPress:function onPress(){return _this2.navegar('Evento',item);}},
_react3.default.createElement(_nativeBase.Thumbnail,{style:styles.avatar,square:true,size:80,source:{uri:item.img}}),
_react3.default.createElement(_nativeBase.Grid,null,
_react3.default.createElement(_nativeBase.Row,null,_react3.default.createElement(_reactNative.Text,{style:styles.nome},item.nome)),
_react3.default.createElement(_nativeBase.Row,null,_react3.default.createElement(_reactNative.Text,null,item.fone)),
_react3.default.createElement(_nativeBase.Row,null,_react3.default.createElement(_reactNative.Text,null,item.endereco)))));}));




}else{
return(
_react3.default.createElement(_nativeBase.CardItem,null,
_react3.default.createElement(_reactNative.Text,null,'Nenhum Cliente foi encontrado.')));




}
}},{key:'filtrar',value:function filtrar(


busca){
var lista=[];
for(var _iterator=clientes,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var cliente=_ref;
if(cliente.nome.toLowerCase().indexOf(busca.toLowerCase())!==-1){
lista.push(cliente);
}
}
this.setState({filtrados:lista});
}},{key:'navegar',value:function navegar(


view,item){
switch(view){
case'Evento':
this.props.navigator.push({
name:view,
cliente:item.nome,
idCliente:item.id});

break;}

}}]);return Clientes;}(_react2.Component));exports.default=Clientes;