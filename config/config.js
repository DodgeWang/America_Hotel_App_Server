var config = null;

if(process && process.env && process.env.NODE_ENV) {
	config = require('./env/' + process.env.NODE_ENV + ".js");
}else{
	config = require('./env/development.config.js');
	// config = require('./env/development2.config.js');
	// config = require('./env/Production.config.js');
}

module.exports = config;