module.exports = (customer , knex , jwt) => {

    
    customer.post ("/" , ( req , res ) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        let accessKey = jwt.sign ( req.body , process.env.SECRET, { expiresIn : "24h"} );

        knex.insert ([{ name : name , email : email , password : password }]).into ("customer").then (( data ) => {

            knex.select().from ( "customer" ).where ( "email" , email ).then ((user) => {

                dataOfUser = {"customer" : user[0] , accessKey , expiresIn : "24h"}
                res.send (dataOfUser);

            }).catch ((err) => {

                console.log (err);

            });

        }).catch (( err) => {
            res.send ( "user already created with this user id ")
            console.log (err)

        });
    });

    customer.post ("/login" , ( req , res ) => {

        let email = req.body.email;
        let password = req.body.password;

        let accessKey = jwt.sign ( req.body , process.env.SECRET, { expiresIn : "24h"} );

        res.cookie ( accessKey , "cookie_value" );

        knex.select().from( "customer" ).where ( {"email" : email , "password" : password} ).then ((data) => {

            dataOfUser = {"customer" : data[0] , accessKey , expiresIn : "24h"}

                res.send (dataOfUser);

        }).catch (( err ) => {

            res.send ("Your enter worng Password or EmailId ")

            console.log ( err );

        });   
    });

    customer.get ("/:id" , ( req ,res ) => {

        let accessKey = jwt.sign ( req.body , process.env.SECRET, { expiresIn : "24h" } );

        res.cookie ( accessKey , "cookie_value" )

        let customer_id = req.params.id; 

        knex.select ().from ( "customer" ).where ( "customer_id" , customer_id ).then (( data ) => {

            res.send ( data );

        }).catch (( err ) => {

            res.send ( "Your Enter wrong Id!" )
            console.log (err)
        })
        

    });

    customer.put ("/" , ( req , res ) => {

        let customer_email = req.body.email;
        let customer_name = req.body.name;
        let day_phone = req.body.day_phone;
        let eve_phone = req.body.eve_phone;
        let mob_phone = req.body.mob_phone;

        knex( "customer" ).where ( "email" , customer_email )
        .update ({
                    "day_phone" : day_phone ,
                    "eve_phone": eve_phone ,
                    "mob_phone" : mob_phone 
                }).then (( data ) => {

                    console.log ( "Data update succesfully" );
                    knex.select ().from ("customer").where ( "email" , customer_email ).then (( userData ) => {
            
                        res.send ( userData );
            
                    }).catch (( err ) => {
            
                        res.send ( "There is some error" );
                    })
            
                }).catch (( err ) => {
            
                    console.log ( err ) 
                    res.send ( "Your enter wrong email" );
            
                });
    });

    customer.put ( "/address" , ( req , res ) => {
        
        let customer_email = req.body.email;
        let address_1 = req.body.address_1;
        let address_2 = req.body.address_2;
        let city = req.body.city;
        let region = req.body.region;
        let postal_code = req.body.postal_code;
        let country = req.body.country;
        let shipping_region_id = req.body.shipping_region_id;

        knex( "customer" ).where ( "email" , customer_email )
        .update ({
            "address_1" : address_1 ,
            "address_2" : address_2 ,
            "city" : city , 
            "region" : region ,
            "postal_code" : postal_code ,
            "country" : country , 
            "shipping_region_id" : shipping_region_id
        }).then (( data ) => {

            console.log ( "Data updated successfully" )
            knex.select ().from ( "customer" ).where ( "email" , customer_email ).then (( userData ) => {

                res.send (userData); 

            }).catch (( err ) => {

                console.log ( err );
                res.send ( "There is an error in details" )
            });
            
        }).catch (( err ) => {

            console.log ( err ); 
            res.send ( "You enter wrong emailId" )
        });
    });

    customer.put ( "/creditCard" , ( req ,res ) => {

        let credit_card_no = req.body.credit_card;
        let customer_email = req.body.customer_email;

        knex( "customer" ).where ( "email" , customer_email )
        .update ({ "credit_card" : credit_card_no }).then (( data ) => {

            console.log ( "Credit_card update successfully" )

            knex.select().from ( "customer" ).then (( userData ) => {

                res.send ( userData )

            }).catch (( err ) => {

                console.log ( err )
                res.send ( "There is a error" )
            })
        }).catch (( err ) => {

            console.log ( err )
            res.send ( "You enter wrong emailId" );

        });
    });

} 