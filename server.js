// /*
//  * SERVER.JS
//  */

// require('dotenv').load();
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// var config = require('./config')
//   , express = require('express')
//   , app = express()
//   , resources = require('./resources')
//   , path = require('path')
//   , bodyParser = require('body-parser')
//   , flash = require('connect-flash')
//   , cors = require('cors')
//   , logger = require('morgan')
//   , server = app.listen(config.port)
//   , mongoose  = require('mongoose')

// mongoose.connect(config.db);

// app.use("/", express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));

// app.use(cors());
// app.use(logger('dev'));
// app.use(flash());

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

// var ejs = require('ejs');
// app.engine('html', ejs.renderFile); 
// app.set('view engine', 'html');

// // RESOURCES
// app.get('/', resources.index);
// app.get('/templates/:name', resources.templates);
// require('./resources/users')(app);

// // redirect all others to the index (HTML5 history)
// app.get('*', resources.index);

// module.exports = server;
// console.log('server running at http://localhost:' + config.port);






/* 
 * SERVER.JS - setup for server, modules, middleware, database
 */

// set up base express app
require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var app = express();

// other modules and middleware
var path = require('path');   // built-in module for dealing with file paths
var bodyParser = require('body-parser');  // parse form data into req.body
var mongoose = require('mongoose');   // object document mapper

// configure bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// connect to database
var dbName = 'seed-mean-html';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/' + dbName);    

// serve public folder as static assets on the root route
var publicPath = path.join(__dirname, 'public');
app.use("/", express.static(publicPath));

// alias the views folder
// var viewsPath = path.join(__dirname, 'views');
// app.set('views', viewsPath);

// set 'html' as the engine, using ejs's renderFile function
var ejs = require('ejs');
app.engine('html', ejs.renderFile); 
app.set('view engine', 'html');

/*** ROUTES ***/
var routes = require('./resources');

// INDEX and TEMPLATE ROUTES
app.get('/', routes.index);
// app.get('/', function(request, response){
//   response.render('index');
// });

app.get('/templates/:name', routes.templates);
// app.get('/templates/:name', function(request, response){
//   var name = request.params.name;
//   response.render('templates/' + name);
// });

// API ROUTES
app.use('/api/networks', routes.networkRouter);
app.use('/api/contacts', routes.contactRouter);
require('./resources/users')(app);

// ALL OTHER ROUTES (ANGULAR HANDLES)
// redirect all other paths to index
app.get('*',  routes.index);

// SERVER
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 1337;

var server = require('http').createServer(app);
server = server.listen(port);
console.log(process.env.NODE_ENV  + ' server running at port:' + port);


