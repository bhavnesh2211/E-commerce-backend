
 module.exports = ( department , knex ) => {

    department.get ("/" , ( req , res ) => {

        knex.select().from ("department").then (( data ) => {

            res.send (data);
            
        }).catch ((err) => {

            console.log (err)
        });
    });
    
    
    department.get ("/:department_id" , ( req ,res) => {

        let id = req.params.department_id;

        knex.select().from ("department").where( "department_id" , id).then ((data) => {

            res.send (data)

        }).catch ((err) => {

            console.log (err)
        })
    })
    
 }




 
