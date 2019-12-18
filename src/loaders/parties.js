export default async (keys, { db, config }) => {
    
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
  
    
  