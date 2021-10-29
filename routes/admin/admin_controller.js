const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

/* GET home page. */
ROUTER.get('/', function (req, res) {
	res.send('hi');
});
ROUTER.get('/list', function (req, res) {
	res.render('record_list');
});
ROUTER.get('/record/:id', function (req, res) {
	res.render('record_view');
});
module.exports = ROUTER;
