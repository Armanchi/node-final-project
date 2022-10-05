const User = require("../models/User");
const bcrypt = require("bcryptjs");

const render_index = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/index", { messages });
};
const render_restricted = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/restricted", { messages });
}
const render_sign_up = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/sign-up-form", { messages });
};

const sign_up = async (req, res) => {
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  res.redirect("/");
};
//render games form

const render_games = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/games", { messages });
}



const log_out = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  render_index,
  render_sign_up,
  sign_up,
  render_games,
  render_restricted,
  log_out,
};