const fortune = require('./fortune');

function home(req, res) {
  res.render('home');
}
function about(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
}
function notFound(req, res) {
  res.render('404');
}
/* eslint-disable no-unused-vars */
function serverError(err, req, res, next) {
/* eslint-enable no-unused-vars */
  res.render('500');
}

module.exports = {
  home, about, notFound, serverError
};
