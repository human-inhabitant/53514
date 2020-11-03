const fortune = require('./fortune');

exports.api = {};

exports.home = (req, res) => {
  res.render('home');
};
exports.about = (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
};
exports.newsletterSignup = (req, res) => {
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};

exports.api.newsletterSignup = (req, res) => {
  /* eslint-disable no-console */
  console.log(`CSRF token (from hidden form field): ${req.body._csrf}`);
  console.log(`Name (from visible form field): ${req.body.name}`);
  console.log(`Email (from visible form field): ${req.body.email}`);
  /* eslint-enable no-console */
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupProcess = (req, res) => {
  /* eslint-disable no-console */
  console.log(`CSRF token (from hidden form field): ${req.body._csrf}`);
  console.log(`Name (from visible form field): ${req.body.name}`);
  console.log(`Email (from visible form field): ${req.body.email}`);
  /* eslint-enable no-console */
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you');
};

exports.newsletter = (req, res) => {
  res.render('newsletter', { csrf: 'CSRF token goes here' });
};

exports.vacationPhotoContest = (req, res) => {
  const now = new Date();
  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
};
exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date();
  res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() });
};

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  /* eslint-disable no-console */
  console.log('field data: ', fields);
  console.log('files: ', files);
  /* eslint-enable no-console */
  res.redirect(303, '/contest/vacation-photo-thank-you');
};
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
  res.redirect(303, '/contest/vacation-photo-error');
};
exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you');
};
exports.api.vacationPhotoContest = (req, res, fields, files) => {
  /* eslint-disable no-console */
  console.log('field data: ', fields);
  console.log('files: ', files);
  /* eslint-enable no-console */
  res.send({ result: 'success' });
};
exports.api.vacationPhotoContestError = (req, res, message) => {
  res.send({ result: 'error', error: message });
};

exports.notFound = (req, res) => {
  res.render('404');
};
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
/* eslint-enable no-unused-vars */
  res.render('500');
};
