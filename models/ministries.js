const MongoBase = require('../lib/MongoBase');
const Q = require('q');

class MinistriesModel extends MongoBase {
    /**
     * Creates a new MinistriesModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'ministries');
        this.logger = logger;
        this.allMinistriesResult = null;
    }

    getAllMinistries(logger) {
        if (this.allMinistriesResult) {
            return Q(this.allMinistriesResult);
        }
        else {
            this.logger = logger;
            return Q(this.collection().find({}).toArray())
            .then((result) => {
                this.allMinistriesResult = result;
                return result;
            });
        }
    }
}

module.exports = MinistriesModel;