const express = require('express');
const expressHandlebars = require('express-handlebars');
const logger = require('morgan');
const debug = require('debug')('meadowlark');
const handlers = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3e3;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));

app.get('/', handlers.home);
app.get('/about', handlers.about);

app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.server = app.listen(port, () => {
    debug(`Start: ${new Date()}`);
    debug(`Listening on port: ${port}`);
  });
} else {
  module.exports = app;
}
