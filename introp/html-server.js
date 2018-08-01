//Webserver
var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');

//Paths from Json
var configJson = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var www_path = configJson.www_path;

///////
connect().use(serveStatic(www_path)).listen(8080, function() {
  console.log('Server running on 8080...');
});
