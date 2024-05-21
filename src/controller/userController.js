const profileView = (req, res) => {
    res.render("profile", { username: req.session.user.username});
}

module.exports = {
    profileView
}