const ApplicationError = require("./application-error");

const MATCH_ERR_CODE = `${ApplicationError.APP_ERR_CODE}/match`;

const Add = {
  CODE: `${MATCH_ERR_CODE}/add`,
  InvalidInput: class extends ApplicationError {
    constructor(msg) {
      super({
        code: `${Add.CODE}/invalidInput`,
        status: 400,
        message: { en: msg, cs: msg },
      });
    }
  },
  CreateDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${Add.CODE}/createDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
  GetDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${Add.CODE}/getDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
  MatchAlreadyExists: class extends ApplicationError {
    constructor(gameId) {
      super({
        code: `${Add.CODE}/matchAlreadyExists`,
        status: 409,
        message: {
          en: `Match with Game ID ${gameId} already exists in database.`,
          cs: `Zápas s ID ${gameId} již v databázi existuje.`,
        },
      });
    }
  },
  RiotApiCallFailed: class extends ApplicationError {
    constructor(status, message) {
      super({
        code: `${Add.CODE}/riotApiError`,
        status: status,
        message: { en: message, cs: message },
      });
    }
  },
};

const Get = {
  CODE: `${MATCH_ERR_CODE}/get`,
  InvalidInput: class extends ApplicationError {
    constructor(msg) {
      super({
        code: `${Get.CODE}/invalidInput`,
        status: 400,
        message: { en: msg, cs: msg },
      });
    }
  },
  GetDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${Get.CODE}/getDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
  MatchNotFound: class extends ApplicationError {
    constructor() {
      super({
        code: `${Get.CODE}/matchNotFound`,
        status: 404,
        message: {
          en: "Match with specified ID does not exist.",
          cs: "Zápas s tímto ID neexistuje.",
        },
      });
    }
  },
};

const List = {
  CODE: `${MATCH_ERR_CODE}/list`,
  InvalidInput: class extends ApplicationError {
    constructor(msg) {
      super({
        code: `${List.CODE}/invalidInput`,
        status: 400,
        message: { en: msg, cs: msg },
      });
    }
  },
  ListDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${List.CODE}/listDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
};

const Delete = {
  CODE: `${MATCH_ERR_CODE}/delete`,
  InvalidInput: class extends ApplicationError {
    constructor(msg) {
      super({
        code: `${Delete.CODE}/invalidInput`,
        status: 400,
        message: { en: msg, cs: msg },
      });
    }
  },
  GetDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${Delete.CODE}/getDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
  DeleteDaoFailed: class extends ApplicationError {
    constructor() {
      super({
        code: `${Delete.CODE}/deleteDaoFailed`,
        status: 500,
        message: {
          en: "Error ocurred while accessing database.",
          cs: "Při přístupu do databáze došlo k chybě.",
        },
      });
    }
  },
  MatchNotFound: class extends ApplicationError {
    constructor() {
      super({
        code: `${Delete.CODE}/matchNotFound`,
        status: 404,
        message: {
          en: "Match with specified ID does not exist.",
          cs: "Zápas s tímto ID neexistuje.",
        },
      });
    }
  },
};

module.exports = {
  Add,
  Get,
  Delete,
  List,
};
