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

// Handlebars helpers
const helpers = require('./utils/helpers');

// Initializing
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Rendering help
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Cookie options
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 1000 * 60 * 60, // Expires in 1 hour
    },
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
    