exports.filterMovies = (req, res, next) => {
  let { search, genre, year } = req.query;
  res.locals.query = {};
  if (genre) res.locals.query["$text"] = { $search: genre };
  if (year) res.locals.query["year"] = year;
  if (search) {
    //partial text search to be done on name,directedBy,cast

    let regexQuery = { $regex: search, $options: "i" };
    res.locals.query["$or"] = [
      { name: regexQuery },
      { directedBy: regexQuery },
      { cast: regexQuery },
    ];
  }

  next();
};
