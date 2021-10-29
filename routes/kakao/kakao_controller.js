const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

/* GET home page. */
ROUTER.post('/test', function (req, res) {
	console.log('test request is received');
	res.json({ name: 'hi' });
});

module.exports = ROUTER;
