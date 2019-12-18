export default async (keys, { db, config }) => {
    
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