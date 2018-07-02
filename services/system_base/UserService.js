/**
 * Users 相關之商業邏輯
 * @module services/system_base/user_service
 */

"use strict";

/**
 * 查詢使用者
 * @param  {} req
 * @param  {} res
 * @see /api/staff/users/read
 */
module.exports.selectAllUsers = async (req, res, next) => {

	try
	{
		const messageHandler = require("../../helper/MessageHandler");
		const userRepository = require("../../repositories/system_base/UserRepository");

		// check parameters
		if(!req.body.hasOwnProperty("data")) throw(new Error("ERROR_LACK_OF_PARAMETER"));
		
		// setup attributes and conditions
		let conditions = {};

		// get data
		const data = await userRepository.getUsersProfile(conditions);		
		
		res.send({	
			"code": (data.length === 0) ? messageHandler.infoHandler("INFO_NO_DATA") : messageHandler.infoHandler("INFO_READ_DATA_SUCCESS"),
			"data": data, 
		});
	}
	catch(err){ next(err); }
};

/**
 * 新增使用者
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @see /api/staff/users/create
 */
module.exports.insertUser = async (req, res, next) => {

	try
	{
		const uuidV1 = require("uuid/v1");
		const cryptoJS = require("crypto-js");
		const messageHandler = require("../../helper/MessageHandler");
		const userRepository = require("../../repositories/system_base/UserRepository");

		// check parameters
		if(!req.body.hasOwnProperty("data")) throw(new Error("ERROR_LACK_OF_PARAMETER"));
		if(!req.body.data.hasOwnProperty("employee_id") || req.body.data.employee_id === "") throw(new Error("ERROR_LACK_OF_PARAMETER"));
        
		//check user existed
		const isExisted = await userRepository.isUsersExisted({"Employee_Id" : req.body.data.employee_id});
		if(isExisted === true) throw(new Error("ERROR_DUPLICATE_DATA"));

		//prepare data
		let defaultPwd = cryptoJS.MD5(req.body.data.employee_id);
		let salt = uuidV1(); 
		let pwd = cryptoJS.SHA1(defaultPwd + salt);

		//insert user
		await userRepository.createUser({
			"Employee_Id": 		req.body.data.employee_id,
			"Pwd": 				pwd.toString(),
			"PwdSalt": 			salt,
			"AccountStatus": 	1,
			"ErrorCounts": 		0,
			"IsBlock": 			0,
		});
		
		res.send({ 	
			"code": messageHandler.infoHandler("INFO_CREATE_DATA_SUCCESS"), 
			"data": [], 
		});
	}
	catch(err){ next(err); }
};

/**
 * 刪除使用者
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @see /api/staff/users/delete
 */
module.exports.deleteUser = async (req, res, next) => {

	try
	{
		const messageHandler = require("../../helper/MessageHandler");
		const userRepository = require("../../repositories/system_base/UserRepository");

		// check parameters
		if(!req.body.hasOwnProperty("data")) throw(new Error("ERROR_LACK_OF_PARAMETER"));
		if(!req.body.data.hasOwnProperty("employee_id")) throw(new Error("ERROR_LACK_OF_PARAMETER"));
        
		// check user existed
		const isExisted = await userRepository.isUsersExisted({"Employee_Id" : req.body.data.employee_id});
		if(isExisted === false) throw(new Error("ERROR_NOT_EXISTED_DATA"));

		// delete user
		await userRepository.destroyUser({"Employee_Id" : req.body.data.employee_id});

		res.send({ 	
			"code": messageHandler.infoHandler("INFO_DELETE_DATA_SUCCESS"), 
			"data": [], 
		});
	}
	catch(err){ next(err); }
};

/**
 * 登入驗證，並取得權限資料
 * @param  {} req
 * @param  {} res
 * @see /api/staff/users/login
 */
module.exports.login =  async (req, res, next) => {
	try{
		const axios = require("axios");
		const messageHandler = require("../../helper/MessageHandler");
		const userRepository = require("../../repositories/system_base/UserRepository");
		const debug = require("debug")("CustodianApi:UserService.login");
		const config = require("../../Config");
		
		let return_prototype = {	
			"user":  			"", 
			"user_name":  		"", 
			"dept":  			"", 
			"dept_name":  		"", 
			"permission_list": 	[],
			"access_token":		"",
		};

		// check parameters
		if(!req.body.hasOwnProperty("data")) throw(new Error("ERROR_LACK_OF_PARAMETER"));
		if(!req.body.data.hasOwnProperty("account") || req.body.data.account === "") throw(new Error("ERROR_LACK_OF_PARAMETER"));
		if(!req.body.data.hasOwnProperty("password") || req.body.data.password === "") throw(new Error("ERROR_LACK_OF_PARAMETER"));
		
		// check user is existed
		const isUsersExisted = await userRepository.isUsersExisted({"Employee_Id": req.body.data.account, });
		if(isUsersExisted === false) throw(new Error("ERROR_NOT_EXISTED_USER"));

		// validate password
		// const isPass = await userRepository.validateLocalPassword(req.body.data.account, req.body.data.password );
		// if(isPass === false ) throw(new Error("ERROR_WRONG_ACCOUNT_OR_PASSWORD"));

		// validate ad
		const isAdPass = await userRepository.validateAD(req.body.data.account, req.body.data.password);
		if(isAdPass === false ) throw(new Error("ERROR_WRONG_ACCOUNT_OR_PASSWORD"));

		// get user data
		const userProfile = await userRepository.getUsersProfile({ "Employee_Id": req.body.data.account });
		
		// get permission
		const permission = await userRepository.getPermissionsOfUser(req.body.data.account);

		// get role
		const role = await userRepository.getRolesOfUser(req.body.data.account);

		// set return value
		return_prototype = {
			"user":  			userProfile[0].u_employee_id, 
			"user_name":   		userProfile[0].e_user_name, 
			"dept": 			userProfile[0].d_dept_id, 
			"dept_name": 		userProfile[0].d_dept_name, 
			"permission_list": 	permission,
			"role_list":		role,
		};

		debug(return_prototype);

		const local = config[process.env.NODE_ENV].JwtService_api.policy + "://" + config[process.env.NODE_ENV].JwtService_api.host + ":" + config[process.env.NODE_ENV].JwtService_api.port;
		//get token
		const token = await axios.post(local + "/api/sign", { "data": return_prototype});
		// debug(token.data);
		return_prototype["access_token"] = token.data;

		res.send({  
			"code" : messageHandler.infoHandler("INFO_LOGIN_SUCCESS"), 
			"data": return_prototype,
		});
	}
	catch(err){ 
		next(err); 
	} 
};

/**
 * JWT token 驗證
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @see /api/staff/users/verify
 */
module.exports.verify =  async (req, res, next) => {
	try{
		const debug = require("debug")("CustodianApi:UserService.verify");
		const messageHandler = require("../../helper/MessageHandler");
		const axios = require("axios");
		const config = require("../../Config");
		// debug(req.body.token);

		let return_prototype = {	
			"user":  			"", 
			"user_name":  		"", 
			"dept":  			"", 
			"dept_name":  		"", 
			"permission_list": 	[],
		};

		const local = config[process.env.NODE_ENV].JwtService_api.policy + "://" + config[process.env.NODE_ENV].JwtService_api.host + ":" + config[process.env.NODE_ENV].JwtService_api.port;
		const jwt_user_profile = await axios.post(local + "/api/verify", { "token": req.body.token}); 

		return_prototype = {
			"user":  			jwt_user_profile.data.user,				
			"user_name":   		jwt_user_profile.data.user_name,		
			"dept": 			jwt_user_profile.data.dept,				
			"dept_name": 		jwt_user_profile.data.dept_name,		
			"permission_list": 	jwt_user_profile.data.permission_list,	
			"role_list":		jwt_user_profile.data.role_list,		
			"login":			jwt_user_profile.data.login
		};

		debug(return_prototype);

		if(jwt_user_profile.data.login){

			res.send({  
				"code" : messageHandler.infoHandler("INFO_TOKEN_SUCCESS"), 
				"data": return_prototype,
			});

		}
		else{
			res.send({  
				"code" : 
				{
					"type": "ERROR",
					"message": "ERROR_TOKEN"
				}, 
				"data": return_prototype,
			});
			// throw(new Error("ERROR_TOKEN"));
		}

	}
	catch(err){ 
		next(err); 
	}



}
