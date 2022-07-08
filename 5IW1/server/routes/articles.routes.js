const { Router } = require("express");
const { ArticleController } = require("../controllers");
const router = new Router();

router.get("/", ArticleController.cget);
router.get("/:id", ArticleController.get);
router.post("/", ArticleController.create);
router.delete("/:id", ArticleController.delete);
router.put("/:id", ArticleController.update);

module.exports = router;
