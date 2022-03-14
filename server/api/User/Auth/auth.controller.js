const db = require("../../../models");
const l = require("./../../../common/logger");
const config = require("../../../config/auth.config");
const User = db.user;
const Role = db.role;
let debug = true;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  if (debug) {
    console.log("SIGNUP")
    //console.log(bcrypt.hashSync(req.body.pswd, 8))
  }
  await User.create({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    artist_name: req.body.artist_name,
    phone: req.body.phone,
    email: req.body.email,
    pswd: req.body.pswd,
    postalCode: req.body.postalCode,
    street: req.body.street,
    locality: req.body.locality,
    country: req.body.country,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(201).send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(201).send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log("SIGNIN")
  User.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, {email: req.body.username},  {phone: req.body.username}]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.pswd,
        user.pswd
      );
      console.log("*/************* FIND user ************/")
      console.log(user)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        var token = jwt.sign({ id: user.id, roles: authorities }, config.secret, {
          expiresIn: "5m" // 24 hours
        });
        user.update({ jwt: String(token) });
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
