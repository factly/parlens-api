export function index({ db, logger, config }, { limit, page, q }) {
    let filter = {};
    if(q) filter.$or = [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }];
    
    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    logger('info', 'fetching parties for query ' + JSON.stringify(filter));

    return db.collection(config.db.parties).find(filter).sort({ PID: 1 }).limit(pageLimit).skip(pageSkip).toArray();
}

export function single({ db, logger, config }, { id }) {
    if(!id) return null;

    logger('info', 'fetching party for ' + id);

    return db.collection(config.db.parties).findOne({ PID: id });
}