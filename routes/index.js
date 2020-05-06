const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

//movie routes
//list
router.get("/movies", MovieController.list);
//create
router.post("/movies", uploadMiddleware, MovieController.create);
//read
router.get("/movies/:id", MovieController.read);
//update
router.put("/movies", MovieController.update);
//delete
router.delete("/movies", MovieController.delete);

module.exports = router;
