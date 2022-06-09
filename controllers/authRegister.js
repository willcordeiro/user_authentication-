const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],

    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render(
          "register",
          console.log("That email is already in use")
        );
      } else if (password !== passwordConfirm) {
        return res.render("register", console.log("The password do not match"));
      }

      let hashedpassword = await bcrypt.hash(password, 8);
      console.log(hashedpassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedpassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else if (results) {
            return res.render("login", console.log("User registered"));
          } else {
            return res.render(
              "register",
              console.log("This user already exist")
            );
          }
        }
      );
    }
  );
};
