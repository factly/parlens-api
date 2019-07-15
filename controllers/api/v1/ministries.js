const MinistriesModel = require('../../../models/ministries');
const model = new MinistriesModel();

function getAllMinistries(req, res, next) {
    const logger = req.logger;
    // const model = new MinistriesModel(logger);
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
    router.get('/', function(req, res) {
        res.send("Ministries APIs");
        res.sendStatus(200);
    })
    router.get('/all', getAllMinistries);
};