const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

/* GET home page. */
ROUTER.get('/', function (req, res) {
	res.send('hi');
});

module.exports = ROUTER;
