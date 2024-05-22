
const pageNotFound = (req, res, next) => {
    res.status(404).render('pageNotFound');
}

module.exports = {
    pageNotFound
}