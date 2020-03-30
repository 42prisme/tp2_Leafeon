const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Listservice = require("./services/ListeCourse");

const app = express();
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()); // application/json
app.use(cors());
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//db postgre
const connectionString = "postgres://api:pswd@172.17.0.2/DB";
const db = new pg.Pool({connectionString: connectionString});
const ListService = new Listservice(db);
require('./api/ListeCourse')(app, ListService)
require('./datamodel/seeder')(ListService)
    .then(app.listen(3333))