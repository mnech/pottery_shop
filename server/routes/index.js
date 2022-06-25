const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const productRouter = require("./productRouter");
const storeRouter = require("./storeRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/product", productRouter);
router.use("/store", storeRouter);

module.exports = router;
