export default async (keys, { db, config, logger }) => {
    logger('info', `loader fetching members for ids ${keys}` );
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