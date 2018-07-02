/**
 * 系統訊息代碼列表
 * @module helper/MessageHandler.js
 */

"use strict";

module.exports = {
	"ERROR" : {
        
		/* general */
		"ERROR_BAD_REQUEST":                { "type": "ERROR", "message":  "ERROR_BAD_REQUEST", },
		"ERROR_UNAUTHORIZED":               { "type": "ERROR", "message":  "ERROR_UNAUTHORIZED", },
		"ERROR_FORBIDDEN":                  { "type": "ERROR", "message":  "ERROR_FORBIDDEN", },
		"ERROR_NOT_FOUND":                  { "type": "ERROR", "message":  "ERROR_NOT_FOUND", },
		"ERROR_INTERNAL_SERVER_ERROR":      { "type": "ERROR", "message":  "ERROR_INTERNAL_SERVER_ERROR", },
		"ERROR_NOT_IMPLEMENTED":            { "type": "ERROR", "message":  "ERROR_NOT_IMPLEMENTED", },
		"ERROR_SERVICE_UNAVAILABLE":        { "type": "ERROR", "message":  "ERROR_SERVICE_UNAVAILABLE", },
		"ERROR_TIMEOUT":                    { "type": "ERROR", "message":  "ERROR_TIMEOUT", },
		"ERROR_TOKEN":                    	{ "type": "ERROR", "message":  "ERROR_TOKEN", },
        
		/* account */
		"ERROR_NOT_EXISTED_USER":           { "type": "ERROR", "message":  "帳號不存在，請聯絡帳號管理人員建置帳號。", },
		"ERROR_WRONG_ACCOUNT_OR_PASSWORD":  { "type": "ERROR", "message":  "帳號或密碼錯誤。", },		

		/* data */
		"ERROR_CREATE_DATA_FAIL":           { "type": "ERROR", "message":  "ERROR_CREATE_DATA_FAIL", },
		"ERROR_READ_DATA_FAIL":             { "type": "ERROR", "message":  "ERROR_READ_DATA_FAIL", },
		"ERROR_UPDATE_DATA_FAIL":           { "type": "ERROR", "message":  "ERROR_UPDATE_DATA_FAIL", },
		"ERROR_DELETE_DATA_FAIL":           { "type": "ERROR", "message":  "ERROR_DELETE_DATA_FAIL", },
		"ERROR_ACTION_Fail":           		{ "type": "ERROR", "message":  "ERROR_ACTION_Fail", },
		"ERROR_IMPORT_DATA_Fail":           { "type": "ERROR", "message":  "ERROR_IMPORT_DATA_Fail", },
		"ERROR_NOT_EXISTED_DATA":           { "type": "ERROR", "message":  "ERROR_NOT_EXISTED_DATA", },
		"ERROR_DUPLICATE_DATA":             { "type": "ERROR", "message":  "ERROR_DUPLICATE_DATA", },
		"ERROR_LACK_OF_PARAMETER":          { "type": "ERROR", "message":  "ERROR_LACK_OF_PARAMETER", },
	},
	"WARN": {

	},
	"INFO": {
		/* general */
		"INFO_SERVICE_ALIVE":				{ "type": "INFO", "message":  "INFO_SERVICE_ALIVE", },
		"INFO_SERVICE_DEAD":				{ "type": "INFO", "message":  "INFO_SERVICE_DEAD", },

		/* account */
		"INFO_LOGIN_SUCCESS":               { "type": "INFO", "message":  "登入成功", },
		"INFO_LOGOUT_SUCCESS":              { "type": "INFO", "message":  "登出成功", },
		"INFO_TOKEN_SUCCESS":              	{ "type": "INFO", "message":  "INFO_TOKEN_SUCCESS", },
        
		/* data */
		"INFO_NO_DATA":						{ "type": "INFO", "message":  "INFO_NO_DATA", },
		"INFO_CREATE_DATA_SUCCESS":         { "type": "INFO", "message":  "INFO_CREATE_DATA_SUCCESS", },
		"INFO_READ_DATA_SUCCESS":           { "type": "INFO", "message":  "INFO_READ_DATA_SUCCESS", },
		"INFO_UPDATE_DATA_SUCCESS":         { "type": "INFO", "message":  "INFO_UPDATE_DATA_SUCCESS", },
		"INFO_DELETE_DATA_SUCCESS":         { "type": "INFO", "message":  "INFO_DELETE_DATA_SUCCESS", },
		"INFO_ACTION_SUCCESS":       		{ "type": "INFO", "message":  "INFO_ACTION_SUCCESS", },
		"INFO_IMPORT_DATA_SUCCESS":         { "type": "INFO", "message":  "INFO_IMPORT_DATA_SUCCESS", },
		
	},
	/*Add other defined codes here ...*/
};