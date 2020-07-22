const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.userValidator = (user) => {
  const schema = {
    username: Joi.string().required().min(1),
    password: Joi.string().required().min(6),
  };

  return Joi.validate(user, schema);
};

exports.reviewValidator = (review) => {
  const schema = {
    content: Joi.string().min(10).max(1000).required(),
    rating: Joi.number().required().min(0).max(10),
    movie: Joi.objectId().required(),
  };

  return Joi.validate(review, schema);
};
