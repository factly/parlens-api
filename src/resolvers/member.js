export async function index(
  { db, logger, config },
  {
    limit,
    page,
    q,
    gender,
    dob,
    marital_status,
    sons,
    daughters,
    education,
    profession,
    expertise,
    term,
    party,
    constituency,
    house,
    session
  }
) {
  let filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (gender) filter.gender = gender;
  if (dob) filter.dob = dob;
  if (marital_status && marital_status.length > 0)
    filter.maritalStatus = { $in: marital_status };
  if (education && education.length > 0) filter.education = { $in: education };
  if (profession && profession.length > 0)
    filter.profession = { $in: profession };
  if (expertise && expertise.length > 0) filter.expertise = { $in: expertise };
  if (sons && sons.length > 0) filter.sons = { $in: sons };
  if (daughters && daughters.length > 0) filter.daughters = { $in: daughters };
  if (term) filter.terms = { $size: term };
  if (party && party.length > 0) filter["terms.party"] = { $in: party };
  if (constituency && constituency.length > 0)
    filter["terms.constituency"] = { $in: constituency };
  if (house && house.length > 0) filter["terms.house"] = { $in: house };
  if (session && session.length > 0) filter["terms.session"] = { $in: session };

  const pageLimit = limit && limit > 0 && limit <= 20 ? limit : 10;
  const pageSkip = page ? (page - 1) * pageLimit : 0;

  logger("info", "fetching members for query " + JSON.stringify(filter));

  const nodes = await db
    .collection(config.db.members)
    .aggregate([
      {
        $match: filter
      },
      {
        $unwind: {
          path: "$terms"
        }
      },
      {
        $lookup: {
          from: config.db.parties,
          localField: "terms.party",
          foreignField: "PID",
          as: "terms.party"
        }
      },
      {
        $lookup: {
          from: config.db.constituencies,
          localField: "terms.constituency",
          foreignField: "CID",
          as: "terms.constituency"
        }
      },
      {
        $unwind: "$terms.constituency"
      },
      {
        $unwind: "$terms.party"
      },
      {
        $group: {
          _id: "$_id",
          terms: { $push: "$terms" },
          term_size: { $sum: 1 },
          gender: { $first: "$gender" },
          MID: { $first: "$MID" },
          name: { $first: "$name" },
          dob: { $first: "$dob" },
          birthPlace: { $first: "$birth_place" },
          maritalStatus: { $first: "$maritalStatus" },
          sons: { $first: "$sons" },
          daughters: { $first: "$daughters" },
          email: { $first: "$email" },
          phone: { $first: "$phone" },
          education: { $first: "$education" },
          expertise: { $first: "$expertise" },
          profession: { $first: "$profession" }
        }
      },
      {
        $sort: { MID: -1 }
      },
      {
        $skip: pageSkip
      },
      {
        $limit: pageLimit
      }
    ])
    .toArray();

  const total = await db
    .collection(config.db.members)
    .find(filter)
    .count();

  return {
    nodes,
    total
  };
}

export async function single({ db, logger, config }, { id }) {
  logger("info", "fetching member for " + id);

  const result = await db
    .collection(config.db.members)
    .aggregate([
      {
        $match: {
          MID: id
        }
      },
      {
        $unwind: {
          path: "$terms"
        }
      },
      {
        $lookup: {
          from: config.db.parties,
          localField: "terms.party",
          foreignField: "PID",
          as: "terms.party"
        }
      },
      {
        $lookup: {
          from: config.db.constituencies,
          localField: "terms.constituency",
          foreignField: "CID",
          as: "terms.constituency"
        }
      },
      { $unwind: "$terms.constituency" },
      { $unwind: "$terms.party" },
      {
        $group: {
          _id: "$_id",
          terms: { $push: "$terms" },
          gender: { $first: "$gender" },
          name: { $first: "$name" },
          MID: { $first: "$MID" },
          dob: { $first: "$dob" },
          birthPlace: { $first: "$birth_place" },
          maritalStatus: { $first: "$maritalStatus" },
          sons: { $first: "$sons" },
          daughters: { $first: "$daughters" },
          email: { $first: "$email" },
          phone: { $first: "$phone" },
          education: { $first: "$education" },
          expertise: { $first: "$expertise" },
          profession: { $first: "$profession" }
        }
      }
    ])
    .toArray();
  if (result.length === 1) return result[0];
}
