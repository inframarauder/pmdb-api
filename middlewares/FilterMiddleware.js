exports.filterMovies = (req, res, next) => {
  let { search, year } = req.query;
  res.locals.query = {};
  if (year) res.locals.query["year"] = year;
  if (search) {
    //partial text search to be done on name
    let regexQuery = { $regex: search, $options: "i" };
    res.locals.query["$or"] = [{ name: regexQuery }];
  }

  next();
};
