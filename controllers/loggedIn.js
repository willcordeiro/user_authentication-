const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const loggedIn = (req, res, next) => {
  if (!req.cookies.userRegistered) return next();
  try {
    const decoded = jwt.verify(
      req.cookies.userRegistered,
      process.env.JWT_SECRET
    );
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
      (err, result) => {
        if (err) return next();
        req.user = result[0];
        return next();
      }
    );
  } catch (err) {
    if (err) return next();
  }
};
module.exports = loggedIn;
