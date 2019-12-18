export async function index({ db, logger, config }, { q }) {
    let filter = {};
    if (q)
        filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { abbr: { $regex: q, $options: 'i' } },
        ];

    logger('info', 'fetching parties for query ' + JSON.stringify(filter));

    const nodes = await db
        .collection(config.db.parties)
        .find(filter)
        .sort({ PID: 1 })
        .toArray();

    return {
        nodes,
        total: nodes.length
    };
}

export function single({ db, logger, config }, { id }) {
    logger('info', 'fetching party for ' + id);

    return db.collection(config.db.parties).findOne({ PID: id });
}
