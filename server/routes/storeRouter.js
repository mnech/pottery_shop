const Router = require("express");
const router = new Router();
const storeController = require("../controllers/storeController");

router.post("/", storeController.create);
router.get("/", storeController.getAll);
router.delete("/", storeController.delete);

module.exports = router;
