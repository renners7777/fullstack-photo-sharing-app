const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const saltRounds = 10;

UsersRouter.route("/login").post(async (request, response) => {
    // username and password are required
    console.log(request.body)
    const username = request.body.username;
    const password = request.body.password;
    db.user
        .findOne({ where: { username: username } })
        .then(async (user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        console.log("logged in, user id =", user.id)
                        request.session.userID = user.id;
                        response.redirect("/");
                    } else {
                        response.redirect("/login");
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error);
            response.send(error);
        });
});


UsersRouter.route('/signUp')
    .post(async (request, response) => {
        // email, password, username
        const email = request.body.email
        const password = request.body.password
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const username = request.body.username

        db.user.create({ email: email[0], password: encryptedPassword, username: username }).then(user => {
            //   response.send(user)
            response.redirect('/login');
        }).catch(err => {
            err
        })
    })

module.exports = UsersRouter;