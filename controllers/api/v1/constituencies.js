const ConstituenciesModel = require('../../../models/constituencies');
const model = new ConstituenciesModel();
function getAllConstituencies(req, res, next) {
    var logger = req.logger;
    // var model = new ConstituenciesModel(logger);
    return model.getAllConstituencies(logger)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }).catch(next);
}

function getConstituencyById(req, res, next) {
    var logger = req.logger;
    // var model = new ConstituenciesModel(logger);
    return model.getConstituencyById(req.params.id, logger)
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
        res.end("Constituencies APIs");
    })
    router.get('/all', getAllConstituencies);
    router.get('/:id', getConstituencyById);
};