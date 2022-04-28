const express = require('express');
const app = express();

//#region +- Set Express Handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//#endregion

//#region +- Express Session Setup
const expressSession = require('express-session');
const connectSessionSequelize = require('connect-session-sequelize');
const sequelizeStore = connectSessionSequelize(expressSession.Store);
const sequelize = require('./config/connection');
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({ db: sequelize })
};
//#endregion

//#region +- Middleware - Session
app.use(expressSession(session));
//#endregion

//#region +- Middleware - Static
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//#endregion
//#region +- Middleware - Handle Request Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion

//#region +- Controllers
const routes = require('./controllers');
app.use(routes);
//#endregion

//#region +- Connection to DB and Server

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
//#endregion