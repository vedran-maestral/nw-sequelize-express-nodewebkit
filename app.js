/**
 * Module dependencies.
 */

//require("./utils/utils");
//var models = require("./models");
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
//Templating Engine
var hbs = require('hbs');
var models = require("./models"); //ORM Support
/**
 * API keys and Passport configuration.
 */
secrets = require('./config/secrets');//TODO FIX THIS. Does not want it in Global. Temporarely se here. reason is usage in dbresolver!!!
var passportConf = require('./config/passport');

var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');

var _ = require('lodash');
var flash = require('express-flash');
var path = require('path');
var passport = require('passport');
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

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "supersecret",
    store: new MSSQLStore(secrets.msSQL)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Nodewebkit does not need csrf protection. Also, it does not work in NW!!!
if (secrets.desktop) {
    app.use(lusca({
        csrf: true,
        xframe: 'SAMEORIGIN',
        xssProtection: true
    }));
}
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(function (req, res, next) {
    if (/api/i.test(req.path)) {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */

app.get('/', passportConf.isAuthenticated, homeController.index);
app.get('/login', userController.getLogin);
//vstream
app.get('/vstream', passportConf.isAuthenticated, vstreamController.getVstream);
app.post('/vstream', passportConf.isAuthenticated, vstreamController.findVstream);
//material
app.get('/material', passportConf.isAuthenticated, materialController.getMaterial);
app.post('/material', passportConf.isAuthenticated, materialController.findMaterial);
app.post('/material/new', passportConf.isAuthenticated, materialController.newMaterial);

app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
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

//Remove the Server Signature
app.disable("x-powered-by");

models.sequelize.sync().then(function () {
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
    });
});

module.exports = app;