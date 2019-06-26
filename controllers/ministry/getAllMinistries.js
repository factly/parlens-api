'use strict';

const GetAllMinistriesModel = require('../../models/getAllMinistries');
const Q = require('q');


function getAllMinistries(req, res, next) {
    const logger = req.logger;
    var model = GetAllMinistriesModel;
    Q(model.getAllMinistries()).
        then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            res.sendStatus(404);
            res.end();
        });
}

module.exports = function (router) {
    router.get('/', getAllMinistries);
};
