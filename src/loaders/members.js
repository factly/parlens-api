export default async (keys, { db, config }) => {
  
    const allMembers = await db
        .collection(config.db.members)
        .find({ MID: { $in: keys } })
        .toArray();
  
    const membersObject = allMembers.reduce(
        (obj, item) => Object.assign(obj, { [item.MID]: item }),
        {}
    );
  
    return keys.map( question => membersObject[question] );
};