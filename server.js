const express = require('express');
const app = express();

//#region +- Set Express Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//#endregion

//#region +- Middleware
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion

//#region +- Controllers
const routes = require('./controllers');
app.use(routes);
//#endregion

//#region +- Connection to DB and Server
const sequelize = require('./config/connection');
sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
//#endregion