const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
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
app.use(cookieParser()); //auth

//db postgre
const connectionString = "postgres://user1:pswd@172.17.0.2/DB";
const db = new pg.Pool({connectionString: connectionString});
const ListService = new listService(db);
const itemService = new Item(db);
const UserService = new User(db);
const jwt = require('./jwt')(UserService)
require('./api/Item')(app, ListService, itemService, jwt);
require('./api/ListeCourse')(app, ListService, itemService, jwt);
require('./api/User')(app, UserService, jwt);
require('./datamodel/seeder')(ListService, itemService, UserService)
    .then(app.listen(3333))