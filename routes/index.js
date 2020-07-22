const router = require("express").Router();
//require middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const FilterMiddleware = require("../middlewares/FilterMiddleware");
const ValidationMiddleware = require("../middlewares/ValidationMiddleware");

//require controllers
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");

//auth routes
router.post("/auth/login", AuthController.login);
router.post(
  "/auth/signup",
  ValidationMiddleware.validate,
  AuthController.signup
);
router.post("/auth/refresh_token", AuthController.refreshToken);
router.delete("/auth/logout", AuthController.logout);

//user routes
router.get("/users/:id", AuthMiddleware.isAuthenticated, UserController.read);

//movie routes
//list
router.get("/movies", FilterMiddleware.filterMovies, MovieController.list);
//read
router.get("/movies/:id", MovieController.read);
//avg rating:
router.get("/movies/:id/avg_rating", MovieController.avgRating);

//review routes
//list
router.get("/reviews", ReviewController.list);

//create
router.post(
  "/reviews",
  AuthMiddleware.isAuthenticated,
  ValidationMiddleware.validate,
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
