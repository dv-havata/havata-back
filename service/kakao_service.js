const KakaoService = {
	payloadParser: (paramJson) => {
		const result = {};
		for (const [k, v] of Object.entries(paramJson)) {
			if (k === 'checkup_date') {
				const { value } = JSON.parse(v);
				result[k] = value;
			} else {
				const { amount } = JSON.parse(v);
				result[k] = amount;
			}
		}

		return result;
	},
};

module.exports = KakaoService;
