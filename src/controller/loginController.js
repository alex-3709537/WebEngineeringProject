//const sqlHandler = require("../model/sqlHandler");
const path = require("path");
const {getUser,
    setUser
} = require("../model/mysqlHandler");
const { log } = require("console");

/**
 * prüft ob die Login Daten aus dem Formular stimmen und speicher sie ggf. in einen Cookie
 */
const loginUser = async (req, res) => {
    // check in datenbank ob user und password stimmen

    const {username, password} = req.body
    
    const result = await getUser(req.body.username);
    
    if(!(result instanceof Error) && Object.keys(result).length > 0 && result.username == username && result.password == password){
        
        req.session.user = { 
            username: req.body.username, 
            password : req.body.password,
            uid: result.uid
        };  // credentails im cookie speichern

        res.status(301).redirect("home");  
    }else{
        res.status(401).render("login", {error: "Anmeldung Fehlgeschlagen"})
    }
   
}

/**
 * Rendert das Registrier Formular
 */
const registerView = (req, res) => {
    res.status(200).render("register");
}

/**
 * Legt einen neuen Nutzer an
 */
const registerUser = async (req, res) => {
    
    const result = await getUser(req.body.username);

    if(result instanceof Error){
        res.status(401).render("register",{error: "Etwas ist schief gelaufen..."});   
    }else if(Object.keys(result).length != 0){
        res.status(401).render("register",{error: "Der Benutzername ist bereits vergeben!"});   
    }else if(req.body.password.length < 4){
        res.status(401).render("register",{error: "Das Passwort muss mindestens 4 Zeichen lang sein!"});   
    }else{
        await setUser(req.body.username, req.body.password);
        const user = await getUser(req.body.username);
        
        req.session.user = { 
            username: req.body.username, 
            password : req.body.password,
            uid: user.uid
        };  // credentails im cookie speichern
        res.status(200).redirect("register/success");
    }
 
} 

const loginView = (req, res) => {
    res.status(200).render("login");

}

/**
 * Prüft ob der Nutzer bereits angemeldet ist (schaut im cookie nach)
 */
const checkSignedIn = (req, res, next) => {
    
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        res.status(301).redirect("/blog/login");
    }
}

/**
 * Logt den user aus
 */
const logOut = (req, res) => {
    req.session.destroy();
    res.status(200).redirect("/blog/login");
}

/**
 * Lädt die Oberfläche nach erfogreicher Registrierung
 */
const registrationSuccessView = (req, res) => {
    res.status(400).render("registrationSuccess");
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