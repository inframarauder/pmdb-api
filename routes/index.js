const router = require("express").Router();
//require middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const FilterMiddleware = require("../middlewares/FilterMiddleware");

//require controllers
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");

//auth routes
router.post("/auth/login", AuthController.login);
router.post("/auth/signup", AuthController.signup);
router.post("/auth/refresh_token", AuthController.refreshToken);
router.delete("/auth/logout", AuthController.logout);

//user routes
router.get("/user/:id", AuthMiddleware.isAuthenticated, UserController.read);
router.put("/user/:id", AuthMiddleware.isAuthenticated, UserController.update);

//movie routes
//list
router.get("/movies", FilterMiddleware.filterMovies, MovieController.list);

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
