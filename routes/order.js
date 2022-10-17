module.exports = ( order , knex ) => {

    order.post ("/" , ( req , res ) => {

        let cart_id = req.body.cart_id;
        let shipping_id = req.body.shipping_id;
        let tax_id = req.body.tax_id;
        // let customer_id = req.body.customer_id

        knex.insert ({
            // "cart_id" : cart_id , 
            "shipping_id" : shipping_id ,
            "tax_id" : tax_id,
            "created_on" : new Date()
        }).into ( "orders" ).then (( data ) => {

            console.log ( "Inserted" )
            knex.select ( "order_id" ).from ( "orders" ).then (( orderData ) => {

                res.send (orderData);

            }).then (( err ) => {

                console.log ( err );

            });

        }).catch (( err ) => {

            console.log  ( err )
        });
    });


    order.get ( "/:order_id" , ( req , res ) => {

        let order_id = req.params.order_id;

        knex.select ( "item_id" , "s.product_id" , "attributes" , "product.name as product_name" , "quantity" , "product.price as unit_cost") 

        .from ( "shopping_cart as s")

        .join ( "product" , "product.product_id" , "s.product_id")

        .where ( "order_id" , order_id )
 
        .then (( data ) => {

            // console.log ( data )
            knex( "order_detail" ).insert ({ 

                "item_id" : data[0]["item_id"],
                "product_id" : data[0]["product_id"],
                "attributes" : data[0]["attributes"],
                "product_name" : data[0]["product_name"],
                "quantity" : data[0]["quantity"],
                "unit_cost" : data[0]["unit_cost"]
            }).then (( order_details) => {

                res.send ("ok")
                console.log ( "Insrted!" );
                order_details[0]["subtotal"] = order_details[0]["price"] * order_details[0]["quantity"]
                res.send (order_details)
            })
        }) 
    })
}