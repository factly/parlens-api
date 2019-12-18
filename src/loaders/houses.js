export default async (keys, { db, config }) => {
    
  
    /*const houseIDs = keys.map(term => term.house);
    
    
    const allHouses = await db
        .collection(config.db.houses)
        .find({ HID: { $in: houseIDs } })
        .toArray();
    

    const housesObject = allHouses.reduce(
        (obj, item) => Object.assign(obj, { [item.HID]: item }),
        {}
    );

    return keys.map( term => housesObject[term.house]);*/

    return await db
    .collection(config.db.houses)
    .find({ HID: { $in: keys } })
    .toArray();
};
  
    
  