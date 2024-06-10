// Required Packages
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Routes
const routes = require('./controllers');

// Sequelize Stuff
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initializing
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Rendering help
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`listening @ http://localhost:${PORT} !`)
});