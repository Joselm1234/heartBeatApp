
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const app = express();
// Initialize Firebase






// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index.routes'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;