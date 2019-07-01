const GetConstituencyByIdModel = require('../../models/getConstituencyById');
const utils = require('../../lib/utils');

function getConstituencyById(req, res, next) {
    const logger = req.logger;
    const model = new GetConstituencyByIdModel(logger);
    return model.getConstituencyById(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
                return;
            }
            res.sendStatus(404);
        }).catch(next);
}

module.exports = function routes(router) {
    router.get('/:id', getConstituencyById);
};