// load
const type = require('../config/global').get('type');
const config = require('../config/global').get('mysql');
const { Sequelize, Transaction } = require('sequelize');

// ORM Instance create
console.log('TYPE : ', type);
var base;
if (type == 'dev') {
	base = new Sequelize(config.database, config.user, config.password, {
		host: config.host,
		port: config.port,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			engine: 'innodb',
			freezeTableName: true,
			timestamps: false,
		},
		// timezone: '-04:00', // DC
		timezone: '+09:00', // Korea
		isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
	});
}
if (type == 'pdct') {
	base = new Sequelize(config.database, config.user, config.password, {
		host: `/cloudsql/${config.socketPath}`,
		port: config.port,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		dialectOptions: {
			socketPath: `/cloudsql/${config.socketPath}`,
		},
		define: {
			engine: 'innodb',
			freezeTableName: true,
			timestamps: false,
		},
		// timezone: '-04:00', // DC
		timezone: '+09:00', // Korea
	});
}
console.log('Create ORM Object!');

module.exports = base;
