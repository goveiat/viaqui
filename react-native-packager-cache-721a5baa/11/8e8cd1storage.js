Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();




var _error=require('./error');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Storage=function(){
function Storage(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,Storage);
var me=this;

me._SIZE=options.size||1000;
me.sync=options.sync||{};
me.defaultExpires=options.defaultExpires!==undefined?
options.defaultExpires:1000*3600*24;
me.enableCache=options.enableCache!==false;
me._s=options.storageBackend||null;
me._innerVersion=11;
me.cache={};

if(me._s&&me._s.setItem){
try{
var promiseTest=me._s.setItem('__react_native_storage_test','test');
me.isPromise=promiseTest&&promiseTest.then?true:false;
}
catch(e){
console.warn(e);
delete me._s;
throw e;
}
}else{
console.warn('Data would be lost after reload cause there is no storageBackend specified!\n      \nEither use localStorage(for web) or AsyncStorage(for React Native) as a storageBackend.');

}

me._mapPromise=me.getItem('map').then(function(map){
me._m=me._checkMap(map&&JSON.parse(map)||{});

});
}_createClass(Storage,[{key:'getItem',value:function getItem(
key){
return this._s?

this.isPromise?this._s.getItem(key):Promise.resolve(this._s.getItem(key)):

Promise.resolve();
}},{key:'setItem',value:function setItem(
key,value){
return this._s?

this.isPromise?this._s.setItem(key,value):Promise.resolve(this._s.setItem(key,value)):

Promise.resolve();
}},{key:'removeItem',value:function removeItem(
key){
return this._s?
this.isPromise?this._s.removeItem(key):Promise.resolve(this._s.removeItem(key)):

Promise.resolve();
}},{key:'_checkMap',value:function _checkMap(
map){
var me=this;
if(map&&map.innerVersion&&map.innerVersion===me._innerVersion){
return map;
}else
{
return{
innerVersion:me._innerVersion,
index:0,
__keys__:{}};

}
}},{key:'_getId',value:function _getId(
key,id){
return key+'_'+id;
}},{key:'_saveToMap',value:function _saveToMap(
params){var
key=params.key,id=params.id,data=params.data,
newId=this._getId(key,id),
m=this._m;
if(m[newId]!==undefined){

if(this.enableCache)this.cache[newId]=JSON.parse(data);
return this.setItem('map_'+m[newId],data);
}
if(m[m.index]!==undefined){

var oldId=m[m.index];
var splitOldId=oldId.split('_');
delete m[oldId];
this._removeIdInKey(splitOldId[0],splitOldId[1]);
if(this.enableCache){
delete this.cache[oldId];
}
}
m[newId]=m.index;
m[m.index]=newId;

m.__keys__[key]=m.__keys__[key]||[];
m.__keys__[key].push(id);

if(this.enableCache){
var cacheData=JSON.parse(data);
this.cache[newId]=cacheData;
}
var currentIndex=m.index;
if(++m.index===this._SIZE){
m.index=0;
}
this.setItem('map_'+currentIndex,data);
this.setItem('map',JSON.stringify(m));
}},{key:'save',value:function save(
params){
var me=this;var
key=params.key,id=params.id,rawData=params.rawData,expires=params.expires;
if(key.toString().indexOf('_')!==-1){
console.error('Please do not use "_" in key!');
}
var data={
rawData:rawData};

var now=new Date().getTime();
if(expires===undefined){
expires=me.defaultExpires;
}
if(expires!==null){
data.expires=now+expires;
}
data=JSON.stringify(data);
if(id===undefined){
if(me.enableCache){
var cacheData=JSON.parse(data);
me.cache[key]=cacheData;
}
return me.setItem(key,data);
}else
{
if(id.toString().indexOf('_')!==-1){
console.error('Please do not use "_" in id!');
}
return this._mapPromise.then(function(){return me._saveToMap({
key:key,
id:id,
data:data});});

}
}},{key:'getBatchData',value:function getBatchData(
querys){
var me=this;
var tasks=[];
for(var i=0,query;query=querys[i];i++){
tasks[i]=me.load(query);
}
return Promise.all(tasks);
}},{key:'getBatchDataWithIds',value:function getBatchDataWithIds(
params){
var me=this;var
key=params.key,ids=params.ids,syncInBackground=params.syncInBackground;

return Promise.all(
ids.map(function(id){return me.load({key:key,id:id,syncInBackground:syncInBackground,autoSync:false,batched:true});})).
then(function(results){
return new Promise(function(resolve,reject){
var ids=results.filter(function(value){return value.syncId!==undefined;});
if(!ids.length){
return resolve();
}
return me.sync[key]({
id:ids.map(function(value){return value.syncId;}),
resolve:resolve,
reject:reject});

}).then(function(data){
return results.map(function(value){
return value.syncId?data.shift():value;
});
});
});
}},{key:'_lookupGlobalItem',value:function _lookupGlobalItem(
params){
var me=this,
ret=void 0;var
key=params.key;
if(me.enableCache&&me.cache[key]!==undefined){
ret=me.cache[key];
return me._loadGlobalItem(_extends({ret:ret},params));
}
return me.getItem(key).then(function(ret){return me._loadGlobalItem(_extends({ret:ret},params));});
}},{key:'_loadGlobalItem',value:function _loadGlobalItem(
params){
var me=this;var
key=params.key,ret=params.ret,autoSync=params.autoSync,syncInBackground=params.syncInBackground;
if(ret===null||ret===undefined){
if(autoSync&&me.sync[key]){
return new Promise(function(resolve,reject){return me.sync[key]({resolve:resolve,reject:reject});});
}
return Promise.reject(new _error.NotFoundError(JSON.stringify(params)));
}
if(typeof ret==='string'){
ret=JSON.parse(ret);
if(this.enableCache){
this.cache[key]=ret;
}
}
var now=new Date().getTime();
if(ret.expires<now){
if(autoSync&&me.sync[key]){
if(syncInBackground){
me.sync[key]({});
return Promise.resolve(ret.rawData);
}
return new Promise(function(resolve,reject){return me.sync[key]({resolve:resolve,reject:reject});});
}
return Promise.reject(new _error.ExpiredError(JSON.stringify(params)));
}
return Promise.resolve(ret.rawData);
}},{key:'_noItemFound',value:function _noItemFound(
params){
var me=this;var
key=params.key,id=params.id,autoSync=params.autoSync;
if(me.sync[key]){
if(autoSync){
return new Promise(function(resolve,reject){return me.sync[key]({id:id,resolve:resolve,reject:reject});});
}
return Promise.resolve({syncId:id});
}
return Promise.reject(new _error.NotFoundError(JSON.stringify(params)));
}},{key:'_loadMapItem',value:function _loadMapItem(
params){
var me=this;var
ret=params.ret,key=params.key,id=params.id,autoSync=params.autoSync,batched=params.batched,syncInBackground=params.syncInBackground;
if(ret===null||ret===undefined){
return me._noItemFound(params);
}
if(typeof ret==='string'){
ret=JSON.parse(ret);var
_key=params.key,_id=params.id;
var newId=me._getId(_key,_id);
if(this.enableCache){
this.cache[newId]=ret;
}
}
var now=new Date().getTime();
if(ret.expires<now){
if(autoSync&&me.sync[key]){
if(syncInBackground){
me.sync[key]({id:id});
return Promise.resolve(ret.rawData);
}
return new Promise(function(resolve,reject){return me.sync[key]({id:id,resolve:resolve,reject:reject});});
}
if(batched){
return Promise.resolve({syncId:id});
}
return Promise.reject(new _error.ExpiredError(JSON.stringify(params)));
}
return Promise.resolve(ret.rawData);
}},{key:'_lookUpInMap',value:function _lookUpInMap(
params){
var me=this,
m=me._m,
ret=void 0;var
key=params.key,id=params.id;
var newId=me._getId(key,id);
if(me.enableCache&&me.cache[newId]){
ret=me.cache[newId];
return me._loadMapItem(_extends({ret:ret},params));
}
if(m[newId]!==undefined){
return me.getItem('map_'+m[newId]).then(function(ret){return me._loadMapItem(_extends({ret:ret},params));});
}
return me._noItemFound(_extends({ret:ret},params));
}},{key:'remove',value:function remove(
params){var _this=this;
return this._mapPromise.then(function(){
var me=_this,
m=me._m;var
key=params.key,id=params.id;

if(id===undefined){
if(me.enableCache&&me.cache[key]){
delete me.cache[key];
}
return me.removeItem(key);
}
var newId=me._getId(key,id);


if(m[newId]!==undefined){
if(me.enableCache&&me.cache[newId]){
delete me.cache[newId];
}
me._removeIdInKey(key,id);
var idTobeDeleted=m[newId];
delete m[newId];
me.setItem('map',JSON.stringify(m));
return me.removeItem('map_'+idTobeDeleted);
}
});
}},{key:'_removeIdInKey',value:function _removeIdInKey(
key,id){
var indexTobeRemoved=this._m.__keys__[key].indexOf(id);
if(indexTobeRemoved!==-1){
this._m.__keys__[key].splice(indexTobeRemoved,1);
}
}},{key:'load',value:function load(
params){
var me=this;var
key=params.key,id=params.id,autoSync=params.autoSync,syncInBackground=params.syncInBackground;
if(autoSync===undefined){
autoSync=true;
}
if(syncInBackground===undefined){
syncInBackground=true;
}
return me._mapPromise.then(function(){return new Promise(function(resolve,reject){
if(id===undefined){
return resolve(me._lookupGlobalItem({key:key,resolve:resolve,reject:reject,autoSync:autoSync,syncInBackground:syncInBackground}));
}
return resolve(me._lookUpInMap({key:key,id:id,resolve:resolve,reject:reject,autoSync:autoSync,syncInBackground:syncInBackground}));
});});
}},{key:'clearMap',value:function clearMap()
{
var me=this;
me.removeItem('map');
me._m={
innerVersion:me._innerVersion,
index:0};

}},{key:'clearMapForKey',value:function clearMapForKey(
key){var _this2=this;
return this._mapPromise.then(function(){
var tasks=_this2._m.__keys__[key].map(function(id){return _this2.remove({key:key,id:id});});
return Promise.all(tasks);
});
}},{key:'getIdsForKey',value:function getIdsForKey(
key){var _this3=this;
return this._mapPromise.then(function(){
return _this3._m.__keys__[key]||[];
});
}},{key:'getAllDataForKey',value:function getAllDataForKey(
key,options){var _this4=this;
options=_extends({syncInBackground:true},options);
return this.getIdsForKey(key).then(function(ids){
var querys=ids.map(function(id){return{key:key,id:id,syncInBackground:options.syncInBackground};});
return _this4.getBatchData(querys);
});
}}]);return Storage;}();exports.default=Storage;