/**
 * GET /
 * Home page.
 */
var _ = require('lodash');

exports.index = function(req, res) {

  var template = 'home';
  res.render(template,
    _.merge(req.user, {_csrf: res.locals._csrf})
  );
};