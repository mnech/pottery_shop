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

  async getAll(req, res) {
    let { typeProductId, limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    let offset = page * limit - limit;

    let products;

    if (!typeProductId) {
      products = await Product.findAndCountAll({ limit, offset });
    } else {
      products = await Product.findAndCountAll({
        where: { typeProductId },
        limit,
        offset,
      });
    }

    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });

    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.query;
    const result = await Product.destroy({
      where: { id },
    });

    if (!result) {
      return next(ApiError.badRequest("No product!"));
    }

    return res.json({ message: "Success" });
  }
}

module.exports = new productController();
