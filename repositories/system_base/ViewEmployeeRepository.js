
/**
 * Employees 之資料存取層 
 * @module repository/system_base/ViewEmployeeRepository
 */

"use strict";

/**
 * 取得員工資料。
 * @param  {Object} conditions 查詢條件，eg: { "User_Id": userId },
 * @return {Array.<Object>} 取得之員工資料。
 */
module.exports.getEmployees = (conditions) => {
	try
	{
		const ormDB = require("../../helper/OrmDB");
		const viewEmployeeModule = require("../../modules/system_base/ViewEmployeeModule");
		
		return new Promise( (resolve, reject ) => {
			ormDB.CustodianWeb.authenticate()
				.then(() => {    
					return viewEmployeeModule.findAll({
						attributes: [
							["User_Id", 	"e_user_id"], 
							["User_Name", 	"e_user_name"], 
							["Dept_No", 	"e_dept_no"], 
						],
						where: conditions,
						order: ["User_Id"],
						raw: true,
					});
				})
				.then((r) => { 
					for(let i = 0; i < r.length; i++){
						r[i].e_user_id		= r[i].e_user_id.trim();
						r[i].e_user_name 	= r[i].e_user_name.trim();
						r[i].e_dept_no 		= r[i].e_dept_no.trim();
					}
					resolve(r); 
				})
				.catch((err) => { reject(err); }); 
		});
	}
	catch(err){
		throw(err);
	}
};
