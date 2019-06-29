const GetAllConstituenciesModel = require('../../models/getAllConstituencies');
const utils = require('../../lib/utils');

function getAllConstituencies(req, res, next) {
    const logger = req.logger;
    const model = new GetAllConstituenciesModel(logger);
    return model.getAllConstituencies()
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

module.exports = function routes(router) {
    router.get('/', getAllConstituencies);
};