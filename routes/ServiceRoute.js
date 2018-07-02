/**
 * 系統共用路由
 * @module routes/StaffRoute.js
 */

"use strict";

/**
 * 共用功能路由
 * @param  {} app
 */
module.exports = (app) => {
	const systemService = require("../services/system_base/SystemService");
	app.route("/").all(systemService.testService);    
};