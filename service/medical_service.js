const TestResultDao = require('../dao/test_result_dao');

const MedicalService = {
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
			const baseFormat = {
				title: '',
				description: '',
				buttons: [
					{
						action: 'message',
						label: '더 알아보기',
						messageText: '',
					},
				],
			};
			switch (key) {
				case 'bun':
					if (value > 25 || value < 10) {
						responseText +=
							'높은 BUN 농도는 신장 기능이 불량함을 말해요. 급성/만성 신장질환 때문일 수도 있고, 단백질의 과잉섭취의 식이, 스트레스, 탈수 등 원인이 다양하므로, 정기적인 검진을 통해 전문의의 상담이 필요해요\n\n';
						baseFormat.title = 'BUN';
						baseFormat.description =
							'높은 BUN 농도는 신장 기능이 불량함을 말해요. 급성/만성 신장질환 때문일 수도 있고, 단백질의 과잉섭취의 식이, 스트레스, 탈수 등 원인이 다양하므로, 정기적인 검진을 통해 전문의의 상담이 필요해요';
					}
					break;
				case 'phosphate':
					if (value < 2.5 || value > 4.5) {
						responseText +=
							'신장기능이 떨어지면 혈액 내 인이 올라가 수치가 높아지는데요, 인이 올라가면 뼈에서 칼슘이 빠져나오게 되어 골절이 쉽게 생길 수 있는 등 여러 합병증이 동반될 수 있으므로 정기적인 검사로 전문의와 상담이 필요해요\n\n';
						baseFormat.title = 'Phosphate';
						baseFormat.description =
							'신장기능이 떨어지면 혈액 내 인이 올라가 수치가 높아지는데요, 인이 올라가면 뼈에서 칼슘이 빠져나오게 되어 골절이 쉽게 생길 수 있는 등 여러 합병증이 동반될 수 있으므로 정기적인 검사로 전문의와 상담이 필요해요';
					}
					break;
				case 'k':
					if (value < 3.5 || value > 5.1) {
						responseText +=
							'칼륨90%가 신장을 통해 배설되기에 고칼륨혈증의 가장 큰 원인을 신장 기능 감소로 볼 수 있어요. 이외에도 약물, 당뇨, 식이등 다양한 원인이 칼륨수치에 영향을 주는데요, 손발저림증상부터 급성심장질환 등이 발생할 수 있어 적극적인 치료가 예후를 좌우하게 돼요.\n\n';
						baseFormat.title = 'K';
						baseFormat.description =
							'칼륨90%가 신장을 통해 배설되기에 고칼륨혈증의 가장 큰 원인을 신장 기능 감소로 볼 수 있어요. 이외에도 약물, 당뇨, 식이등 다양한 원인이 칼륨수치에 영향을 주는데요, 손발저림증상부터 급성심장질환 등이 발생할 수 있어 적극적인 치료가 예후를 좌우하게 돼요.';
					}
					break;
				case 'egfr':
					if (value > 90) {
						responseText +=
							'신장기능은 정상이에요. 단, 혈뇨, 단백뇨 등 초기신장손상의 증거가 있는 경우에는 사구체여과율이 정상이라도 만성신장질환 1단계에 해당될 수 있어요. 정기적인 검사와 전문의와 상담을 통해 초기에 교정하는 것이 중요해요. \n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description =
							'신장기능은 정상이에요. 단, 혈뇨, 단백뇨 등 초기신장손상의 증거가 있는 경우에는 사구체여과율이 정상이라도 만성신장질환 1단계에 해당될 수 있어요. 정기적인 검사와 전문의와 상담을 통해 초기에 교정하는 것이 중요해요. ';
					} else if (value >= 60 || value <= 89) {
						responseText +=
							'신장기능이 감소하기 시작했어요. 무증상이지만 BUN, 크레아티닌(Cr) 등 혈액 검사수치 이상이 나타날 수 있고, 혈압조절 원인치료가 필요할 수 있으므로 검사와 전문의와의 상담이 필요해요. \n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description =
							'신장기능이 감소하기 시작했어요. 무증상이지만 BUN, 크레아티닌(Cr) 등 혈액 검사수치 이상이 나타날 수 있고, 혈압조절 원인치료가 필요할 수 있으므로 검사와 전문의와의 상담이 필요해요. ';
					} else if (value >= 30 || value <= 59) {
						responseText +=
							'신장기능이 더욱 감소하게 된 것을 말해요. 극심한 피로, 식욕이 감소하고 가려움증이 더욱 악화 될 수 있어요. 혈압을 철저히 관리하고, 신장기능 악화를 늦추기 위해 정기적인 검사와 전문의와의 상담으로 적극적인 치료에 노력을 멈추지 마세요.\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description =
							'신장기능이 더욱 감소하게 된 것을 말해요. 극심한 피로, 식욕이 감소하고 가려움증이 더욱 악화 될 수 있어요. 혈압을 철저히 관리하고, 신장기능 악화를 늦추기 위해 정기적인 검사와 전문의와의 상담으로 적극적인 치료에 노력을 멈추지 마세요.';
					} else if (value >= 15 || value <= 29) {
						responseText +=
							'생명유지에 필요한 신장의 기능을 겨우 유지하고 있어요. 극심한 피로가 몰려오고, 식욕이 감소하며, 가려움증, 부종이 더욱 악화되는 등 두드러지는 증상이 보일 수도 있어요. 투석 준비, 이식 가능성에 대해서도 준비를 해야 할 수도 있으므로 정기적인 검사와 전문의와의 꼭 상담하세요.\n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description =
							'생명유지에 필요한 신장의 기능을 겨우 유지하고 있어요. 극심한 피로가 몰려오고, 식욕이 감소하며, 가려움증, 부종이 더욱 악화되는 등 두드러지는 증상이 보일 수도 있어요. 투석 준비, 이식 가능성에 대해서도 준비를 해야 할 수도 있으므로 정기적인 검사와 전문의와의 꼭 상담하세요.';
					} else {
						responseText +=
							'신장기능이 심각하게 손상되어 투석이나 이식없이는 생명을 유지하기 어려울 수도 있어요. 호흡이 곤란하다거나 수면 장애, 가려움증, 눈,다리,손 등의 부종, 구토 등의 증상이 보일 수 있어요. 투석 또는 이식을 받아야하므로 전문의와 상담이 필요해요. \n\n';
						baseFormat.title = 'eGFR';
						baseFormat.description =
							'신장기능이 심각하게 손상되어 투석이나 이식없이는 생명을 유지하기 어려울 수도 있어요. 호흡이 곤란하다거나 수면 장애, 가려움증, 눈,다리,손 등의 부종, 구토 등의 증상이 보일 수 있어요. 투석 또는 이식을 받아야하므로 전문의와 상담이 필요해요. ';
					}
					break;
				case 'total_co2':
					if (value < 22 || value > 28) {
						responseText +=
							'중탄산염은 신장에서 배설되고 재흡수가 되는데요, 농도가 높/낮다는 것은 우리 몸이 산-염기 균형을 유지 또는 전해질 균형이 깨졌다는 것을 의미해요. 떨림증상,호흡곤란,정신혼미 등의 증상도 발생할 수 있어 정기검진을 통한 전문의와 상담이 필요해요\n\n';
						baseFormat.title = 'Total CO2';
						baseFormat.description =
							'중탄산염은 신장에서 배설되고 재흡수가 되는데요, 농도가 높/낮다는 것은 우리 몸이 산-염기 균형을 유지 또는 전해질 균형이 깨졌다는 것을 의미해요. 떨림증상,호흡곤란,정신혼미 등의 증상도 발생할 수 있어 정기검진을 통한 전문의와 상담이 필요해요';
					}
					break;
				case 'hb':
					if (value < 12 || value > 17) {
						responseText +=
							'출혈, 철 결핍, 장기간의 영양 결핍, 신장기능 저하로 인한 조혈 감소로 일어날 수 있어요. 어지럼증, 졸도 등 증상이 있을 수 있기에 정기적인 검사를 통해 수치변화를 확인하고 전문의와의 상담을 하세요 \n\n';
						baseFormat.title = 'Hb';
						baseFormat.description =
							'출혈, 철 결핍, 장기간의 영양 결핍, 신장기능 저하로 인한 조혈 감소로 일어날 수 있어요. 어지럼증, 졸도 등 증상이 있을 수 있기에 정기적인 검사를 통해 수치변화를 확인하고 전문의와의 상담을 하세요 ';
					}
					break;
				case 'creatinine':
					if (value < 0.7 || value > 1.4) {
						responseText +=
							'혈액 내 크레아티닌 농도의 증가는 신장 기능에 영향을 주는 질환이나 상태를 말해요. 감염, 자가면역질환, 결석, 당뇨병 합병증 등이 원인이 될 수도 있고, 근육손상의 결과로 일시적으로 증가할 수도 있고, 임신중에는 조금 낮을 수도 있어요. 많은 변수들을 함께 해석해야 하므로 검사를 통해 전문의와 상담이 필요합니다.\n\n';
						baseFormat.title = 'Creatinine';
						baseFormat.description =
							'혈액 내 크레아티닌 농도의 증가는 신장 기능에 영향을 주는 질환이나 상태를 말해요. 감염, 자가면역질환, 결석, 당뇨병 합병증 등이 원인이 될 수도 있고, 근육손상의 결과로 일시적으로 증가할 수도 있고, 임신중에는 조금 낮을 수도 있어요. 많은 변수들을 함께 해석해야 하므로 검사를 통해 전문의와 상담이 필요합니다.';
					}
					break;
				case 'na':
					if (value < 136 || value > 145) {
						responseText += 'Na 텍스트\n\n';
						baseFormat.title = 'Na';
						baseFormat.description = 'Na 텍스트';
					}
					break;
				case 'bunCrRatio':
					if (value < 20) {
						responseText +=
							'신장질환의 여부와 문제가 되는 곳을 찾아낼 때 BUN/Cr 비율을 보는데요, 기준보다 낮다면 탈수, 출혈 등을 의심해 볼 수 있고, 기준보다 높다면 신장 자체에 이상이 있을 수 있어서 정기적인 검사를 통해 전문의와 상담이 필요해요\n\n';
						baseFormat.title = 'BUN / Cr';
						baseFormat.description =
							'신장질환의 여부와 문제가 되는 곳을 찾아낼 때 BUN/Cr 비율을 보는데요, 기준보다 낮다면 탈수, 출혈 등을 의심해 볼 수 있고, 기준보다 높다면 신장 자체에 이상이 있을 수 있어서 정기적인 검사를 통해 전문의와 상담이 필요해요';
					}
					break;
				default:
					break;
			}

			if (baseFormat.title.length > 0 && baseFormat.description.length > 0) {
				outputs[0].carousel.items.push(baseFormat);
				baseFormat.buttons[0].messageText = key;
			}
		}

		if (outputs[0].carousel.items.length === 0) {
			outputs.pop();
			outputs.push({
				simpleText: {
					text: '정상범위 텍스트',
				},
			});
		}

		return { outputs, responseText };
	},
	insertTestResult: async (req, res, testResult) => {
		const {
			userId,
			phosphate,
			hb,
			creatinine,
			bun,
			k,
			na,
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
			na,
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
