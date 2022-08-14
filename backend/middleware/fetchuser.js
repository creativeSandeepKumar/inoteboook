// to verify token coming for jwt with database secret
// if token verified with jwt and jwt_secret then send user data else show errors

const jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagood$oy";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticating using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticating using a valid token" });
  }
};

module.exports = fetchuser;
