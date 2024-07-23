const homeView = (req, res) => {
    res.status(200).render('home', {username: req.session.user.username})
}

module.exports = {
    homeView
}