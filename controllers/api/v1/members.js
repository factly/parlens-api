const MembersModel = require('../../../models/members');
const model = new MembersModel();
function getAllMembers(req, res, next) {
    var logger = req.logger;
    // var model = new MembersModel(logger);
    return model.getAllMembers(logger)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

function getMemberById(req, res, next) {
    var logger = req.logger;
    // var model = new MembersModel(logger);
    return model.getMemberById(req.params.id, logger)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
                return;
            }
            res.sendStatus(404);
        }).catch(next);
}


module.exports = function routes(router) {
    router.get('/', function(req, res) {
        res.end("Members APIs");
    })
    router.get('/all', getAllMembers);
    router.get('/:id', getMemberById);
};