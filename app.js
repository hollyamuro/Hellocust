
/**
 * 封包處理
 * @module app.js
 */

"use strict";

/**
 * 封包處理
 */
const packageHandler = () => {

	const express = require("express");
	const path = require("path");
	const bodyParser = require("body-parser");

	let app = express();

	/* setup morgan for log*/
	const fs = require("fs");
	const format = require("date-format");
	let accessLogStream = fs.createWriteStream(path.resolve(__dirname, "log/log_"+ format("yyyy-MM-dd",new Date()) +".log"), {flags: "a+"});
	const morgan = require("morgan");
	morgan.token("req-body", function (req) { return (req.url === "/login")?"":JSON.stringify(req.body); });
	app.use(morgan(		":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :req-body",
		{	stream: accessLogStream,
			skip: (req, res) => {
				let monitorConfig = require("./MonitorConfig");
				//ignore ip
				for(let i=0; i < monitorConfig[process.env.NODE_ENV].developers.ip.length; i++){
					let expression = new RegExp(monitorConfig[process.env.NODE_ENV].developers.ip[i]);
					return (expression.exec(req.connection.remoteAddress) === null)?false:true;
				}
				//[TODO]ignore it account?
				return false;
			}
		}));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	/* setting api routers */
	require("./routes/ServiceRoute")(app);
	require("./routes/CustRoute")(app);
	require("./routes/StaffRoute.")(app);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const error =  require("./helper/CustodianWebError");
		next(new error.NotFoundError());
	});

	// error handler
	app.use((err, req, res, next) => {
		const debug = require("debug")("CustodianApi:app");
		const messageHandler = require("./helper/MessageHandler");
		debug((process.env.NODE_ENV === "development")?err.stack:"");

		// res.status(err.status || 500);
		res.send({ "code" : messageHandler.errorHandler(err), "data" : "" ,});
	});

	return app;
};

module.exports = packageHandler();
