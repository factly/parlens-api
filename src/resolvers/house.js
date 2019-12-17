export async function index({ db, logger, config }) {
   
    logger("info", "fetching houses");
  
    const nodes = await db
      .collection(config.db.houses)
      .find({})
      .sort({ HID: 1 })
      .toArray();
  
    return {
      nodes,
      total: nodes.length
    };
}