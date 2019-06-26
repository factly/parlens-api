'use strict';

var GetAllMembersModel = require('../../models/getAllMembers');


module.exports = function (router) {

    var model = new GetAllMembersModel();

    router.get('/', function (req, res) {
        
        
        res.render('member/getAllMembers', model);
        
        
    });

};
