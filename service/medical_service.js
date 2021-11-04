const TestResultDao = require('../dao/test_result_dao');

const MedicalService = {
	// { total_co2: 1,
	// phosphate: 1,
	// hb: 1,
	// egfr: 1,
	// checkup_date: '2021-11-03',
	// creatinine: 1,
	// bun: 1,
	// k: 1 }
	addBunCrRatio: (testResult) => {
		const { bun, creatinine } = testResult;
		const bunCrRatio = (bun / creatinine).toFixed(2);
		const result = { ...testResult, bunCrRatio };
		return result;
	},
	genResponseCard: (testResult) => {
		const output = [];
		for (const [key, value] of Object.entries(testResult)) {
			const baseFormat = {
				basicCard: {
					title: '',
					description: '',
				},
			};
			switch (key) {
				case 'bun':
					if (value >= 26) {
						baseFormat.basicCard.title = 'BUN';
						baseFormat.basicCard.description = 'bun 기준치 초과 텍스트';
					}
					break;
				case 'phosphate':
					if (value > 4.5) {
						baseFormat.basicCard.title = 'Phosphate';
						baseFormat.basicCard.description = 'Phosphate 기준치 초과 텍스트';
					}
					break;
				case 'k':
					if (value > 5) {
						baseFormat.basicCard.title = 'K';
						baseFormat.basicCard.description = 'K 기준치 초과 텍스트';
					}
					break;
				case 'egfr':
					if (value >= 90) {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G1 텍스트';
					} else if (value >= 60 && value <= 89) {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G2 텍스트';
					} else if (value >= 45 && value <= 59) {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G3a 텍스트';
					} else if (value >= 30 && value <= 44) {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G3b 텍스트';
					} else if (value >= 15 && value <= 29) {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G4 텍스트';
					} else {
						baseFormat.basicCard.title = 'eGFR';
						baseFormat.basicCard.description = 'G5 텍스트';
					}
					break;
				case 'total_co2':
					if (value > 29 && value < 40) {
						baseFormat.basicCard.title = 'Total CO2';
						baseFormat.basicCard.description = 'mild metabolic acidosis 텍스트';
					} else if (value >= 40) {
						baseFormat.basicCard.title = 'Total CO2';
						baseFormat.basicCard.description =
							'severe metabolic acidosis 텍스트';
					}
				case 'hb':
					if (value < 13.8) {
						baseFormat.basicCard.title = 'Hb';
						baseFormat.basicCard.description = 'Hb 기준치 미달 텍스트';
					}
					break;
				case 'creatinine':
					if (value < 1.3) {
						baseFormat.basicCard.title = 'Creatinine';
						baseFormat.basicCard.description = 'Creatinine 기준치 미달 텍스트';
					}
					break;
				case 'bunCrRatio':
					if (value < 20) {
						baseFormat.basicCard.title = 'BUN / Cr';
						baseFormat.basicCard.description = 'BUN / Cr 기준치 미달 텍스트';
					}
					break;
				default:
					break;
			}

			if (
				baseFormat.basicCard.title.length > 0 &&
				baseFormat.basicCard.description.length > 0
			) {
				output.push(baseFormat);
			}
		}
		return output;
	},
	//total_co2: 1,
	// phosphate: 1,
	// hb: 1,
	// egfr: 1,
	// checkup_date: '2021-11-03',
	// creatinine: 1,
	// bun: 1,
	// k: 1
	insertTestResult: async (req, res, testResult) => {
		const {
			userId,
			phosphate,
			hb,
			creatinine,
			bun,
			k,
			bunCrRatio,
			egfr: eGFR,
			total_co2: totalCarbonDioxide,
			checkup_date: checkupDate,
			responseText: responseResult,
		} = testResult;

		const paramJson = {
			userId,
			bun,
			k,
			creatinine,
			eGFR,
			hb,
			phosphate,
			totalCarbonDioxide,
			bunCrRatio,
			checkupDate,
			responseResult,
		};

		const insertResult = await TestResultDao.insertTestResult(
			req,
			res,
			paramJson
		);
		if (!insertresult) return false;

		return insertResult;
	},
};

module.exports = MedicalService;
