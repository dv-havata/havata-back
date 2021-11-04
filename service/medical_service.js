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
		const outputs = [
			{
				carousel: {
					type: 'basicCard',
					items: [],
				},
			},
		];
		let responseText = '';
		for (const [key, value] of Object.entries(testResult)) {
			const baseFormat = { title: '', description: '' };
			switch (key) {
				case 'bun':
					if (value >= 26) {
						responseText += 'bun 기준치 초과 텍스트\n\n';
						baseFormat.title = 'BUN';
						baseFormat.description = 'bun 기준치 초과 텍스트';
					}
					break;
				case 'phosphate':
					if (value > 4.5) {
						responseText += 'Phosphate 기준치 초과 텍스트\n\n';
						baseFormat.title = 'Phosphate';
						baseFormat.description = 'Phosphate 기준치 초과 텍스트';
					}
					break;
				case 'k':
					if (value > 5) {
						responseText += 'K 기준치 초과 텍스트\n\n';
						baseFormat.title = 'K';
						baseFormat.description = 'K 기준치 초과 텍스트';
					}
					break;
				case 'egfr':
					if (value >= 90) {
						responseText += 'G1 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G1 텍스트';
					} else if (value >= 60 && value <= 89) {
						responseText += 'G2 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G2 텍스트';
					} else if (value >= 45 && value <= 59) {
						responseText += 'G3a 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G3a 텍스트';
					} else if (value >= 30 && value <= 44) {
						responseText += 'G3b 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G3b 텍스트';
					} else if (value >= 15 && value <= 29) {
						responseText += 'G4 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G4 텍스트';
					} else {
						responseText += 'G5 텍스트\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description = 'G5 텍스트';
					}
					break;
				case 'total_co2':
					if (value > 29 && value < 40) {
						responseText += 'mild metabolic acidosis 텍스트\n\n';
						baseFormat.title = 'Total CO2';
						baseFormat.description = 'mild metabolic acidosis 텍스트';
					} else if (value >= 40) {
						responseText += 'severe metabolic acidosis 텍스트\n\n';
						baseFormat.title = 'Total CO2';
						baseFormat.description = 'severe metabolic acidosis 텍스트';
					}
				case 'hb':
					if (value < 13.8) {
						responseText += 'Hb 기준치 미달 텍스트\n\n';
						baseFormat.title = 'Hb';
						baseFormat.description = 'Hb 기준치 미달 텍스트';
					}
					break;
				case 'creatinine':
					if (value < 1.3) {
						responseText += 'Creatinine 기준치 미달 텍스트\n\n';
						baseFormat.title = 'Creatinine';
						baseFormat.description = 'Creatinine 기준치 미달 텍스트';
					}
					break;
				case 'bunCrRatio':
					if (value < 20) {
						responseText += 'BUN / Cr 기준치 미달 텍스트\n\n';
						baseFormat.title = 'BUN / Cr';
						baseFormat.description = 'BUN / Cr 기준치 미달 텍스트';
					}
					break;
				default:
					break;
			}

			if (baseFormat.title.length > 0 && baseFormat.description.length > 0) {
				outputs[0].carousel.items.push(baseFormat);
			}
		}
		return { outputs, responseText };
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
