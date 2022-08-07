const { TypeProduct } = require("../models/models");
const ApiError = require("../error/ApiError");

class typeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await TypeProduct.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await TypeProduct.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const { id } = req.query;
    const result = await TypeProduct.destroy({
      where: { id },
    });

    if (!result) {
      return next(ApiError.badRequest("No type!"));
    }

    return res.json({ message: "Success" });
  }
}

module.exports = new typeController();
