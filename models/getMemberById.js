const MongoBase = require('../lib/MongoBase');
const Q = require('q');
const utils = require('../lib/utils');

class GetMemberByIdModel extends MongoBase {
    /**
     * Creates a new GetMemberByIdModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'current_ls_members');
        this.logger = logger;
    }

    getMemberById(id) {
        return Q(this.collection().find({"_id":id}).toArray())
            .then((result) => {
                // this.logger.info('Retrieved the results');
                // console.log(result);
                return result;
            });
    }
}

module.exports = GetMemberByIdModel;