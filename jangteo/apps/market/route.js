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
 * Routes related to a item
 */

var item = {};

item.add = function(req, res){
};

item.show = function(req, res){
};

item.remove = function(req, res){
};

item.buy = function(req, res){
};

item.sell = function(req, res){
};

/*
 * Route initialize
 */

var init = function(app){
    app.get('/', view.init);
};

module.exports = init;
