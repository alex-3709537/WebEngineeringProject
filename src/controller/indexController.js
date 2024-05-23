const homeView = (req, res) => {
    res.render('home', {username: req.session.user.username})
}

module.exports = {
    homeView
}