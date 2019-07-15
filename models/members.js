const MongoBase = require('../lib/MongoBase');
const Q = require('q');

class MembersModel extends MongoBase {
    /**
     * Creates a new GetAllMembersModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'current_ls_members');
        this.logger = logger;
        this.allMembersResult = null;
        this.oneMemberResult = {
            "id" : null,
            "result" : null
        };
    }

    getAllMembers(logger) {
        if (this.allMembersResult) {
            return Q(this.allMembersResult);
        }
        else {
            this.logger = logger;
            return Q(this.collection().find({}).toArray())
            .then((result) => {
                this.allMembersResult = result;
                return result;
            });
        }
    }

    getMemberById(id, logger) {
        if (this.oneMemberResult["id"]!=id) {
            this.logger = logger;
            return Q(this.collection().find({"_id":id}).toArray())
            .then((result) => {
                this.oneMemberResult ["id"] = id;
                this.oneMemberResult ["result"] = result;
                return result;
            });
        }
        else if (this.oneMemberResult["id"] == id) {
            console.log("Cached Result");
            return Q(this.oneMemberResult["result"]);
        }
    }

}

module.exports = MembersModel;