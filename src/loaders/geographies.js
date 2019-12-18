export default async (keys, { db, config }) => {
    
    const allGeographies = await db
        .collection(config.db.geographies)
        .find({ GID: { $in: keys } })
        .toArray();
    

    const geographiesObject = allGeographies.reduce(
        (obj, item) => Object.assign(obj, { [item.GID]: item }),
        {}
    );

    return keys.map( geography => geographiesObject[geography]);
};