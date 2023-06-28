const { getMatchData } = require("../utils/riot-api-calls");
const {
  countMatches,
  createMatch,
  getMatchByMatchId,
  getMatchById,
  deleteMatchById,
  findMatches,
} = require("../dao/match-dao");
const validate = require("../validation");
const Schemas = require("../validation/schemas");
const Error = require("../error/match-error");

const addMatch_validateRequest = async function (req, res, next) {
  await validate(Schemas.addSchema, req.body, Error.Add.InvalidInput);
  next();
};

const addMatch_storeMatchData = async function (req, res, next) {
  const { data, statusCode, statusMessage } = res.riotApiResponse;
  if (statusCode !== 200) {
    throw new Error.Add.RiotApiCallFailed(statusCode, statusMessage);
  }
  let match;
  try {
    match = await getMatchByMatchId(data.metadata.matchId);
  } catch (e) {
    throw new Error.Add.GetDaoFailed();
  }
  if (match) {
    throw new Error.Add.MatchAlreadyExists(match.info.gameId);
  }
  try {
    match = await createMatch(data);
  } catch (e) {
    throw new Error.Add.CreateDaoFailed();
  }
  res.status(201).send(match);
};

const addMatch = [
  addMatch_validateRequest,
  getMatchData,
  addMatch_storeMatchData,
];

async function deleteMatch(req, res) {
  await validate(Schemas.deleteSchema, req.body, Error.Delete.InvalidInput);
  const id = req.body.id;
  let match;
  try {
    match = await getMatchById(id);
  } catch (e) {
    throw new Error.Delete.GetDaoFailed();
  }
  if (!match) {
    throw new Error.Delete.MatchNotFound();
  }
  try {
    match = await deleteMatchById(id);
  } catch (e) {
    throw new Error.Delete.DeleteDaoFailed();
  }
  res.status(200).send(match);
}

async function getMatch(req, res) {
  await validate(Schemas.getSchema, req.query, Error.Get.InvalidInput);
  const id = req.query.id;
  let match;
  try {
    match = await getMatchById(id);
  } catch (e) {
    throw new Error.Get.GetDaoFailed();
  }
  if (!match) {
    throw new Error.Get.MatchNotFound();
  }
  res.status(200).send(match);
}

async function listMatches(req, res) {
  const summonerNames = req.query?.summonerNameList?.split(",") || [];
  const championNames = req.query?.championNameList?.split(",") || [];
  const pageIndex = parseInt(req.query?.pageIndex) || 0;
  const pageSize = parseInt(req.query?.pageSize) || 10;

  await validate(
    Schemas.listSchema,
    { summonerNames, championNames, pageInfo: { pageIndex, pageSize } },
    Error.List.InvalidInput
  );

  const filter = {
    $expr: {
      $and: [
        summonerNames.length
          ? {
              $setIsSubset: [summonerNames, "$info.participants.summonerName"],
            }
          : {},
        championNames.length
          ? {
              $setIsSubset: [championNames, "$info.participants.championName"],
            }
          : {},
      ],
    },
  };

  let itemList, totalDocuments;
  try {
    itemList = await findMatches(pageIndex, pageSize, filter);
    totalDocuments = await countMatches(filter);
  } catch (e) {
    throw new Error.List.ListDaoFailed();
  }

  if (!itemList) {
    itemList = [];
  }

  const pageInfo = {
    pageIndex,
    pageSize,
    total: totalDocuments,
  };

  res.status(200).send({ itemList, pageInfo });
}

module.exports = { addMatch, deleteMatch, getMatch, listMatches };
