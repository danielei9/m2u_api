/*const db = require("../models");
const config = require("../config/auth.config");
const Role = db.role;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
*/
import bcrypt from 'bcryptjs';
import * as User from '../../../common/db/models/usuario.js'
import * as Role from '../../../common/db/models/role.model.js'
import * as Sequelize from 'sequelize';
const Op = Sequelize.Op;

export class Controller {
    async signup(req, res) {
        console.log("SIGNUP")
        console.log(req.body)
        // Save User to Database
        //await Sequelize.sequelize.sync();
        const user = new User()

        const jane = await User.create({
            username: req.body.username,
            email: req.body.email,
            pswd: bcrypt.hashSync(req.body.pswd, 8)
        })

            .then(user => {console.log(user)
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User was registered successfully!" });
                        });
                    });
                } else {
                    // user role = 1
                    user.setRoles([1]).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        //console.log(jane)
    };

signin(req, res) {
    console.log("SIGNIN")
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
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
}
export default new Controller();
