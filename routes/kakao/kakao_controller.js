const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const KakaoService = require('../../service/kakao_service');
const MedicalService = require('../../service/medical_service');

ROUTER.post('/submit', function (req, res) {
	const {
		body: {
			action: { params },
			userRequest: {
				user: { id: userId },
			},
		},
	} = req;

	const parsedPayload = KakaoService.payloadParser(params);
	const totalTestResult = MedicalService.addBunCrRatio(parsedPayload);
	const outputs = MedicalService.genResponseCard(totalTestResult);

	const insertTestResult = MedicalService.insertTestResult(req, res, {
		userId,
		responseText,
		...totalTestResult,
	});

	if (!insertTestResult) {
		const responseBody = {
			version: '2.0',
			template: {
				outputs: [
					{
						simpleText: {
							text: '일시적인 오류가 발생하였습니다. 잠시후에 다시 시도해주시기 바랍니다.',
						},
					},
				],
			},
		};
		res.status(200).send(responseBody);
	} else {
		const responseBody = {
			version: '2.0',
			template: {
				outputs,
			},
		};
		res.status(200).send(responseBody);
	}
});

module.exports = ROUTER;
