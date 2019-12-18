export async function index({ db, logger, config }, { limit, page, q }) {
    let filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };

    const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    logger('info', 'fetching geographies for query ' + JSON.stringify(filter));

    const nodes = await db
        .collection(config.db.geographies)
        .find(filter)
        .sort({ GID: 1 })
        .skip(pageSkip)
        .limit(pageLimit)
        .toArray();

    const total = await db
        .collection(config.db.geographies)
        .find(filter)
        .count();

    return {
        nodes,
        total
    };
}

export async function states({ db, logger, config }) {
    logger('info', 'fetching states');

    const nodes = await db
        .collection(config.db.geographies)
        .find({type: 'state'})
        .sort({ GID: 1 })
        .toArray();

    return {
        nodes,
        total: nodes.length
    };
}

export function single({ db, logger, config }, { id }) {
    logger('info', 'fetching geographies for ' + id);

    return db.collection(config.db.geographies).findOne({ GID: id });
}
