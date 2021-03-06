const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('etag', false);

const RoutesSetter = require('./routes/routes_setter');
RoutesSetter.setRoutes(app);

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	console.error(err);

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

console.log('server started');
module.exports = app;
