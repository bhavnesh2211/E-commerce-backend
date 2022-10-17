module.exports = ( product , knex ) => {

    product.get ("/" , ( req , res ) => {

        knex.select().from ( "product" ).then (( data ) => {

            res.send ( data );

        }).catch (( err ) => {

            console.log  ( err ) ;
        });
    });

    product.get ( "/search" , ( req , res )  => {

        let search = req.query.string;

        knex.select ().from ( "product" ).where ( "name" , "like" , "%"+search+"%")

        .then (( data ) => {

            res.send (data);

        }).catch (( err ) => {

            console.log ( err )
        });
    });

    product.get ( "/:product_id" , ( req , res ) => {

        let product_id = req.params.product_id;

        knex.select ().from ( "product" ).where ( "product_id" , product_id ).then (( data ) => {

            res.send ( data );
        
        }).catch (( err ) => {

            console.log ( err )
        });
    });

    product.get  ( "/inCategory/:category_id" , ( req , res ) => {

        let category_id = req.params.category_id; 

        knex.select ( "product.product_id" , "name" , "description" , "price" , "discounted_price" , "thumbnail" ).from ( "product" )

        .join ( "product_category" , "product_category.product_id" , "product.product_id" )

        .where ( "category_id" , category_id).then (( data ) => {

            res.send ( data );

        }).catch (( err ) => {

            console.log (err);
        });
    });


    product.get  ( "/inDepartment/:department_id" , ( req , res ) => {

        let department_id = req.params.department_id; 

        knex.select ( "product.product_id" , "product.name" , "product.description" , "price" , "discounted_price" , "thumbnail" ).from ( "product" )

        .join ( "product_category" , "product_category.product_id" , "product.product_id" )

        .join ( "category" , "category.category_id" , "product_category.category_id")

        .where ( "department_id" , department_id).then (( data ) => {

            res.send ( data );

        }).catch (( err ) => {

            console.log (err);
        });
    });

    product.get ( "/:product_id/details" , (req , res ) => {

        let product_id = req.params.product_id;

        knex.select ( "product_id" , "name" , "description" , "price" , "discounted_price" , "image" , "image_2" ).from ( "product" )

        .where ("product_id" , product_id) .then (( data ) => {

            res.send (( data ));

        }).catch (( err ) => {

            console.log ( err );
        });
    });

    product.get ( "/:product_id/locations" , (req , res ) => {

        let product_id = req.params.product_id;
        
        knex.select ( "c.category_id" , "c.name as category_name" , "department.department_id" , "department.name as department_name").from ("category as c")

        .join ( "department" , "department.department_id" , 'c.department_id' )

        .join ("product_category" , "product_category.category_id" , "c.category_id")

        .where ( "product_id" , product_id ).then (( data ) => {

            res.send (( data ));

        }).catch (( err ) => {
            
            console.log ( err ); 
        });
    });

    product.post  ( "/:product_id/reviews" , ( req , res ) => {

        let product_id = req.params.product_id;
        let review = req.body.review;
        let rating = req.body.rating;

        knex.insert ( [ { "product_id": product_id , "review" : review , "rating" : rating} ]  ).into ("review").then (( data ) => {

            console.log ("Data inserted!");
            res.send ( data );

        }).catch (( err ) => {

            console.log ( err )

        });
    });
} 