const profileView = (req, res) => {
    res.render("profile", { username: req.session.user.username});
}

/**
 * Damit können die Userdaten von der Client Seite aus gefetcht werden
 */
const userInfo = (req, res) => {
    res.json({username: req.session.user.username, uid: req.session.user.uid});
}
module.exports = {
    profileView,
    userInfo
}