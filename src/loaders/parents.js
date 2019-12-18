export default async (keys, { db, config }) => {

    const allParents = await db
        .collection(config.db.geographies)
        .find({ GID: { $in: keys }, type: { $in: ['state', 'country'] } })
        .toArray();
  

    const parentsObject = allParents.reduce(
        (obj, item) => Object.assign(obj, { [item.GID]: item }),
        {}
    );

    return keys.map( parent => parentsObject[parent]);
};