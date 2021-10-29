const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

/* GET home page. */
ROUTER.post('/upload', async function (req, res) {
	console.log(req.body);
});

module.exports = ROUTER;
