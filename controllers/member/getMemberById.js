const GetMemberByIdModel = require('../../models/getMemberById');
const utils = require('../../lib/utils');

function getMemberById(req, res, next) {
    const logger = req.logger;
    const model = new GetMemberByIdModel(logger);
    console.log(req.params);
    return model.getMemberById(req.params.id)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

module.exports = function routes(router) {
    router.get('/:id', getMemberById);
};
