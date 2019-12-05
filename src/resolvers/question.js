export async function index(
    { db, logger, config },
    {
        limit, page,
        q, house, type, ministry, questionBy,
        gender, dob, marital_status, sons, daughters, education, profession, expertise,
        term, party, constituency
    }
) {
    let filter = {};
    let nestedFilter = {}
    if (q) filter.subject = { $regex: q, $options: 'i' };
    if (house) filter.house = house;
    if (type) filter.type = type;
    if (ministry && ministry.length > 0) filter.ministry = { $in: ministry };
    if (questionBy && questionBy.length > 0) filter.questionBy = { $in: questionBy };
    if (gender) nestedFilter['questionBy.gender'] = gender;
    if (dob) nestedFilter['questionBy.dob'] = dob;
    if (marital_status && marital_status.length > 0) nestedFilter['questionBy.marital_status'] = { $in: marital_status };
    if (education && education.length > 0) nestedFilter['questionBy.education'] = { $in: education };
    if (profession && profession.length > 0) nestedFilter['questionBy.profession'] = { $in: profession };
    if (expertise && expertise.length > 0) nestedFilter['questionBy.expertise'] = { $in: expertise };
    if (sons && sons.length > 0) nestedFilter['questionBy.sons'] = { $in: sons };
    if (daughters && daughters.length > 0) nestedFilter['questionBy.daughters'] = { $in: daughters };
    if (term) nestedFilter['questionBy.terms'] = { $size: term };
    if (party && party.length > 0) nestedFilter['questionBy.terms.party'] = { $in: party };
    if (constituency && constituency.length > 0) nestedFilter['questionBy.terms.constituency'] = { $in: constituency };

    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    logger('info', 'fetching questions for query ' + JSON.stringify(filter) + JSON.stringify(nestedFilter));
    console.time("que")
    const res = await db.collection(config.db.questions).aggregate([
        {
            $match: filter
        },
        {
            $unwind: {
                'path': '$questionBy'
            }
        },
        {
            $lookup: {
                'from': config.db.members,
                'localField': 'questionBy',
                'foreignField': 'MID',
                'as': 'questionBy'
            }
        },
        {
            $unwind: {
                'path': '$questionBy'
            }
        },
        {
            $group: {
                '_id': '$_id',
                'questionBy': { '$push': '$questionBy' },
                'QID': { '$first': '$QID' },
                'subject': { '$first': '$subject' },
                'type': { '$first': '$type' },
                'question': { '$first': '$question' },
                'answer': { '$first': '$answer' },
                'house': { '$first': '$house' },
                'ministry': { '$first': '$ministry' },
                'date': { '$first': '$date' },
            }
        },
        {
            $match: nestedFilter
        },
        {
            $sort: { QID: -1 }
        },
        {
            $skip: pageSkip
        },
        {
            $limit: pageLimit  
        },
    ]).toArray()
    console.timeEnd("que")
    return res;
}

export async function single({ db, logger, config }, { id }) {
    if (!id) return null;

    logger('info', 'fetching question for ' + id);

    const result = await db.collection(config.db.questions).aggregate([
        {
            $unwind: {
                'path': '$questionBy'
            }
        },
        {
            $lookup: {
                from: config.db.members,
                localField: 'questionBy',
                foreignField: 'MID',
                as: 'questionBy'
            }
        },
        {
            $unwind: {
                'path': '$questionBy'
            }
        },
        {
            $group: {
                '_id': '$_id',
                'questionBy': { '$push': '$questionBy' },
                'QID': { '$first': '$QID' },
                'subject': { '$first': '$subject' },
                'type': { '$first': '$type' },
                'question': { '$first': '$question' },
                'answer': { '$first': '$answer' },
                'house': { '$first': '$house' },
                'ministry': { '$first': '$ministry' },
                'date': { '$first': '$date' },
            }
        },
        {
            $match: {
                QID: id
            }
        },
    ]).toArray();
    if (result.length === 1) return result[0];
}