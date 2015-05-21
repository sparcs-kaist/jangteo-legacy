/*
 * Required node packages
 */

var express = require('express');

/*
 * Views
 */

var view = {};

view.init = function(req, res){
    res.send("shopand initialized");
};

/*
 * Route initialize
 */

var init = function(app){
    app.get('/', view.init);
};

module.exports = init;
