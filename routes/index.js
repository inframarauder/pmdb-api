const router = require("express").Router();
//require middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");

//require controllers
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");

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

//review routes
//list
router.get("/reviews", ReviewController.list);

//create
router.post(
  "/reviews",
  AuthMiddleware.isAuthenticated,
  ReviewController.create
);

//read
router.get("/reviews/:id", ReviewController.read);

//update
router.put(
  "/reviews/:id",
  AuthMiddleware.isAuthenticated,
  ReviewController.update
);

//delete
router.delete(
  "/reviews/:id",
  AuthMiddleware.isAuthenticated,
  ReviewController.delete
);

module.exports = router;
