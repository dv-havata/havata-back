const sequelize = require('sequelize');
const Op = sequelize.Op;

// load Model
const DaoHelperClass = require('./dao_helper');
const DaoHelper = new DaoHelperClass();
const TestResultModel = require('../model/test_result_model');

const CommonService = require('../service/common_service');

const TestResultDao = {
	getTestResultCond: function (paramJson) {
		let condJson = {
			where: {
				isDel: 'N',
			},
			attributes: {
				include: [
					[
						sequelize.fn(
							'date_format',
							sequelize.col('testResult.createDate'),
							'%Y-%m-%d'
						),
						'createDateFormat',
					],
					[
						sequelize.fn(
							'date_format',
							sequelize.col('testResult.updateDate'),
							'%Y-%m-%d'
						),
						'updateDateFormat',
					],
				],
			},
			order: [
				['createDate', 'DESC'],
				['updateDate', 'DESC'],
			],
			raw: true,
		};
		condJson = this.applyWhereCond(paramJson, condJson);
		return condJson;
	},
	applyWhereCond: function (paramJson, condJson) {
		if (paramJson.status) condJson.where['status'] = paramJson.status;
		if (paramJson.userId) condJson.where['userId'] = paramJson.userId;

		condJson = DaoHelper.applySearchCond(paramJson, condJson);
		return condJson;
	},
	getTestResultList: async function (req, res, condJson) {
		let result = {};
		await TestResultModel.findAll(condJson)
			.then(async function (TestResultList) {
				result = TestResultList;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		return result;
	},
	getTestResultListCnt: async function (req, res, condJson) {
		let result = {};
		await TestResultModel.count(condJson)
			.then(function (cnt) {
				result = cnt;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		return result;
	},
	getTestResultListPaging: async function (req, res, condJson, paramJson) {
		let result = {};
		let tot_cnt;
		await TestResultModel.count(condJson)
			.then(function (cnt) {
				tot_cnt = cnt;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		var paging = await CommonService.getPagingData(
			paramJson.PAGE,
			tot_cnt,
			paramJson.lineLimit
		);
		result = paging;
		return result;
	},
	getTestResult: async function (req, res, condJson) {
		// 상세
		let result = {};
		await TestResultModel.findOne(condJson)
			.then(function (testResult) {
				result = testResult == null ? {} : testResult;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		return result;
	},
	insertTestResult: async function (req, res, paramJson) {
		let result = {};
		let condJson = {};
		if (req.transaction)
			condJson['transaction'] = await CommonService.getTransaction(req);
		await TestResultModel.create(paramJson, condJson)
			.then(function (testResult) {
				if (testResult === null) {
					throw new Error('testResult insert Error');
				}
				result = testResult;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		return result;
	},
	updateTestResult: async function (req, res, paramJson, condJson) {
		let result = 0;
		if (req.transaction)
			condJson['transaction'] = await CommonService.getTransaction(req);
		await TestResultModel.update(paramJson, condJson)
			.then(function (updateCnt) {
				if (updateCnt === 0) throw new Error('testResult update Error');
				result = updateCnt;
			})
			.catch(function (err) {
				CommonService.handleError(err, req, res, req.transaction);
				result = false;
			});
		return result;
	},
};

module.exports = TestResultDao;
