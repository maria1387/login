const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//signup
const crearregistros = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    await pool.query(` INSERT INTO users( email, password) VALUES ($1, $2)`, [
      email,
      hashedPassword,
    ]);

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
};
// login
const acceso = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "User does not exist!" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users.rows[0].email, token })
      ;
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  crearregistros,
  acceso,
};
