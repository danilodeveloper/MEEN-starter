var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
    morgan = require("morgan"),
    errorHandler = require("errorhandler"),
    favicon = require("serve-favicon");

app.set("port", process.env.PORT || 3000);
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(morgan());
	app.use(errorHandler());
}
app.use(bodyParser());

app.use(express.static(__dirname + '/web'));

global.config = require('./config');
global.constants = require('./constants');

require('./routes/api').bindRoutes(app);

//connect to mongodb
console.log('INFO: Connecting to MongoDB...');
console.log('\tURL: ' + global.config.MONGO_URL);
console.log('\tCollections:' + JSON.stringify(global.constants.MONGO_COLLECTIONS));
global.db = require('mongojs').connect(global.config.MONGO_URL, global.constants.MONGO_COLLECTIONS);

app.listen(app.get("port"), function() {
	return console.log("Server listening on port " + app.get("port"));
});

