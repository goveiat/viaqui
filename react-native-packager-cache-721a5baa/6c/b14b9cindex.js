'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _require=

require('react-native'),NativeModules=_require.NativeModules;var
ImagePickerManager=NativeModules.ImagePickerManager;
var DEFAULT_OPTIONS={
title:'Select a Photo',
cancelButtonTitle:'Cancel',
takePhotoButtonTitle:'Take Photo…',
chooseFromLibraryButtonTitle:'Choose from Library…',
quality:1.0,
allowsEditing:false};


module.exports=_extends({},
ImagePickerManager,{
showImagePicker:function showImagePicker(options,callback){
if(typeof options==='function'){
callback=options;
options={};
}
return ImagePickerManager.showImagePicker(_extends({},DEFAULT_OPTIONS,options),callback);
}});