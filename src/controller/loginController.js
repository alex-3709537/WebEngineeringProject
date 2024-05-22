//const sqlHandler = require("../model/sqlHandler");
const path = require("path");
const {getUser,
    setUser
} = require("../model/azureSqlHandler");


const loginUser = async (req, res) => {
    // check in datenbank ob user und password stimmen

    const {username, password} = req.body
    
    const result = await getUser(req.body.username);
    
    
    if(result != "error" && Object.keys(result).length > 0 && result.username == username && result.password == password){
        
        var newUser = { username: username , password : password};
        req.session.user = newUser;// credentails im cookie speichern

        res.redirect("home");  
    }else{
        res.render("login", {error: "Anmeldung Fehlgeschlagen"})
    }
   
}

const registerView = (req, res) => {
    res.render("register");
}

const registerUser = async (req, res) => {
    
    const result = await getUser(req.body.username);

    // check if user already exist
    if(result != "error" && Object.keys(result).length == 0){
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
        res.redirect("/blog/login");
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