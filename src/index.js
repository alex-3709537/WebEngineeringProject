const express = require("express");

const app = express();
const port = 8080;

const login = require("./routes/login");
const user = require("./routes/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { checkSignedIn } = require("./controller/loginController");
const { pageNotFound } = require("./controller/errorController");



app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
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

app.use(pageNotFound);
/*
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.listen(port, () => {
    console.log("app listen on port", port);
})
