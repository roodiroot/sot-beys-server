class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static bedRequest(message) {
    return new ApiError(404, message);
  }
}
module.exports = ApiError;
