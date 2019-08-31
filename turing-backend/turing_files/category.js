// const express = require ( "express" );
module.exports = ( category , knex )  => {

    category.get ("/" , ( req , res ) => {

        knex.select().from ("category").then (( data ) => {

            res.send (data);
            // console.log (data)
        }).catch ((err) => {

            console.log (err)
        });
    });
    
    
    category.get ("/:category_id" , ( req ,res) => {

        let category_id = req.params.category_id;

        // console.log (id)
        knex.select().from ("category").where( "category_id" , category_id ).then ((data) => {

            res.send (data)

        }).catch ((err) => {

            console.log (err)
        });
    });

    category.get ("/inProduct/:product_id" , ( req , res ) => {

        let product_id = req.params.product_id; 

        knex.select ( "category.category_id","department_id", "name" ).from ("category")

        .join ( "product_category" , "product_category.category_id" , "category.category_id" )

        .where ( "product_id" , product_id ).then ((data) => {

            res.send (data)

        }).catch ((err) => {

            console.log (err)
        });
    });
    
    
    category.get ("/inDepartment/:department_id" , ( req , res ) => {

        let department_id = req.params.department_id;

        knex.select ().from ("category")

        .where ("department_id" , department_id).then ((data) => {

            res.send (data)
        }).catch ((err) => {

            console.log (err)
        })
    })
    
}


