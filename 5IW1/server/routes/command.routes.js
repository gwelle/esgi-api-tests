const { Router } = require("express");
const { CommandController } = require("../controllers");
const router = new Router();

router.get("/", CommandController.cget);
router.get("/:id", CommandController.get);
router.post("/", CommandController.create);
router.delete("/:id", CommandController.delete);
router.put("/:id", CommandController.update);

module.exports = router;
