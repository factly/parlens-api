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
        dob,
        marital_status,
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
    if (q) filter.subject = { $regex: q, $options: 'i' };
    if (house) filter.house = house;
    if (type) filter.type = type;
    if (ministry && ministry.length > 0) filter.ministry = { $in: ministry };

    

    if (gender) nestedFilter['gender'] = gender;
    if (marital_status && marital_status.length > 0)
        nestedFilter['maritalStatus'] = { $in: marital_status };
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
    
    let geographies = []
    
    if (constituency && constituency.length > 0)
        geographies = geographies.concat(constituency);
    
    
    if(state && state.length > 0) {
        geographies = geographies.concat(state)

        const constituencyEligble = await db
            .collection(config.db.geographies)
            .find({ 
                parent: { $in: state }, 
                type: 'constituency'
            })
            .project({ GID: 1 })
            .toArray();

        const constituenciesID = constituencyEligble.map(each => each.GID)
        
        if(constituenciesID && constituenciesID.length > 0)
            geographies = geographies.concat(constituenciesID)

        console.log(geographies)
    }

    if(geographies.length > 0)
        nestedFilter['terms.geography'] = { $in: geographies}

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

    } else {
        if (questionBy && questionBy.length > 0)
            filter.questionBy = { $in: questionBy };
    }

    /* question fetching part */
    logger('info', 'fetching questions for query ' + JSON.stringify(filter));

    let sorting = {
        date: -1
    };
  
    if(sort === 'oldest') sorting.date = 1;

    const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

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
