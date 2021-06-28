const jwt = require("jsonwebtoken");
const users = require("../usecases/users");

function hasToken(req, res, next) {
  try {
    const { Authorization: token } = req.headers;
    const validateToken = jwt.verify(token);
    if (!validateToken) {
      throw new Error("Not authorized");
    }
    next();
  } catch (err) {
    res.status(401);
    res.json({
      success: false,
      message: "Not authorized",
      error: err.message,
    });
  }
}

function hasRole(allowedRoles) {
  return async (req, res, next) => {
    try {
      const { Authorization : token } = req.headers;

      const validateToken = jwt.verify(token);
      if (!validateToken) {
        throw new Error("Not authorized");
      }

      const userFound = await users.getById(validToken.id);
      const userRoles = userFound.role || [];

      const allowedRole = userRoles.find((userRole) => {
        return allowedRoles.find((allowedRole) => userRole === allowedRole);
      });

      if (!allowedRole) {
        throw new Error("Not permited");
      }

      next();
    } catch (err) {
      res.status(401);
      res.json({
        success: false,
        message: "Not authorized",
        error: err.message,
      });
    }
  };
}




module.exports = {
	hasToken,
	hasRole
}
