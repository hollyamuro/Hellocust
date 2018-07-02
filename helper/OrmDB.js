/**
 * 系統資料庫連線設定
 * @module helper/OrmDB.js
 */

"use strict";

const config     = require("../Config");
const _sequelize = require("sequelize");

module.exports = {
	"CustodianWeb": new _sequelize( 
		config[process.env.NODE_ENV].database_config.CustodianWeb.database, 
		config[process.env.NODE_ENV].database_config.CustodianWeb.username, 
		config[process.env.NODE_ENV].database_config.CustodianWeb.password, 
		config[process.env.NODE_ENV].database_config.CustodianWeb.options
	),
	"BondGolDB": new _sequelize( 
		config[process.env.NODE_ENV].database_config.BondGol.database, 
		config[process.env.NODE_ENV].database_config.BondGol.username, 
		config[process.env.NODE_ENV].database_config.BondGol.password, 
		config[process.env.NODE_ENV].database_config.BondGol.options
	),
	"sequelize": _sequelize, 
	"op": _sequelize.Op,
};