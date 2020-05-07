const router = require("express").Router();
const MovieController = require("../controllers/MovieController");

//movie routes
//list
router.get("/movies", MovieController.list);
//create
router.post("/movies", MovieController.create);
//read
router.get("/movies/:id", MovieController.read);
//update
router.put("/movies/:id", MovieController.update);
//delete
router.delete("/movies/:id", MovieController.delete);

module.exports = router;
