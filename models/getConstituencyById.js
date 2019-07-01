const MongoBase = require('../lib/MongoBase');
const Q = require('q');
const utils = require('../lib/utils');

class GetConstituencyByIdModel extends MongoBase {
    /**
     * Creates a new GetConstituencyByIdModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'constituencies');
        this.logger = logger;
    }

    getConstituencyById(id) {
        console.log("_id:",id);
        return Q(this.collection().find({"_id":parseInt(id)}).toArray())
            .then((result) => {
                // this.logger.info('Retrieved the results');
                // console.log(result);
                return result;
            });
    }
}

module.exports = GetConstituencyByIdModel;