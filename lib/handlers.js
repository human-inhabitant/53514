const fortune = require('./fortune');

function home(req, res) {
  res.render('home');
}
function about(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
}
function headers(req, res) {
  res.type('text/plain');
  const headerItems = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`);
  res.send(headerItems.join('\n'));
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
  home, about, headers, notFound, serverError
};
