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
		const result = { ...items, bunCrRatio };
		return result;
	},
	genResponseText: (testResult) => {
		let responseText = '';
		for (const [key, value] of testResult) {
			switch (key) {
				case 'bun':
					if (value >= 26) {
						responseText += 'bun 기준치 초과 텍스트\n\n';
					}
					break;
				case 'phosphate':
					if (value > 4.5) {
						responseText += 'phosphate 기준치 초과 텍스트\n\n';
					}
					break;
				case 'k':
					if (value > 5) {
						responseText += 'k 기준치 초과 텍스트\n\n';
					}
					break;
				case 'egfr':
					if (value >= 90) {
						responseText += 'G1 텍스트\n\n';
					} else if (value >= 60 && value <= 89) {
						responseText += 'G2 텍스트\n\n';
					} else if (value >= 45 && value <= 59) {
						responseText += 'G3a 텍스트\n\n';
					} else if (value >= 30 && value <= 44) {
						responseText += 'G3b 텍스트\n\n';
					} else if (value >= 15 && value <= 29) {
						responseText += 'G4 텍스트\n\n';
					} else {
						responseText += 'G5 텍스트\n\n';
					}
					break;
				case 'total_co2':
					if (value > 29 && value < 40) {
						responseText += 'mild metabolic acidosis 텍스트\n\n';
					} else if (value >= 40) {
						responseText += 'severe metabolic acidosis 텍스트\n\n';
					}
				case 'hb':
					if (value < 13.8) {
						responseText += 'hb 기준치 미달 텍스트\n\n';
					}
					break;
				case 'creatinine':
					if (value < 1.3) {
						responseText += 'creatinine 기준치 미달 텍스트\n\n';
					}
					break;
				case 'bunCrRatio':
					if (value < 20) {
						responseText += 'bunCrRatio 기준치 미달 텍스트\n\n';
					}
					break;
				default:
					break;
			}
		}
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
