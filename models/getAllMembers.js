'use strict';
const database = require('../lib/database');
const Q = require('q');

class GetAllMembersModel {

    constructor () {
        this.response = null;
        this.collection = "current_ls_members";
    }

    getAllMembers() {
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

var model = new GetAllMembersModel();

module.exports = model;
