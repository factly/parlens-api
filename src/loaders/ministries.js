export default async (keys, { db, config, logger }) => {
    logger('info', `loader fetching ministries for ids ${keys}` );
    const allMinistries = await db
        .collection(config.db.ministries)
        .find({ MINID: { $in: keys } })
        .toArray();
  
    const ministriesObject = allMinistries.reduce(
        (obj, item) => Object.assign(obj, { [item.MINID]: item }),
        {}
    );
  
    return keys.map( ministry => ministriesObject[ministry] );
};