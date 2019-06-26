'use strict';
// const MongoBase = require('../lib/MongoBase');
const database = require('../lib/database');
const Q = require('q');

class GetAllMinistriesModel {

    constructor () {
        this.response = null;
        this.collection = "ministries";
    }
    
    // /**
    //  * Creates a new CategoryModel.
    //  * @param logger The logger to use.
    //  * @param errorCode The errorCode to use when generating errors.
    //  */
    // constructor(logger) {
    //     super(logger, 'allMinistries');
    //     this.logger = logger;
    //     this.collectionName = "ministries";
    // }

    // getAllMinistries() {
    //     const database = process.env.db;
    //     return Q(mongodb.find(this.collection(database),{})).then(
    //         (result) => {
    //             this.logger.info('Retrieved the results');
    //             const response = result;
    //             return response;
    //         }
    //     );
    // }

    getAllMinistries() {
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
// module.exports = function GetAllMinistriesModel() {
//     // mongoClient = database.
//     // return {
//     //     name: 'getAllMinistries'
//     // };
//     return {
//         "a":1,
//         "n":2
//     }
// };
var model = new GetAllMinistriesModel();

module.exports = model;
