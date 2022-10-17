module.exports = ( tax , knex ) => {

    tax.get ( "/" , ( req ,res ) => {

        knex.select ().from ( "tax" ).then (( data ) => {

            res.send ( data );

        }).catch (( err ) => {

            console.log ( err )
            res.send ( "There is some errors!" )
        });
    });

    tax.get ( "/:tax_id" , ( req , res ) => {

        let tax_id = req.params.tax_id;

        knex.select ().from ( "tax" ).where ( "tax_id" ,tax_id )

        .then (( data ) => {

            res.send ( data );
        }).catch (( err ) => {

            console.log ( err )
            res.send ( "There is some errors!" )
        });
    });
}