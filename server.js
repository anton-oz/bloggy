// Required packages
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Routes
const routes = require('./controllers');

// Sequelize stuff
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

// Cookie options
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

// Use controller routes
app.use(routes);

// Sync with db and listen on specified port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`listening @ http://localhost:${PORT} !`));
});
    