/**
 * 系統訊息處理
 * @module helper/MessageHandler.js
 */

"use strict";

/**
 * 反饋錯誤處理
 * @param  {Object} error
 */
module.exports.errorHandler = (error) => {

	const messageCodes = require("./MessageCodes");
	const debug = require("debug")("CustodianApi:MessageHandler.errorHandler");
	
	try
	{
		switch(error.name){ 
		/* sequelize database error */
		case "SequelizeValidationError": {
					
			let errMsg = "";
			for(let i=0; i<error.errors.length;i++){
				errMsg = errMsg + error.errors[i].message + ";" ;
			}
					
			return {
				"type": 	messageCodes.ERROR.ERROR_WRONG_DATA_FORMAT.type,
				"message": 	messageCodes.ERROR.ERROR_WRONG_DATA_FORMAT.message + "(" + errMsg + ")",
			};
		}
		case "SequelizeDatabaseError": {
			return {
				"type": 	messageCodes.ERROR.ERROR_DATABASE_REQUEST_FAIL.type,
				"message": 	messageCodes.ERROR.ERROR_DATABASE_REQUEST_FAIL.message,
			};
		}

		/* new error handle rule add here */
		
		default:{
			/* customize code (name use base error)*/
			if(messageCodes.ERROR[error.name]){
				return {
					"type": 	messageCodes.ERROR[error.name].type,
					"message": 	messageCodes.ERROR[error.name].message + "(" + (error.message) + ")",
				};
			}

			/* customize code (name use default error)*/
			if(messageCodes.ERROR[error.message]){
				return {
					"type": 	messageCodes.ERROR[error.message].type,
					"message": 	messageCodes.ERROR[error.message].message,
				};
			}
				
			/* default code */
			return {
				"type": 	messageCodes.ERROR.ERROR_INTERNAL_SERVER_ERROR.type,
				"message": 	messageCodes.ERROR.ERROR_INTERNAL_SERVER_ERROR.message,
			};
		}
		}
	}
	catch(err){
		debug(err.stack);
		throw(err);
	}
};

/**
 * 反饋訊息處理
 * @param  {String} msgCode
 */
module.exports.infoHandler = (msgCode) => {
	
	const messageCodes = require("./MessageCodes");
	const debug = require("debug")("CustodianApi:MessageHandler.infoHandler");

	try
	{
		if(messageCodes.INFO[msgCode]){
			return {
				"type": 	messageCodes.INFO[msgCode].type,
				"message": 	messageCodes.INFO[msgCode].message,
			};
		}

		if(messageCodes.WARN[msgCode]){
			return {
				"type": 	messageCodes.WARN[msgCode].type,
				"message": 	messageCodes.WARN[msgCode].message,
			};
		}

		//default
		return {
			"type": 	messageCodes.INFO.INFO_OK.type,
			"message": 	messageCodes.INFO.INFO_OK.message,
		};

	}
	catch(err){
		debug(err.stack);
		throw(err);
	}
};