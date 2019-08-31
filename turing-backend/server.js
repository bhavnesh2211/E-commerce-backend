const express = require ( "express" );

const jwt = require ( "jsonwebtoken");

const bodyParser = require ( "body-parser" );

const mysql = require ( "mysql" );

const dotenv = require ("dotenv").config()

const app = express();

app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded ({ extended : true }));

const knex = require ( "knex" ) ({
    client : "mysql" ,
    connection : {
        host : process.env.DB_HOST , 
        user : process.env.DB_USER ,
        password : process.env.DB_PASSWORD ,
        database : process.env.DB_DATABASE
    }
}); 

// console.log (process.env.DB_HOST)

// console.log ("Hello!")

var department = express.Router();
app.use ( "/departments" , department );
require ( "./turing_files/department" )( department , knex );


var category = express.Router();
app.use ( "/categories" , category );
require ( "./turing_files/category" )( category , knex );

var attribute = express.Router();
app.use ( "/attributes" , attribute );
require ( "./turing_files/attribute" )( attribute , knex );

var product  = express.Router();
app.use ( "/products" , product );
require ( "./turing_files/product" )(product , knex);

var customer = express.Router();
app.use ( "/customers" , customer );
require ( "./turing_files/customer" ) (customer , knex , jwt );

var order = express.Router();
app.use ( "/orders" , order );
require ( "./turing_files/order" ) ( order , knex );

var shopping_cart = express.Router();
app.use ( "/shopping_cart" ,shopping_cart);
require ( "./turing_files/shoppingCart" ) ( shopping_cart , knex );

var tax = express.Router();
app.use ( "/tax" , tax );
require ( "./turing_files/tax" ) ( tax , knex );

var shipping = express.Router();
app.use ( "/shipping" , shipping );
require ( "./turing_files/shipping" ) ( shipping , knex );

app.listen ( process.env.PORT , () => {
    
    console.log("Working");
    
});
