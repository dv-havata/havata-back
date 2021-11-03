const sequelize = require('sequelize');
const Op = sequelize.Op;

// DaoHelper
class DaoHelperClass {
	applySearchCond(paramJson, condJson) {
		if (!paramJson.search_target || !paramJson.search_keyword) return condJson;

		const searchWhere = [];

		if (!Array.isArray(paramJson.search_target))
			paramJson.search_target = paramJson.search_target.split();

		for (const target of paramJson.search_target) {
			if (!paramJson.search_keyword) break;

			switch (paramJson.search_type) {
				case 'equal':
					const equalQuery = {};
					equalQuery[target] = paramJson.search_keyword;
					searchWhere.push(equalQuery);
					break;
				case 'contain':
					const containQuery = {};
					containQuery[target] = { [Op.like]: `%${paramJson.search_keyword}%` };
					searchWhere.push(containQuery);
					break;
				default:
					break;
			}
		}

		if (searchWhere.length) condJson.where[Op.or] = searchWhere;

		return condJson;
	}
}

module.exports = DaoHelperClass;
