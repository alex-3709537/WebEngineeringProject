//const sqlHandler = require("../model/sqlHandler");
const path = require("path");
const {getUser,
    setUser
} = require("../model/azureSqlHandler");


const loginUser = async (req, res) => {
    // check in datenbank ob user und password stimmen

    const {username, password} = req.body
    const user = await getUser(req.body.username);
    
    if(user.length > 0 && user[0].username == username && user[0].password == password){
        
        var newUser = { username: username , password : password};
        req.session.user =   newUser// credentails im cookie speichern

        console.log(req.session.user);
        res.redirect("home");  
    }else{
        res.render("login", {error: "Falsche Daten"})
    }
   
}

const registerView = (req, res) => {
    res.render("register");
}

const registerUser = async (req, res) => {
    
    const user = await getUser(req.body.username);

    // check if user already exist
    if(user.length == 0){
        setUser(req.body.username, req.body.password);
        req.session.user = { username: req.body.username , password : req.body.password};  // credentails im cookie speichern
        res.redirect("register/success");
        
    }else{
        res.render("register",{error: "Der Benutzername ist bereits vergeben!"});        
    }
 
} 

const loginView = (req, res) => {
    res.render("login");

}

const homeView = (req, res) => {
    res.render('home', {username: req.session.user.username})
}

const checkSignedIn = (req, res, next) => {
    
    if(req.session.user){
        next();     //If session exists, proceed to page
     } else {
        res.redirect("login");
     }
}

const registrationSuccessView = (req, res) => {
    res.render("registrationSuccess");
}

module.exports = {
    registerView,
    registerUser,
    loginUser,
    loginView,
    homeView,
    checkSignedIn,
    registrationSuccessView
}