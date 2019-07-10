const MongoBase = require('../lib/MongoBase');
const Q = require('q');

class ConstituenciesModel extends MongoBase {
    /**
     * Creates a new GetAllConstituenciesModel.
     * @param logger The logger to use.
     * @param errorCode The errorCode to use when generating errors.
     */
    constructor(logger) {
        super(logger, 'constituencies');
        this.logger = logger;
        this.allConstituenciesResult = null;
        this.oneConstituencyResult = {
            "id" : null,
            "result" : null
        };
    }

    getAllConstituencies(logger) {
        if (this.allConstituenciesResult) {
            return Q(this.allConstituenciesResult);
        }
        else {
            this.logger = logger;
            return Q(this.collection().find({}).toArray())
            .then((result) => {
                this.allConstituenciesResult = result;
                return result;
            });
        }
    }

    getConstituencyById(id, logger) {
        if (this.oneConstituencyResult["id"]!=id) {
            this.logger = logger;
            return Q(this.collection().find({"_id":parseInt(id)}).toArray())
            .then((result) => {
                this.oneConstituencyResult ["id"] = id;
                this.oneConstituencyResult ["result"] = result;
                return result;
            });
        }
        else if (this.oneConstituencyResult["id"] == id) {
            console.log("Cached Result");
            return Q(this.oneConstituencyResult["result"]);
        }
    }

}

module.exports = ConstituenciesModel;