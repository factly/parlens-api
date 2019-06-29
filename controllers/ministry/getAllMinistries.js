const MinistriesModel = require('../../models/getAllMinistries');
const utils = require('../../lib/utils');

function getAllMinistries(req, res, next) {
    const logger = req.logger;
    const model = new MinistriesModel(logger);
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


// 'use strict';

// const GetAllMinistriesModel = require('../../models/getAllMinistries');
// const Q = require('q');
// const winston = require('winston');
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console()
//     ]
// })


// function getAllMinistries(req, res, next) {
//     Q(GetAllMinistriesModel.getAllMinistries()).
//         then((err, result) => {
//             if (result) {
//                 res.status(200).json(result);
//             }
//             else {
//                 logger.error(err);
//                 res.sendStatus(404);
//             }
//             res.end();
//         });
// }

// module.exports = function (router) {
//     router.get('/', getAllMinistries);
// };
