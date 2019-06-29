const MongoBase = require('../lib/MongoBase');
const Q = require('q');
const utils = require('../lib/utils');

class GetAllMinistriesModel extends MongoBase {
    /**
     * Creates a new GetAllMinistriesModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'ministries');
        this.logger = logger;
    }

    getAllMinistries() {
        return Q(this.collection().find({}).toArray())
            .then((result) => {
                // this.logger.info('Retrieved the results');
                // console.log(result);
                return result;
            });
    }
}

module.exports = GetAllMinistriesModel;