class RoutesSetterClass {
	setRoutes(app) {
		RoutesSetter.setDefaultRoutes(app);
	}

	setDefaultRoutes(app) {
		const KakaoRouter = require('./kakao/kakao_controller');

		app.use('/api', KakaoRouter);
	}
}

const RoutesSetter = new RoutesSetterClass();
module.exports = RoutesSetter;
