'use strict';

var GetAllMinistriesModel = require('../../models/getAllMinistries');


module.exports = function (router) {

    var model = new GetAllMinistriesModel();

    router.get('/', function (req, res) {
        
        
        res.render('ministry/getAllMinistries', model);
        
        
    });

};
