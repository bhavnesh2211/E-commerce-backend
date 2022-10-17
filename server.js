require('dotenv').config();
const express = require ( "express" );
const jwt = require ( "jsonwebtoken");
const bodyParser = require ( "body-parser" );
const mysql = require ( "mysql" );

const app = express();

app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded ({ extended : true }));

const knex = require ( "knex" ) ({
    client : "mysql" ,
    connection : {
        host: process.env.DB_HOST, 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}); 

const department = express.Router();
app.use ( "/departments" , department );
require ( "./turing_files/department" )( department , knex );


const category = express.Router();
app.use ( "/categories" , category );
require ( "./turing_files/category" )( category , knex );

const attribute = express.Router();
app.use ( "/attributes" , attribute );
require ( "./turing_files/attribute" )( attribute , knex );

const product  = express.Router();
app.use ( "/products" , product );
require ( "./turing_files/product" )(product , knex);

const customer = express.Router();
app.use ( "/customers" , customer );
require ( "./turing_files/customer" ) (customer , knex , jwt );

const order = express.Router();
app.use ( "/orders" , order );
require ( "./turing_files/order" ) ( order , knex );

const shopping_cart = express.Router();
app.use ( "/shopping_cart" ,shopping_cart);
require ( "./turing_files/shoppingCart" ) ( shopping_cart , knex );

const tax = express.Router();
app.use ( "/tax" , tax );
require ( "./turing_files/tax" ) ( tax , knex );

const shipping = express.Router();
app.use ( "/shipping" , shipping );
require ( "./turing_files/shipping" ) ( shipping , knex );

app.listen ( 5000 , () => {
    console.log("Working");
});
