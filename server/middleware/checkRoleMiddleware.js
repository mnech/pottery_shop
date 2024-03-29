const jwt = require("jsonwebtoken");

module.exports = function (role) {
  // return middleware
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    //methods POST, GET, PUT, DELETE
    try {
      //get token
      const token = req.headers.authorization.split(" ")[1]; //[type token, token]
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
      }

      //check token validity
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Пользователь не авторизован" });
    }
  };
};
