export default async (keys, { db, config, logger }) => {
    logger('info', `fetching parties for ids ${keys}` );
    const allParties = await db
        .collection(config.db.parties)
        .find({ PID: { $in: keys } })
        .toArray();
    

    const partiesObject = allParties.reduce(
        (obj, item) => Object.assign(obj, { [item.PID]: item }),
        {}
    );

    return keys.map( party => partiesObject[party]);
    
};