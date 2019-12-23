export async function index(
    { db, logger, config },
    {
        limit,
        page,
        q,
        gender,
        dob,
        maritalStatus,
        sons,
        daughters,
        education,
        profession,
        expertise,
        terms,
        party,
        geography,
        house,
        session
    }
) {
    let filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (gender) filter.gender = gender;
    if (dob) filter.dob = dob;
    if (maritalStatus && maritalStatus.length > 0)
        filter.maritalStatus = { $in: maritalStatus };
    if (education && education.length > 0) filter.education = { $in: education };
    if (profession && profession.length > 0)
        filter.profession = { $in: profession };
    if (expertise && expertise.length > 0) filter.expertise = { $in: expertise };
    if (sons && sons.length > 0) filter.sons = { $in: sons };
    if (daughters && daughters.length > 0) filter.daughters = { $in: daughters };
    if (terms) filter.terms = { $size: terms };
    if (party && party.length > 0) filter['terms.party'] = { $in: party };
    if (geography && geography.length > 0)
        filter['terms.geography'] = { $in: geography };
    if (house && house.length > 0) filter['terms.house'] = { $in: house };
    if (session && session.length > 0) filter['terms.session'] = { $in: session };

    const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    logger('info', 'fetching members for query ' + JSON.stringify(filter));

    const nodes = await db
        .collection(config.db.members)
        .find(filter)
        .sort({ MID: -1 })
        .skip(pageSkip)
        .limit(pageLimit)
        .toArray();

    const total = await db
        .collection(config.db.members)
        .find(filter)
        .count();

    return {
        nodes,
        total
    };
}

export async function single({ db, logger, config }, { id }) {
    return await db
        .collection(config.db.members)
        .findOne({ MID: id });
}
