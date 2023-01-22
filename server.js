//imports
const express = require("express");
const db = require("./models"); //this line
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// server start
const port = 8080;
const sqlPort = 3307;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

//routes

//db
db.sequelize
    .sync({})
    .then(() => {
        app.listen(sqlPort, () => {
            console.log(
                `MariaDB Connection has been established successfully to http://localhost:${sqlPort}.`
            );
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

// set the view engine to ejs
app.set("view engine", "ejs");
// serve static files from public
app.use(express.static('public'))
// use res.render to load up an ejs template
app.get("/", (req, res) => {
    res.render("index");
});

//server.js
const PhotosRouter = require('./routes/PhotosRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const UsersRouter = require('./routes/UsersRouter')
app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)