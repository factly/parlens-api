'use strict';

const GetAllConstituenciesModel = require('../../models/getAllConstituencies');
const Q = require('q');


function getAllConstituencies(req, res, next) {
    const logger = req.logger;
    var model = GetAllConstituenciesModel;
    Q(model.getAllConstituencies()).
        then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            res.sendStatus(404);
            res.end();
        });
}

module.exports = function (router) {
    router.get('/', getAllConstituencies);
};


// 'use strict';

// var GetAllConstituenciesModel = require('../../models/getAllConstituencies');


// module.exports = function (router) {

//     var model = new GetAllConstituenciesModel();

//     router.get('/', function (req, res) {
        
        
//         res.render('constituency/getAllConstituencies', model);
        
        
//     });

// };
