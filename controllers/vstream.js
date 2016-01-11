/**
 *
 */

var fs = require('fs');
var models = require('../models');

exports.getVstream = function (req, res) {

    var template = 'valuestream/vstream';
    res.render(template, {_csrf: res.locals._csrf});
};

exports.findVstream = function (req, res) {

    var vStreamId = req.body.id;
    models.tbl_ValueStream.findAll({where: {id: vStreamId}}).then(function (vstream) {

        res.send(vstream[0]);

    }).catch(function (error) {
        //res.status(500).send({error: error});
    });
};