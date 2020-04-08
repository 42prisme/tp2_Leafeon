const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const listService = require("./services/ListeCourse");
const Item = require("./services/item");
const User = require("./services/User")

const app = express();
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()); // application/json
app.use(cors());
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//db postgre
const connectionString = "postgres://api:pswd@172.17.0.2/DB";
const db = new pg.Pool({connectionString: connectionString});
const ListService = new listService(db);
const itemService = new Item(db);
const UserService = new User(db);
require('./api/Item')(app, itemService);
require('./api/ListeCourse')(app, ListService);
require('./api/User')(app, UserService);
require('./datamodel/seeder')(ListService, itemService, UserService)
    .then(app.listen(3333))