const GetAllMinistriesModel = require('../../models/getAllMinistries');
const utils = require('../../lib/utils');

function getAllMinistries(req, res, next) {
    const logger = req.logger;
    const model = new GetAllMinistriesModel(logger);
    return model.getAllMinistries()
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

module.exports = function routes(router) {
    router.get('/', getAllMinistries);
};