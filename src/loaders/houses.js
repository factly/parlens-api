export default async (keys, { db, config, logger }) => {
    logger('info', `loader fetching houses for ids ${keys}` );
    const allHouses = await db
        .collection(config.db.houses)
        .find({ HID: { $in: keys } })
        .toArray();
    

    const housesObject = allHouses.reduce(
        (obj, item) => Object.assign(obj, { [item.HID]: item }),
        {}
    );

    return keys.map( house => housesObject[house]);

};