'use strict';
const database = require('../lib/database');
const Q = require('q');

class GetAllConstituenciesModel {

    constructor () {
        this.response = null;
        this.collection = "constituencies";
    }

    getAllConstituencies() {
        if (!this.response) {
            return Q(database.db.collection(this.collection))
            .then((ret, err) => {
                ret.find({}).toArray((err,result) => {
                    this.response = result;
                    return this.response;
                })
            });
        }
        else {
            return this.response;
        }
    }
}

var model = new GetAllConstituenciesModel();

module.exports = model;

// 'use strict';

// module.exports = function GetAllConstituenciesModel() {
//     return {
//         name: 'getAllConstituencies'
//     };
// };
