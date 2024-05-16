const express = require("express");
//const http = require("http");
//const SQLHandler = require("./model/sqlHandler");
const app = express();
const port = 4000;
//const mysql = require("mysql");
const login = require("./routes/login");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");



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
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use("/blog", login);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.listen(port, () => {
    console.log("app listen on port", port);
})
/*
async function foo(){
    const user = await getUser("alex");
console.log(user);
}
foo();
*/