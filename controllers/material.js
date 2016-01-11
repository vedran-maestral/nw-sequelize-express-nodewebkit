/**
 * ORM Query details --> http://docs.sequelizejs.com/en/latest/docs/querying/
 */

var models = require('../models');
var DC = require('../utils/DC');

exports.getMaterial = function (req, res) {

    var template = 'material/material';
    res.render(template, {_csrf: res.locals._csrf});
};

exports.findMaterial = function (req, res) {

    req.assert('name', 'Please provide valid search parameter').notEmpty();

    var name = req.body.name;

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors[0].msg);
    }

    models.tbl_Materials.findAll({where: {Name: DC.encrypt( name ) }}).then(function (materials) {
        // materials will be an array of Project instances with the specified name

        if(materials.length === 0){
            res.status(404).send("No results for " + name);
        }
        materials[0].Name  = DC.decrypt( materials[0].Name);
        materials[0].Description  = DC.decrypt( materials[0].Description);

        res.send(materials[0]);

    }).catch(function (error) {
        res.status(500).send("There was a problem searching results");
    });

    /*models.tbl_Materials.findOne({
        where: {id: "098fc0953378797c23"}
    }).then(function (res) {
        var res = "";
    })*/


};

exports.newMaterial = function (req, res) {

    req.assert('name', 'Name is mandatory').notEmpty();
    req.assert('description', 'Material description is mandatory').notEmpty();

    var newMaterialName = req.body.name;
    var newMaterialDescription = req.body.description;

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors[0].msg);
    }

    models.tbl_Materials.create({
        Name: DC.encrypt(newMaterialName),
        Description: DC.encrypt(newMaterialDescription)
    }).then(function(newMaterial) {

            //Chaining the promises
           /* models.UserData.findAll({where: {id: 1}}).then(function (user) {

            });*/
      res.send(newMaterial.dataValues);

    }).catch(function (error) {
        res.status(500).send("There was a problem saving query");
    });
};