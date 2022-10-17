module.exports  = ( attribute , knex ) => {
    attribute.get ( "/" , (req , res ) => {
        knex.select().from ( "attribute" ).then (( data ) => {
            res.send (data);
        }).catch ((err) => {
            console.log (err);
        });
    });

    attribute.get ("/:attribute_id" , ( req , res ) => {
        let attribute_id = req.params.attribute_id;
        knex.select().from ( "attribute" ).where ("attribute_id" , attribute_id ).then (( data ) => {
            res.send (data);
        }).catch ((err) => {
            console.log (err);
        });
    });

    attribute.get ("/values/:attribute_id" , ( req , res ) => {
        let attribute_id = req.params.attribute_id;
        knex.select( "attribute_value_id" , "value" ).from ( "attribute_value" )
        .where ( "attribute_id" , attribute_id ).then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            console.log (err);
        });
    });

    attribute.get ( "/inProduct/:product_id" , (req ,res ) => {
        let product_id = req.params.product_id;
        knex.select ("name as attribute_name" , "attribute_value.attribute_value_id" , "value as attribute_value").from ("attribute")
        .join ("attribute_value" , "attribute_value. attribute_id" , "attribute.attribute_id")
        .join ( "product_attribute" , 'product_attribute.attribute_value_id' , "attribute_value.attribute_value_id" )
        .where( "product_id" , product_id).then (( data ) => {
            res.send (data);
        }).catch ((err) => {
            console.log (err)
        });
    });
};