










'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var PanResponder=require('PanResponder');

var invariant=require('fbjs/lib/invariant');





var EmptyPanHandlers={
onMoveShouldSetPanResponder:null,
onPanResponderGrant:null,
onPanResponderMove:null,
onPanResponderRelease:null,
onPanResponderTerminate:null};var






NavigationAbstractPanResponder=



function NavigationAbstractPanResponder(){var _this=this;_classCallCheck(this,NavigationAbstractPanResponder);
var config={};
Object.keys(EmptyPanHandlers).forEach(function(name){
var fn=_this[name];

invariant(
typeof fn==='function',
'subclass of `NavigationAbstractPanResponder` must implement method %s',
name);


config[name]=fn.bind(_this);
},this);

this.panHandlers=PanResponder.create(config).panHandlers;
};


module.exports=NavigationAbstractPanResponder;