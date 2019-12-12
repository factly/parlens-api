export async function index({ db, logger, config }, { limit, page, q }) {
  let filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };

  const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
  const pageSkip = page ? (page - 1) * pageLimit : 0;

  logger("info", "fetching constituencies for query " + JSON.stringify(filter));

  const nodes = await db
    .collection(config.db.constituencies)
    .find(filter)
    .sort({ CID: 1 })
    .skip(pageSkip)
    .limit(pageLimit)
    .toArray();

  const total = await db
    .collection(config.db.constituencies)
    .find(filter)
    .count();

  return {
    nodes,
    total
  };
}

export function single({ db, logger, config }, { id }) {
  logger("info", "fetching constituency for " + id);

  return db.collection(config.db.constituencies).findOne({ CID: id });
}
