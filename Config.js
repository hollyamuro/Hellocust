/**
 * 系統設定檔
 * @module Config.js
 */

"use strict";

module.exports = {

	production:{
		/* Communication policy http/https */
		policy: "https",
		/* Port */
		port: 8084,
		/* Database setting */
		database_config: {
			CustodianWeb:{

			},
			BondGol:{

			},
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {

		},
		/*JwtService*/
		JwtService_api: {
			host: "128.110.5.43",
			port: "8086",
			policy: "https",
		},
	},
	development: {
		/* Communication policy http/https */
		policy: "https",
		/* Port */
		port: 3001,
		/* Database setting */
		database_config: {	
			CustodianWeb: {
				database: "CustodianWeb",  
				username: "apowner",
				password: "ok1234",
				options: {
					host: "128.110.5.43",
					dialect: "mssql",
					pool: { max: 5, min: 0, idle: 10000 },
					operatorsAliases: false
				}
			},	
			BondGol:{
				database: "bond_gol_uat",  
				username: "apowner",
				password: "ok1234",
				options: {
					host: "128.110.5.43",
					dialect: "mssql",
					pool: { max: 5, min: 0, idle: 10000 },
					operatorsAliases: false
				}
			},
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {
			host: "128.110.5.43",
			port: "8008",
			policy: "https",
		},
		/*JwtService*/
		JwtService_api: {
			host: "128.110.5.43",
			port: "8086",
			policy: "https",
		},
	},
};