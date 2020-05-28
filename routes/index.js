const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

//auth routes
router.post("/auth/login", AuthController.login);
router.post("/auth/signup", AuthController.signup);
router.post("/auth/refresh_token", AuthController.refreshToken);

//user routes
router.get("/user/:id", isAuthenticated, UserController.readUser);

//movie routes
//list
router.get("/movies", MovieController.list);

//create (protected route)
router.post(
  "/movies",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  MovieController.create
);
//read
router.get("/movies/:id", MovieController.read);

//update(protected route)
router.put(
  "/movies/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  MovieController.update
);

//delete(protected route)
router.delete(
  "/movies/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  MovieController.delete
);

module.exports = router;
