const jwt = require("jsonwebtoken");

async function authVerify(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({ message: "Access Denied", status: "error" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(404).send({ message: "Invalid token", status: "error" });
  }
}
module.exports.authVerify = authVerify;
