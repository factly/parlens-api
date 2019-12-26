import moment from 'moment';

export async function index(
    { db, logger, config },
    {
        limit,
        page,
        sort,
        q,
        house,
        type,
        ministry,
        questionBy,
        gender,
        ageMax,
        ageMin,
        maritalStatus,
        sons,
        daughters,
        education,
        profession,
        expertise,
        terms,
        party,
        constituency,
        state
    }
) {
    let filter = {};
    let nestedFilter = {};
    let geography = [];
    if (q) filter.subject = { $regex: q, $options: 'i' };
    if (house) filter.house = house;
    if (type) filter.type = type;
    if (ministry && ministry.length > 0) filter.ministry = { $in: ministry };

    if(constituency && constituency.length > 0)
        geography = geography.concat(constituency);

    if(state && state.length > 0){
        geography = geography.concat(state);

        const constituenciesEligible = await db
            .collection(config.db.geographies)
            .find({ parent: { $in: state } })
            .project({ GID: 1 })
            .toArray();

        geography = geography.concat(constituenciesEligible.map(constituency => constituency.GID));
    }
    
    if (gender) nestedFilter['gender'] = { $in: gender };
    if (ageMin && ageMax) nestedFilter.dob = { 
        '$lte': moment().subtract(ageMin, 'years').unix() * 1000, 
        '$gte': moment().subtract(ageMax, 'years').unix() * 1000
    };
    else if (ageMin) nestedFilter.dob = { '$lte': moment().subtract(ageMin, 'years').unix() * 1000 };
    else if (ageMax) nestedFilter.dob = { '$gte': moment().subtract(ageMax, 'years').unix() * 1000 };
    if (maritalStatus && maritalStatus.length > 0)
        nestedFilter['maritalStatus'] = { $in: maritalStatus };
    if (education && education.length > 0)
        nestedFilter['education'] = { $in: education };
    if (profession && profession.length > 0)
        nestedFilter['profession'] = { $in: profession };
    if (expertise && expertise.length > 0)
        nestedFilter['expertise'] = { $in: expertise };
    if (sons && sons.length > 0) nestedFilter['sons'] = { $in: sons };
    if (daughters && daughters.length > 0)
        nestedFilter['daughters'] = { $in: daughters };
    if (terms) nestedFilter['terms'] = { $size: terms };
    if (party && party.length > 0) nestedFilter['terms.party'] = { $in: party };
    if (geography && geography.length > 0)
        nestedFilter['terms.geography'] = { $in: geography };
   
    if (Object.keys(nestedFilter).length > 0) {

        if (questionBy && questionBy.length > 0)
            nestedFilter.MID = { $in: questionBy };
    
        logger('info', 'fetching members for question query ' + JSON.stringify(nestedFilter));

        const membersEligible = await db
            .collection(config.db.members)
            .find(nestedFilter)
            .project({ MID: 1 })
            .toArray();

        const memberIDs = membersEligible.map(each => each.MID);

        if (memberIDs) filter.questionBy = { $in: memberIDs };
    } else if (questionBy && questionBy.length > 0) {
        filter.questionBy = { $in: questionBy };
    }

    logger('info', 'fetching questions for query ' + JSON.stringify(filter));

    const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    let sorting = {
        date: -1
    };

    if(sort === 'oldest') sorting.date = 1;

    let questionsWithoutMembers = await db
        .collection(config.db.questions)
        .find(filter)
        .sort(sorting)
        .skip(pageSkip)
        .limit(pageLimit)
        .toArray();

    const totalQuestions = await db
        .collection(config.db.questions)
        .find(filter)
        .count();

    return {
        nodes: questionsWithoutMembers,
        total: totalQuestions
    };
}

export async function single({ db, logger, config }, { id }) {
    logger('info', 'fetching question for ' + id);

    return await db
        .collection(config.db.questions)
        .findOne({ QID: id });
}
