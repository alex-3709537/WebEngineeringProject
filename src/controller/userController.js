const { getUserByUID } = require("../model/mysqlHandler");

const profileView = (req, res) => {
    res.status(200).render("profile", { username: req.session.user.username});
}

/**
 * Damit können die Userdaten von der Client Seite aus gefetcht werden
 */
const userInfo = (req, res) => {
    res.status(200).json({username: req.session.user.username, uid: req.session.user.uid});
}

const userInfoByUID = async (req, res) => {
    const result = await getUserByUID(req.query.uid);
    res.status(200).json({username: result.username, uid: result.uid});
}

module.exports = {
    profileView,
    userInfo,
    userInfoByUID
}