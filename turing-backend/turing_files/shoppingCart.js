module.exports = ( shopping_cart , knex ) => {

    shopping_cart.get ( "/generateUniqueId" , ( req ,res ) => {

        forUniqueId = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxz1234567890!@#$%^&()";

        var allUnique = forUniqueId.split(""); 

        var unique = "";

        for (var i = 0 ; i < 11 ; i ++ ) {

            unique += ( allUnique [ Math.floor ( Math.random() * (allUnique.length - 1))])
        };

        console.log (unique)
        const cart_id = { "cart_id" : unique} 

        res.send ( cart_id )
    });

    shopping_cart.post ( "/add" , ( req , res ) => {

        let cart_id = req.body.cart_id;
        let product_id = req.body.product_id;
        let attributes = req.body.attributes;
        let quantity = req.body.quantity;

        knex ( "shopping_cart" ).insert ({
            "cart_id" : cart_id , 
            "product_id" : product_id ,
            "attributes" : attributes ,
            "quantity" : quantity ,
            "added_on" : new Date()
        }).then (( data ) => {

            console.log ( "Data insertes " );
            knex.select ( "item_id" , "name" , "shopping_cart.attributes" , "p.product_id" , "price" , "shopping_cart.quantity" , "image")
            .from ( "product as p" )
            .join ( "shopping_cart" , "shopping_cart.product_id" , "p.product_id" )
            .where ( "cart_id" , cart_id ).then (( cart_details ) => {

                for ( let i of cart_details) {
                    
                    i["subtotal"] =  Number(i["price"]) * Number (i["quantity"])
                }
                
                res.send (cart_details);
            }).catch (( err ) => {

                console.log ( err)
            })


        }).catch (( err ) => {

            console.log ( err );
            res.send ( "There is an err" )
        }) 
    });

    shopping_cart.get ("/:cart_id" , ( req , res ) => {

        let cart_id = req.params.cart_id;
        knex.select ( "item_id" , "name" , "shopping_cart.attributes" , "p.product_id" , "price" , "shopping_cart.quantity" , "image")
            .from ( "product as p" )
            .join ( "shopping_cart" , "shopping_cart.product_id" , "p.product_id" )
            .where ( "cart_id" , cart_id ).then (( cart_details ) => {

                for ( let i of cart_details) {
                    
                    i["subtotal"] =  Number(i["price"]) * Number (i["quantity"])
                }
                
                res.send (cart_details);
            }).catch (( err ) => {

                console.log ( err)
            });
    });

    shopping_cart.put ( "/update/:item_id" , ( req , res ) => {

        let item_id = req.params.item_id; 
        let quantity = req.body.quantity;

        knex( "shopping_cart" ).update ({ "quantity" : quantity })
        .where ( "item_id" , item_id ).then (( data ) => {

            knex.select ( "item_id" ,"cart_id" , "attributes" , "product_id" , "quantity" ).from ( "shopping_cart ")
            .where ( "item_id" ,item_id ).then (( data ) => {

                res.send ( data );

            }).catch (( err ) => {
                
                console.log ( err );
            });
        });
    });

    shopping_cart.delete ( "/empty/:cart_id" , ( req , res ) => {

        let cart_id = req.params.cart_id;

        knex.from ("shopping_cart").where ( "cart_id" , cart_id ).del()

        .then (( data ) => {

            res.sendStatus ( 200 );
        }).catch (( err ) => {
            
            console.log ( err );
        });
    });

    shopping_cart.get ( "/totalAmount/:cart_id" , ( req , res ) => {

        let cart_id = req.params.cart_id;

        knex.select ( "shopping_cart.quantity" , "price" ).from ( "product" )

        .join ( "shopping_cart" , "shopping_cart.product_id" , "product.product_id" )

        .where ( "cart_id" , cart_id ).then (( data ) => {

            let total_amount = data[0].quantity * data[0].price;

            res.send  ({ "total_amount" : total_amount })

        });
    });

    shopping_cart.get  ( "/saveForLater/:item_id" , ( req , res ) => {

        let item_id = req.params.item_id;

        knex.schema.hasTable ( "save_for_later" ).then (( exists ) => {

            if (exists) {

                knex.select ( "cart_id" , "product_id" , "attributes" ).from ( "shopping_cart" )

                .where ( "item_id" , item_id ).then (( data ) => {

                    knex( "save_for_later" ).insert ({

                        "item_id" : item_id , 
                        "product_id" : data[0]["product_id"] ,
                        "attributes" : data[0]["attributes"] ,
                        "cart_id" : data[0]["cart_id"]

                    }).then ( ( data ) => {

                        console.log ( "Inserted!" );
                        res.send ( data )

                        knex( "shopping_cart" ).where ( "item_id" , item_id ).del()
                        .then (() => {

                        console.log ( "Saved for later" ) 
                        }).catch (( err ) => {
                            
                            console.log ( err )
                        })

                    }).catch (( err ) => {

                        console.log ( err );
                        res.send ( err )

                    });
                });
            }else {
                knex.schema.createTable ( "save_for_later" , ( table ) => {

                    table.integer ( "item_id" ) ,
                    table.integer ( "product_id" ),
                    table.string ( "cart_id" ),
                    table.string ( "attributes" )

                }).then (() => {

                    console.log ("Created!")
                    

                }).catch (( err ) => {

                    console.log ( err )

                });
            };
        });
    });

    shopping_cart.get ( "/getSaved/:cart_id" , ( req , res) => {

        let cart_id = req.params.cart_id; 

        knex.select ( "item_id" , "name" , "price" , "attributes" ).from ( "save_for_later" )

        .join ( "product" , "product.product_id" , "save_for_later.product_id" )

        .where ( "cart_id" , cart_id ).then (( data ) => {

            res.send ( data );

        }).catch (( err) => { 

            res.send ( err );
        });
    });

    shopping_cart.get ("/moveToCart/:item_id" , ( req , res ) => {

        let item_id = req.params.item_id;

        knex.select ().from ( "save_for_later" ).then (( data ) => { 

            data[0]["added_on"] = new Date();

            knex ( "shopping_cart" ).insert ({

                "item_id" : data[0]["item_id"] , 
                "cart_id" : data[0]["cart_id"] , 
                "product_id" : data[0]["product_id"] ,
                "attributes" : data[0]["attributes"] , 
                "quantity" : 1 , 
                "added_on" : data[0]["added_on"]
            }).then (( ) => {

                knex("save_for_later").where ( "item_id" , item_id ).del()
                .then (() => {

                    console.log ( "Moved in Cart" )
                })

            }).catch (( err ) => { 

                console.log ( err );
            })
        });
    });

    shopping_cart.delete ( "/removeProduct/:item_id" ,( req , res ) => {

        let item_id = req.params.item_id;

        knex.from ( "shopping_cart" ).where ( "item_id" , item_id ).del()

        .then (( data ) => {

            res.sendStatus ( 200 );
        }).catch (( err ) => {

            console.log ( err );
        });
    });
}