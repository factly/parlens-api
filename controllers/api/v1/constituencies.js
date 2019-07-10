var constituenciesModel = require('../../../models/constituencies');
var model = new constituenciesModel();
function getAllConstituencies(req, res, next) {
    var logger = req.logger;
    // var model = new constituenciesModel(logger);
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
    // var model = new constituenciesModel(logger);
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
        res.send("Constituencies APIs");
        res.sendStatus(200);
    })
    router.get('/getallconstituencies', getAllConstituencies);
    router.get('/getConstituencyById/:id', getConstituencyById);
};