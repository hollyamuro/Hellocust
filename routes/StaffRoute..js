/**
 * 員工用路由
 * @module routes/StaffRoute.js
 */

"use strict";

/**
 * 員工後台功能路由
 * @param  {} app
 */
module.exports = (app) => {

	const deptService = require("../services/system_base/DeptService");
	app.route("/api/staff/depts/read").post(deptService.selectDeptsInDepts);   

	const employeeService = require("../services/system_base/EmployeeService");
	app.route("/api/staff/employees/read/valid_employees").post(employeeService.selectAllValidEmployees);   
	app.route("/api/staff/employees/read/valid_employees_in_dept").post(employeeService.selectValidEmployeesInDept);   

	const userService = require("../services/system_base/UserService");
	app.route("/api/staff/users/read").post(userService.selectAllUsers);   
	app.route("/api/staff/users/create").post(userService.insertUser);   
	app.route("/api/staff/users/delete").post(userService.deleteUser);   
	app.route("/api/staff/users/login").post(userService.login);
	app.route("/api/staff/users/verify").post(userService.verify);   

	const groupService = require("../services/system_base/GroupService");
	app.route("/api/staff/groups/read").post(groupService.selectAllGroups);
	app.route("/api/staff/groups/create").post(groupService.insertGroup);
	app.route("/api/staff/groups/delete").post(groupService.deleteGroup);
	app.route("/api/staff/groups/update").post(groupService.updateGroup);

	const groupUserService = require("../services/system_base/GroupUserService");
	app.route("/api/staff/group_user/read").post(groupUserService.selectUsersInGroup);
	app.route("/api/staff/group_user/create").post(groupUserService.insertGroupUser);
	app.route("/api/staff/group_user/delete").post(groupUserService.deleteGroupUser);

	const groupPermissionService = require("../services/system_base/GroupPermissionService");
	app.route("/api/staff/group_permission/read").post(groupPermissionService.getAllGroupPermissions);
	app.route("/api/staff/group_permission/create").post(groupPermissionService.insertGroupPermissions);
	app.route("/api/staff/group_permission/delete").post(groupPermissionService.deleteGroupPermissions);   
};