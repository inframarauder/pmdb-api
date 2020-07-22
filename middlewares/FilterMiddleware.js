exports.filterMovies = (req, res, next) => {
  let { search } = req.query;
  res.locals.query = {};
  if (search) {
    //partial text search to be done on name,genre,year,directors,starring
    let regexQuery = { $regex: search, $options: "i" };
    res.locals.query["$or"] = [
      { name: regexQuery },
      { genres: regexQuery },
      { year: regexQuery },
      { directors: regexQuery },
      { starring: regexQuery },
    ];
  }

  next();
};
