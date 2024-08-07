const express = require("express");

const app = express();
const port = 8080;

const login = require("./routes/login");
const user = require("./routes/user");
const index = require("./routes/index");
const post = require("./routes/post");
const autoFetch = require("./routes/autoFetch");
const friendController = require("./controller/friendController");
const friendRoutes = require("./routes/friend");

const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { checkSignedIn } = require("./controller/loginController");
const { pageNotFound } = require("./controller/errorController");



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000     // 30 Tage
    },
    resave: false
})); // Hier wird cookie gesetzt

// support req objects
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended : true })); // to support URL-encoded bodies


app.use("/blog", login);
app.use("/blog/user", checkSignedIn, user);
app.use("/blog/home", checkSignedIn, index);
app.use("/blog/post", checkSignedIn, post);
app.use("/blog/", checkSignedIn, autoFetch);
app.use("/blog", friendController)
app.use("/blog/friends", checkSignedIn, friendRoutes);



app.use(pageNotFound);


app.listen(port, () => {
    console.log("app listen on port", port);
})


