/**
 * 系統錯誤處理
 * @module helper/Auth.js
 * @see reference: https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status
 */

"use strict";

/* Basic error format */
class CustodianWebError extends Error {
	constructor(message, type, status) {
		super(message);
                
		this.name = this.constructor.name;
		this.type = type;
		this.status = status;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports.NotFoundError = class extends CustodianWebError {
	constructor(message) {
		super(message || "ERROR_NOT_FOUND", "ERROR", 404);
	}
};

module.exports.InternalServerError = class extends CustodianWebError {
	constructor(message) {
		super(message || "ERROR_INTERNAL_SERVER_ERROR", "ERROR", 500);
	}
};
