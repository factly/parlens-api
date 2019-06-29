const MongoBase = require('../lib/MongoBase');
const Q = require('q');
const utils = require('../lib/utils');

class GetAllMembersModel extends MongoBase {
    /**
     * Creates a new GetAllMembersModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'current_ls_members');
        this.logger = logger;
    }

    getAllMembers() {
        return Q(this.collection().find({}).toArray())
            .then((result) => {
                // this.logger.info('Retrieved the results');
                // console.log(result);
                return result;
            });
    }
}

module.exports = GetAllMembersModel;