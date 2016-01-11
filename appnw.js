/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
//Templating Engine
var hbs = require('hbs');
var models = require("./models"); //ORM Support
/**
 * API keys and Passport configuration.
 */
secrets = require('./config/secrets');//TODO FIX THIS. Does not want it in Global.
var passportConf = require('./config/passport');

var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

var _ = require('lodash');
var flash = require('express-flash');
var path = require('path');
var expressValidator = require('express-validator');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var vstreamController = require('./controllers/vstream');
var materialController = require('./controllers/material');
var confController = require('./controllers/cfg');
var fs = require('fs');

/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || secrets.PORT);

/**
 * templating Engine Preparation.
 */

hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/partials/header.handlebars', 'utf8'));
hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/footer.handlebars', 'utf8'));
app.set('view engine', 'handlebars');
app.engine('handlebars', require('hbs').__express);
app.set("view options", {layout: '/layout/layout'});

app.use(compress());

//app.use(logger('dev')); not working in nodewebkit
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */

app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.get('/vstream', vstreamController.getVstream);
app.post('/vstream', vstreamController.findVstream);
app.get('/material', materialController.getMaterial);
app.post('/material', materialController.findMaterial);
app.post('/material/new', materialController.newMaterial);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/cfg', confController.getConfig);
/**
 * Error Handler.
 */
//app.use(errorHandler());

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/**
 * Start Express server.
 */
models.sequelize.sync().then(function () {

   setTimeout ( function () {
       app.listen(app.get('port'), function () {
           //console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
       });
   }, 2000);//Timeout is needed to slow down server start time. If the NW windows starts before the server, app will crash.

});

module.exports = app;