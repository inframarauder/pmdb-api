const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const isAuthenticated = require("../middlewares/isAuthenticated");

//auth routes
router.post("/auth/login", AuthController.login);
router.post("/auth/signup", AuthController.signup);

//user routes
router.get("/user/:id", isAuthenticated, UserController.read_user);

//movie routes
//list
router.get("/movies", MovieController.list);
//create (protected route)
router.post("/movies", isAuthenticated, MovieController.create);
//read
router.get("/movies/:id", MovieController.read);
//update(protected route)
router.put("/movies/:id", isAuthenticated, MovieController.update);
//delete(protected route)
router.delete("/movies/:id", isAuthenticated, MovieController.delete);

module.exports = router;
