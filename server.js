const express = require("express");
const app = new express();
const port = 8080;
const db = require("./models");
const bodyParser = require("body-parser");
const logger = require("morgan");
const sqlPort = 3307;
const expressSession = require("express-session");

app.use(expressSession({secret: 'Chris Loves Kinsta'}))
global.loggedIn = null;
app.use("*", (request, response, next) => {
    loggedIn = request.session.userId;
    next();
});

app.use(express.static("public"));
app.listen(process.env.PORT || port, () => {
    console.log(`Serving photo app on port ${port}`);
});
app.use(bodyParser.json());
app.use(logger("dev"));
// set the view engine to ejs
app.set("view engine", "ejs");


//db
db.sequelize
    .sync({})
    .then(() => {
        app.listen(sqlPort, () => {
            console.log(
                `MariaDB Connection has been established successfully to sqlPort ${sqlPort}.`
            );
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

const PhotosRouter = require('./routes/PhotosRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const UsersRouter = require('./routes/UsersRouter')
const PageRouter = require('./routes/PageRouter')
app.use("/images", PhotosRouter);
app.use("/comments", CommentsRouter);
app.use("/users", UsersRouter);
app.use('/', PageRouter)