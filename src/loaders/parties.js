export default async (keys, { db, config}) => {
    
  
    const partyIDs = keys.map(term => term.party)
    
    
    const allParties = await db
      .collection(config.db.parties)
      .find({ PID: { $in: partyIDs } })
      .toArray();
    

    const partiesObject = allParties.reduce(
      (obj, item) => Object.assign(obj, { [item.PID]: item }),
      {}
    );

    return keys.map( term => partiesObject[term.party])
}
  
    
  