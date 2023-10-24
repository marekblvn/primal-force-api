const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addSchema = Joi.object({
  routingCode: Joi.string().valid("EUW1", "EUN1").required(),
  gameId: Joi.number().positive().required(),
});

const getSchema = Joi.object({
  id: Joi.objectId().required(),
});

const deleteSchema = Joi.object({
  id: Joi.objectId().required(),
});

const listSchema = Joi.object({
  championNameList: Joi.array().items(Joi.string()),
  pageInfo: Joi.object({
    pageIndex: Joi.number(),
    pageSize: Joi.number(),
  }),
}).unknown(true);

module.exports = { addSchema, getSchema, deleteSchema, listSchema };
