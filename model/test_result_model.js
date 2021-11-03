// Load Modules
const sequelize = require('sequelize');
const base = require('./base');

// Define Model
const TestResultModel = base.define('testResult', {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: sequelize.STRING,
		allowNull: false,
	},
	bun: {
		type: sequelize.DECIMAL,
	},
	k: {
		type: sequelize.DECIMAL,
	},
	creatinine: {
		type: sequelize.DECIMAL,
	},
	eGFR: {
		type: sequelize.DECIMAL,
	},
	hb: {
		type: sequelize.DECIMAL,
	},
	phosphate: {
		type: sequelize.DECIMAL,
	},
	totalCarbonDioxide: {
		type: sequelize.DECIMAL,
	},
	bunCrRatio: {
		type: sequelize.DECIMAL,
	},
	responseResult: {
		type: sequelize.STRING,
	},
	checkupDate: {
		type: sequelize.STRING,
	},
	isDel: {
		type: sequelize.STRING,
	},
	createDate: {
		// type: sequelize.DATE,
		type: sequelize.STRING,
	},
	createId: {
		type: sequelize.INTEGER,
	},
	updateDate: {
		// type: sequelize.DATE,
		type: sequelize.STRING,
	},
	updateId: {
		type: sequelize.INTEGER,
	},
});

module.exports = TestResultModel;
