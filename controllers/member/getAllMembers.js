'use strict';

const GetAllMembersModel = require('../../models/getAllMembers');
const Q = require('q');


function getAllMembers(req, res, next) {
    const logger = req.logger;
    var model = GetAllMembersModel;
    Q(model.getAllMembers()).
        then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            res.sendStatus(404);
            res.end();
        });
}

module.exports = function (router) {
    router.get('/', getAllMembers);
};
