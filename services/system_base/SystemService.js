/**
 * 系統基礎之商業邏輯
 * @module services/system_base/SystemService.js
 */

"use strict";

/**
  * 測試服務是否正常運作
  * @param  {} req
  * @param  {} res
  * @param  {} next
  * @see /
  */
module.exports.testService = (req, res, next) => {

	const debug = require("debug")("CustodianApi:SystemService.testService");

	try{
		const messageHandler = require("../../helper/MessageHandler");
		res.send({
			"code" : messageHandler.infoHandler("INFO_SERVICE_ALIVE"),
			"data": "",
		});
	}	
	catch(err){
		debug(err.stack);
		next(err);
	}
};