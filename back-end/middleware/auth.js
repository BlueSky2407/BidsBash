const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.jwt_token);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};
