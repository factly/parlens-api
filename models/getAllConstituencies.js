const MongoBase = require('../lib/MongoBase');
const Q = require('q');
const utils = require('../lib/utils');

class GetAllConstituenciesModel extends MongoBase {
    /**
     * Creates a new GetAllConstituenciesModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'constituencies');
        this.logger = logger;
    }

    getAllConstituencies() {
        return Q(this.collection().find({}).toArray())
            .then((result) => {
                // this.logger.info('Retrieved the results');
                // console.log(result);
                return result;
            });
    }
}

module.exports = GetAllConstituenciesModel;