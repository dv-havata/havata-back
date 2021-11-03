const RouterService = {
	json: function (err, res) {
		RouterService.jsonErr(err, res, 500);
	},
	jsonErr: function (err, res, httpCode) {
		res.status(httpCode);
		console.error(err);
		if (err.errors == null) {
			if (!res.headersSent) {
				res.json({ err_name: err.name, msg: err.message, status: 'N' });
			}
		} else {
			if (!res.headersSent) {
				res.json({
					err_name: err.errors[0].name,
					msg: err.errors[0].message,
					status: 'N',
				});
			}
		}
	},
	send: function (res, respJson) {
		if (!res.headersSent) {
			res.json(respJson);
		}
	},
};

module.exports = RouterService;
