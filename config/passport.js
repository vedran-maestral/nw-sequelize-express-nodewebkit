var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var secrets = require('./secrets');
var User = require('../models/User');

var models = require('../models');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    models.UserData.findAll({where: {id: id}}).then(function (user, err) {
        done(err, user[0].dataValues)
    });
});

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    email = email.toLowerCase();

    models.UserData.findAll({where: {Email: email}}).then(function (user) {

        if (user.length === 0) {
            return done(null, false, {message: 'Email ' + email + ' not found'});
        }
        //TODO: Add helper method to user model that checks is the password hased or not.
        if(user[0].dataValues.Password !== password){
            return done(null, false, {message: 'Email ' + email + ' not found'});

        }
            return done(null, user[0].dataValues);
    });
}));

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy(secrets.facebook, function (req, accessToken, refreshToken, profile, done) {
    if (req.user) {
        User.findOne({facebook: profile.id}, function (err, existingUser) {
            if (existingUser) {
                req.flash('errors', {msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'});
                done(err);
            } else {
                User.findById(req.user.id, function (err, user) {
                    user.facebook = profile.id;
                    user.tokens.push({kind: 'facebook', accessToken: accessToken});
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.save(function (err) {
                        req.flash('info', {msg: 'Facebook account has been linked.'});
                        done(err, user);
                    });
                });
            }
        });
    } else {
        User.findOne({facebook: profile.id}, function (err, existingUser) {
            if (existingUser) {
                return done(null, existingUser);
            }
            User.findOne({email: profile._json.email}, function (err, existingEmailUser) {
                if (existingEmailUser) {
                    req.flash('errors', {msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'});
                    done(err);
                } else {
                    var user = new User();
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({kind: 'facebook', accessToken: accessToken});
                    user.profile.name = profile.displayName;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                    user.save(function (err) {
                        done(err, user);
                    });
                }
            });
        });
    }
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, {kind: provider})) {
        next();
    } else {
        res.redirect('/auth/' + provider);
    }
};