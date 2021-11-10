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
					if (value > 20 || value < 8) {
						responseText +=
							'높은 BUN 농도는 신장의 독소 배설 기능이 불량함을 말해요. 급성/만성 신장질환, 단백질 과잉섭취, 탈수 등의 원인이 있을 수 있는데요, 지속적으로 높은 수치가 확인된다면 전문의의 상담이 필요해요.\n\n';
						baseFormat.title = 'BUN (8-20mg/dL)';
						baseFormat.description =
							'높은 BUN 농도는 신장의 독소 배설 기능이 불량함을 말해요. 급성/만성 신장질환, 단백질 과잉섭취, 탈수 등의 원인이 있을 수 있는데요, 지속적으로 높은 수치가 확인된다면 전문의의 상담이 필요해요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'BUN (8-20mg/dL)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'phosphate':
					if (value < 2.5 || value > 4.5) {
						responseText +=
							'신장의 인 배설기능이 감소하면 혈액 내 인 수치가 올라갈 수 있어요. 상승한 인 수치 그 자체로 독성이 있을 수 있고, 뼈를 녹여 골절 등 합병증이 동반될 수 있어, 정기검사로 전문의와 상담,식이,약물요법 등 관리가 필요해요\n\n';
						baseFormat.title = 'Phosphate (2.5-4.5mg/dL)';
						baseFormat.description =
							'신장의 인 배설기능이 감소하면 혈액 내 인 수치가 올라갈 수 있어요. 상승한 인 수치 그 자체로 독성이 있을 수 있고, 뼈를 녹여 골절 등 합병증이 동반될 수 있어, 정기검사로 전문의와 상담,식이,약물요법 등 관리가 필요해요';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'Phosphate (2.5-4.5mg/dL)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'k':
					if (value < 3.5 || value > 5.5) {
						responseText +=
							'고칼륨혈증의 가장 큰 원인을 신장 칼륨 배설기능 감소로 볼 수 있어요. 이외에도 약물, 당뇨, 식이등 다양한 원인이 칼륨수치에 영향을 주는데요, 손발저림증상부터 급성심장질환 등이 발생할 수 있어 빠른 처치가 필요해요.\n\n';
						baseFormat.title = 'K (3.5-5.5 mmol/L)';
						baseFormat.description =
							'고칼륨혈증의 가장 큰 원인을 신장 칼륨 배설기능 감소로 볼 수 있어요. 이외에도 약물, 당뇨, 식이등 다양한 원인이 칼륨수치에 영향을 주는데요, 손발저림증상부터 급성심장질환 등이 발생할 수 있어 빠른 처치가 필요해요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'K (3.5-5.5 mmol/L)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'egfr':
					if (value > 90) {
						responseText +=
							'신장기능은 정상이에요. 단, 혈뇨, 단백뇨 등 초기신장손상의 증거가 있는 경우에는 사구체여과율이 정상이라도 만성신장질환 1단계에 해당될 수 있어요. 사구체여과율 외 다른 이상소견이 있다면 전문의 상담이 필요할 수 있어요.\n\n';
						baseFormat.title = 'eGFR 정상/ 1단계 (90 ml/min/1.73m2 이상)';
						baseFormat.description =
							'신장기능은 정상이에요. 단, 혈뇨, 단백뇨 등 초기신장손상의 증거가 있는 경우에는 사구체여과율이 정상이라도 만성신장질환 1단계에 해당될 수 있어요. 사구체여과율 외 다른 이상소견이 있다면 전문의 상담이 필요할 수 있어요.';
					} else if (value >= 60 || value <= 89) {
						responseText +=
							'신장기능이 감소하기 시작했어요. 무증상이지만 BUN, 크레아티닌(Cr) 등 혈액 검사수치 이상이 나타날 수 있고, 혈압조절 등 원인치료가 필요할 수 있으므로 검사와 전문의 상담이 필요해요.\n\n';
						baseFormat.title = 'eGFR 2단계 (60-89 ml/min/1.73m2)';
						baseFormat.description =
							'신장기능이 감소하기 시작했어요. 무증상이지만 BUN, 크레아티닌(Cr) 등 혈액 검사수치 이상이 나타날 수 있고, 혈압조절 등 원인치료가 필요할 수 있으므로 검사와 전문의 상담이 필요해요.';
					} else if (value >= 30 || value <= 59) {
						responseText +=
							'신장기능이 다소 감소했습니다. 극심한 피로, 식욕 감소, 가려움증이 발생할 수 있어요. 혈압을 철저히 관리하고, 신장기능 악화를 늦추기 위해 정기적인 검사와 전문의 상담으로 적극적인 치료에 노력을 멈추지 마세요.\n\n';
						baseFormat.title = 'eGFR 3단계(30-59 ml/min/1.73m2)';
						baseFormat.description =
							'신장기능이 다소 감소했습니다. 극심한 피로, 식욕 감소, 가려움증이 발생할 수 있어요. 혈압을 철저히 관리하고, 신장기능 악화를 늦추기 위해 정기적인 검사와 전문의 상담으로 적극적인 치료에 노력을 멈추지 마세요.';
					} else if (value >= 15 || value <= 29) {
						responseText +=
							'생명 유지에 필요한 신장 기능을 겨우 유지하고 있어요. 극한 피로감, 식욕감소, 부종 등이 악화될 수 있어요. 투석 준비, 이식 가능성에 대해서도 준비를 해야 할 수도 있으므로 정기적인 검사와 전문의 상담이 꼭 필요해요.\n\n';
						baseFormat.title = 'eGFR 4단계(15-29 ml/min/1.73m2)';
						baseFormat.description =
							'생명 유지에 필요한 신장 기능을 겨우 유지하고 있어요. 극한 피로감, 식욕감소, 부종 등이 악화될 수 있어요. 투석 준비, 이식 가능성에 대해서도 준비를 해야 할 수도 있으므로 정기적인 검사와 전문의 상담이 꼭 필요해요.';
					} else {
						responseText +=
							'신장기능이 심각하게 손상되어 투석이나 이식 없이는 생명을 유지하기 어려워요. 적절한 신 대체 요법 없이는 호흡곤란, 수면장애, 가려움증, 부종, 구토 등의 증상이 보일 수 있어요. 전문 의료기관의 관리가 반드시 필요한 시점이에요.\n\n';
						baseFormat.title = 'eGFR 5단계(15 ml/min/1.73m2 미만)';
						baseFormat.description =
							'신장기능이 심각하게 손상되어 투석이나 이식 없이는 생명을 유지하기 어려워요. 적절한 신 대체 요법 없이는 호흡곤란, 수면장애, 가려움증, 부종, 구토 등의 증상이 보일 수 있어요. 전문 의료기관의 관리가 반드시 필요한 시점이에요.';
					}
					break;
				case 'total_co2':
					if (value < 22 || value > 29) {
						responseText +=
							'중탄산염은 신장에서 배설되고 재흡수 돼요. 농도 높낮음은 몸이 산-염기 균형을 유지 또는 균형이 깨짐을 의미해요. 높은 혈중 총 이산화탄소 농도는 떨림,호흡곤란 등 증상으로 이어질 수 있어 정기검진을 통한 전문의 상담이 필요해요\n\n';
						baseFormat.title = 'Total CO2 (22-29mmol/L)';
						baseFormat.description =
							'중탄산염은 신장에서 배설되고 재흡수 돼요. 농도 높낮음은 몸이 산-염기 균형을 유지 또는 균형이 깨짐을 의미해요. 높은 혈중 총 이산화탄소 농도는 떨림,호흡곤란 등 증상으로 이어질 수 있어 정기검진을 통한 전문의 상담이 필요해요';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'Total CO2 (22-29mmol/L)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'hb':
					if (value < 12 || value > 17) {
						responseText +=
							'출혈, 철 결핍, 장기간의 영양 결핍, 신장기능 저하로 인한 조혈 감소로 일어날 수 있어요. 어지럼증, 졸도 등 증상이 있을 수 있기에 정기적인 검사를 통해 수치변화를 확인하고 전문의와의 상담하세요.\n\n';
						baseFormat.title = 'Hb (12.0-17.0 g/dL)';
						baseFormat.description =
							'출혈, 철 결핍, 장기간의 영양 결핍, 신장기능 저하로 인한 조혈 감소로 일어날 수 있어요. 어지럼증, 졸도 등 증상이 있을 수 있기에 정기적인 검사를 통해 수치변화를 확인하고 전문의와의 상담하세요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'Hb (12.0-17.0 g/dL)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'creatinine':
					if (value < 0.6 || value > 1.3) {
						responseText +=
							'신장기능을 반영하는 대표적인 혈액 검사 수치이며 상승시 기능 감소를 의미해요. 감염, 자가면역질환, 당뇨병합병증 등이 원인일 수 있고, 과격한 운동 등의 근육손상으로 일시적 증가할 수도 있어 검사를 통해 전문의 상담이 필요해요.\n\n';
						baseFormat.title = 'Creatinine (0.6-1.3mg/dL)';
						baseFormat.description =
							'신장기능을 반영하는 대표적인 혈액 검사 수치이며 상승시 기능 감소를 의미해요. 감염, 자가면역질환, 당뇨병합병증 등이 원인일 수 있고, 과격한 운동 등의 근육손상으로 일시적 증가할 수도 있어 검사를 통해 전문의 상담이 필요해요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'Creatinine (0.6-1.3mg/dL)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'na':
					if (value < 135 || value > 145) {
						responseText +=
							'나트륨 농도가 정상 범위에 속하는지, 전해질 균형 및 신장 기능을 평가에 참고하기 위해 검사가 진행돼요. 혈중 나트륨 농도에 변화가 생길 때, 체내 수분양도 같이 변화하는데요, 탈수나 부종 등의 증상이 나타날 수 있어요.\n\n';
						baseFormat.title = 'Na (135~145mmol/L)';
						baseFormat.description =
							'나트륨 농도가 정상 범위에 속하는지, 전해질 균형 및 신장 기능을 평가에 참고하기 위해 검사가 진행돼요. 혈중 나트륨 농도에 변화가 생길 때, 체내 수분양도 같이 변화하는데요, 탈수나 부종 등의 증상이 나타날 수 있어요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'Na (135~145mmol/L)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
					}
					break;
				case 'bunCrRatio':
					if (value < 20) {
						responseText +=
							'체내 수분양을 간접적으로 볼 수 있는 지표예요. 상승 시 탈수를 의심해볼 수 있지만 중증 신부전이 동반된 경우 수치 해석에 주의를 기울여야해요. 기준 이상의 상승이 있다면 탈수 교정 후 재검사가 추천되며 전문의 진료가 필요해요.\n\n';
						baseFormat.title = 'BUN / Cr (20 이상)';
						baseFormat.description =
							'체내 수분양을 간접적으로 볼 수 있는 지표예요. 상승 시 탈수를 의심해볼 수 있지만 중증 신부전이 동반된 경우 수치 해석에 주의를 기울여야해요. 기준 이상의 상승이 있다면 탈수 교정 후 재검사가 추천되며 전문의 진료가 필요해요.';
					} else {
						responseText +=
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)\n\n';
						baseFormat.title = 'BUN / Cr (20 이상)';
						baseFormat.description =
							'참고치 범위 내에 속하는 수치입니다. \n(단, 참고치는 검사가 진행되는 검사실에 따라 달라질 수 있으므로 전문의와의 상담이 필요합니다)';
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
