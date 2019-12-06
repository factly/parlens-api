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
    let nestedFilter = {};
    if (q) filter.subject = { $regex: q, $options: 'i' };
    if (house) filter.house = house;
    if (type) filter.type = type;
    if (ministry && ministry.length > 0) filter.ministry = { $in: ministry };
    
    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;
    
    if (questionBy && questionBy.length > 0) nestedFilter.MID = { $in: questionBy };
    if (gender) nestedFilter['gender'] = gender;
    if (dob) nestedFilter['dob'] = dob;
    if (marital_status && marital_status.length > 0) nestedFilter['marital_status'] = { $in: marital_status };
    if (education && education.length > 0) nestedFilter['education'] = { $in: education };
    if (profession && profession.length > 0) nestedFilter['profession'] = { $in: profession };
    if (expertise && expertise.length > 0) nestedFilter['expertise'] = { $in: expertise };
    if (sons && sons.length > 0) nestedFilter['sons'] = { $in: sons };
    if (daughters && daughters.length > 0) nestedFilter['daughters'] = { $in: daughters };
    if (term) nestedFilter['terms'] = { $size: term };
    if (party && party.length > 0) nestedFilter['terms.party'] = { $in: party };
    if (constituency && constituency.length > 0) nestedFilter['terms.constituency'] = { $in: constituency };

    if(Object.keys(nestedFilter).length > 0){
        logger('info', 'fetching members for question query ' + JSON.stringify(nestedFilter));

        const membersEligible = await db.collection(config.db.members).find(nestedFilter).project({ MID: 1 }).toArray();

        const memberIDs = membersEligible.map( each => each.MID);
            
        if (memberIDs) filter.questionBy = { $in : memberIDs };
    }

    logger('info', 'fetching questions for query ' + JSON.stringify(filter));


    let questionWithoutMembers = await db.collection(config.db.questions).find(filter).skip(pageSkip).limit(pageLimit).toArray();

    let fetchMemberIDs = [];

    questionWithoutMembers.map( question => fetchMemberIDs = fetchMemberIDs.concat(question.questionBy));
    
    const allMembers = await db.collection(config.db.members).find({ 'MID': { '$in': fetchMemberIDs } }).toArray();

    const membersObject = allMembers.reduce((obj, item) => Object.assign(obj, { [item.MID]: item }), {});

    return questionWithoutMembers.map( each => {
        return {
            ...each,
            questionBy: each.questionBy.map(questioner => membersObject[questioner])
        };
    });
}

export async function single({ db, logger, config }, { id }) {
    if (!id) return null;

    logger('info', 'fetching question for ' + id);

    const result = await db.collection(config.db.questions).aggregate([
        {
            $match: {
                QID: id
            }
        },
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
                'date': { '$first': '$date' }
            }
        },
    ]).toArray();
    if (result.length === 1) return result[0];
}