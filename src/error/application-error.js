class ApplicationError extends Error {
  code;
  message;
  status;
  constructor(error) {
    super(...arguments);
    this.code = error.code;
    this.message = error.message;
    this.status = error.status || 500;
  }
  static get APP_ERR_CODE() {
    return "pmf-app/api";
  }
}

module.exports = ApplicationError;
