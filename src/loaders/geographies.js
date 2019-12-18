export default async (keys, { db, config}) => {
    
  
    const geographyIDs = keys.map(term => term.geography)
    
    
    const allGeographies = await db
      .collection(config.db.geographies)
      .find({ GID: { $in: geographyIDs } })
      .toArray();
    

    const geographiesObject = allGeographies.reduce(
      (obj, item) => Object.assign(obj, { [item.GID]: item }),
      {}
    );

    return keys.map( term => geographiesObject[term.geography])
}
  
    
  