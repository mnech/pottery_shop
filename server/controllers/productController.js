const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class productController {
  async create(req, res, next) {
    try {
      const { name, desc, price, typeProductId } = req.body;
      const { img } = req.files;

      let fileName = `${uuid.v4()}.jpeg`;
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        desc,
        price,
        typeProductId,
        img: fileName,
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {}

  async getOne(req, res) {}

  async delete(req, res) {}
}

module.exports = new productController();
