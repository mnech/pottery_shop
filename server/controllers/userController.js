const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, BasketProduct } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class userController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    //error param
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректная почта или пароль"));
    }

    //find exist user
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с такой почтой уже существует")
      );
    }

    //create user and his backet with hash password
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await BasketProduct.create({ userId: user.id });

    //create jwt token
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    //find exist user
    if (!user) {
      return next(ApiError.internal("Такого пользователя не существует"));
    }

    //check password
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Неверный пароль"));
    }

    //create jwt token
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async check(req, res, next) {
    //create jwt token
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new userController();
