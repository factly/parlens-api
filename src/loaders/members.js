export default async (keys, { db, config}) => {
  const allMemberIDs = [].concat(...keys);
  
  const allMembers = await db
    .collection(config.db.members)
    .find({ MID: { $in: allMemberIDs } })
    .toArray();
  
  const membersObject = allMembers.reduce(
    (obj, item) => Object.assign(obj, { [item.MID]: item }),
    {}
  );
  
  return keys.map( question => question.map( each => membersObject[each] ))
}

  
