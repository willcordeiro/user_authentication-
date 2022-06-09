exports.login = async (req, res) => {
  const mysql = require("mysql");
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");
  const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.json({
      status: "error",
      error: "Please Enter your email and password",
    });
  else {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) throw error;
        if (
          !results.length ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          console.log("email or password incorrect");
          res.redirect("/login");
        } else {
          const token = jwt.sign(
            { id: results[0].id },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          );
          const cookieOptions = {
            expiresIn: new Date(
              Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("userRegistered", token, cookieOptions);
          res.redirect("/");
          return res.json(console.log("User has been logged in"));
        }
      }
    );
  }
};
