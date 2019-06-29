const GetAllMembersModel = require('../../models/getAllMembers');
const utils = require('../../lib/utils');

function getAllMembers(req, res, next) {
    const logger = req.logger;
    const model = new GetAllMembersModel(logger);
    return model.getAllMembers()
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

module.exports = function routes(router) {
    router.get('/', getAllMembers);
};