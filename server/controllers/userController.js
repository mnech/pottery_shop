const ApiError = require("../error/ApiError");

class userController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("ID not set"));
    }
    res.json(id);
  }
}

module.exports = new userController();
