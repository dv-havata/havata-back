class RoutesSetterClass {
	setRoutes(app) {
		RoutesSetter.setDefaultRoutes(app);
	}

	setDefaultRoutes(app) {
		const IndexRouter = require('./index');
		const AdminRouter = require('./admin/admin_controller');
		const KakaoRouter = require('./kakao/kakao_controller');

		app.use('/', IndexRouter);
		app.use('/api', KakaoRouter);
		app.use('/admin', AdminRouter);
	}
}

const RoutesSetter = new RoutesSetterClass();
module.exports = RoutesSetter;
