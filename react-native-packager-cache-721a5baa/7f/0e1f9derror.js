Object.defineProperty(exports,"__esModule",{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var



NotFoundError=exports.NotFoundError=
function NotFoundError(message){_classCallCheck(this,NotFoundError);
this.name='NotFoundError';
this.message='Not Found! Params: '+message;
this.stack=new Error().stack;
};var



ExpiredError=exports.ExpiredError=
function ExpiredError(message){_classCallCheck(this,ExpiredError);
this.name='ExpiredError';
this.message='Expired! Params: '+message;
this.stack=new Error().stack;
};