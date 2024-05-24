//const sqlHandler = require("../model/sqlHandler");
const path = require("path");
const {getUser,
    setUser
} = require("../model/azureSqlHandler");
const { log } = require("console");

/**
 * prüft ob die Login Daten aus dem Formular stimmen und speicher sie ggf. in einen Cookie
 */
const loginUser = async (req, res) => {
    // check in datenbank ob user und password stimmen

    const {username, password} = req.body
    
    const result = await getUser(req.body.username);
    
    
    if(!(result instanceof Error) && Object.keys(result).length > 0 && result.username == username && result.password == password){
        
        var newUser = { username: username , password : password};
        req.session.user = newUser;// credentails im cookie speichern

        res.redirect("home");  
    }else{
        res.render("login", {error: "Anmeldung Fehlgeschlagen"})
    }
   
}

/**
 * Rendert das Registrier Formular
 */
const registerView = (req, res) => {
    res.render("register");
}

/**
 * Legt einen neuen Nutzer an
 */
const registerUser = async (req, res) => {
    
    const result = await getUser(req.body.username);

    if(result instanceof Error){
        res.render("register",{error: "Etwas ist schief gelaufen..."});   
    }else if(Object.keys(result).length != 0){
        res.render("register",{error: "Der Benutzername ist bereits vergeben!"});   
    }else{
        setUser(req.body.username, req.body.password);
        req.session.user = { username: req.body.username , password : req.body.password};  // credentails im cookie speichern
        res.redirect("register/success");
    }
 
} 

const loginView = (req, res) => {
    res.render("login");

}

/**
 * Prüft ob der Nutzer bereits angemeldet ist (schaut im cookie nach)
 */
const checkSignedIn = (req, res, next) => {
    
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        res.redirect("/blog/login");
    }
}

/**
 * Logt den user aus
 */
const logOut = (req, res) => {
    req.session.destroy();
    res.redirect("/blog/login");
}

/**
 * Lädt die Oberfläche nach erfogreicher Registrierung
 */
const registrationSuccessView = (req, res) => {
    res.render("registrationSuccess");
}

module.exports = {
    registerView,
    registerUser,
    loginUser,
    loginView,
    checkSignedIn,
    registrationSuccessView,
    logOut
}