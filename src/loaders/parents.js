export default async (keys, { db, config}) => {

  const parentIDs = keys.map(term => term.parent)
    
    
  const allParents = await db
    .collection(config.db.geographies)
    .find({ GID: { $in: parentIDs }, type: { $in: ['state', 'country']} })
    .toArray();
  

  const parentsObject = allParents.reduce(
    (obj, item) => Object.assign(obj, { [item.GID]: item }),
    {}
  );

  return keys.map( geography => parentsObject[geography.parent])
}
  
    
  