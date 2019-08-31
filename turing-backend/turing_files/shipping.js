module.exports = ( shipping , knex) => {
 
    shipping.get ( "/regions" , ( req , res ) => {

        knex.select().from ( "shipping_region" ).then (( data ) => {

            res.send ( data );
        }).catch (( err ) => {

            console.log ( err );
            res.send ( "There is an error!" );
        });
    });

    shipping.get ( "/regions/:shipping_region_id" , ( req , res ) => {

        let shipping_region_id = req.params.shipping_region_id

        knex.select().from ( "shipping_region").where ( "shipping_region_id" , shipping_region_id )

        .then (( data ) => {

            res.send ( data ); 
        }).catch (( err) => {

            console.log ( err );
            res.send ( "There is some errors!" );
        });
    });

};