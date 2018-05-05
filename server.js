/*
 * Software Engineering Lab.
 * 27-03-2018
 * Server.js - API no:04, according t Team-7 SRS.
 * It'll require specific uri (Instructors short code) & then callback a 
 * course list that the instructor takes. 
 * Mojahedul Islam
*/

const mongoose = require("mongoose")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const errorhandler = require("errorhandler")
var isUpperCase = require("is-upper-case")
var isLowerCase = require("is-lower-case")
var toUpperCase = require("upper-case")

var port = 5972;

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017')
  
 
let app = express()


app.use(logger('dev'))
app.use(bodyParser.json())


const Instructor = mongoose.model('instructors', { 
    
        name: String,
        name: String,
        code: String,
        courses: String
        
    }
)


app.get('/instructors', (req, res, next) => {

    Instructor.find( {}, null, {}, (error, data) => {
    
    if (error) return next(error)
    res.send(data)
//    res.writeHead(200, {"Content-Type": "application/json"});
//    res.end(JSON.stringify(data));
      
    }
    )
    
}

) //End of GET[] Method



app.param('id', (req, res, next) => {

    Instructor.findById(req.params.id, (error, data) => {
    
    req.data = data
    
    next()
        
    }
    )
  
} 
) //This is the GET[] part which'll load data against unique id(Memory).



app.get('/instructors/:id', (req, res, next) => {
  // Instructor.findById(req.params.id, (error, data) => {
  //   if (error) return next(error)
  //   res.send(data)

 // res.writeHead(200, {"Content-Type": "application/json"});
 //   res.end(JSON.stringify(data));

    var length = req.params.id.length;

    if(length == 3 || length == 2)
    {
        var tempCacheString_1 = (req.params.id);

        if( isLowerCase(tempCacheString_1))
        {

            var tempCacheString_2 = toUpperCase(req.params.id);

            Instructor.find({code: tempCacheString_2}, function(err, data){
            
                if(err) console.error(err)

                if(data == "")
                {
                    res.send("\n\tSorry, the required data doesn't exists/inserted..");
                }

                else
                {
                    res.json(data);
                }      

            }
            )

        } //End of inner if( isLowerCase(tempCacheString_1)) inside Get[ ];

        else
        {
            Instructor.find({code: req.params.id}, function(err, data){
        
                if(err) console.error(err)
    
                if(data == "")
                {
                    res.send("\n\tSorry, the required data doesn't exists/inserted..");
                }
    
                else
                {
                    res.json(data);
                }      
    
            }
            )

        } //End of inner else where if: if( isLowerCase(tempCacheString_1));
    
    } //End of outer where if: if(length == 3 || length == 2) inside GET[ ];


    //1st else if .. after if..where if: if(length == 3 || length == 2) 
    else if(length == 24)
    {
        Instructor.findById(req.params.id, (error, data) => {
            
            if (error) return next(error)

            res.json(data);
        
        }
        )    
    }

    else
    {
        res.send("\n\tOops !! You entered a wrong url, please try again.. Allowed name code is 3 digit.")
    }
    

} //Part of GET[];
) //End of GET[] Handler method which'll handle GET[] request with params.




//Start of POST[] Method to post any any datams.
app.post('/instructors', (req, res, next) => {                  //setStatusCode = 403 + 504

    var flag;
    var tempCacheCodeOfInput = (req.body.code);

    console.log(tempCacheCodeOfInput);

    Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data) {

        if(err)
        {
            res.send(err);
        }

     //   console.log(data.code.length);

        if( (tempCacheCodeOfInput.length == 3 ) && ( data == null ) )
        {

            // Instructor.find({code: tempCacheCodeOfInput}, function(err, data) {

            //     if(err)
            //     {
            //         res.send(err);
            //     }
        
            //     if( (data.code) == "")
            //     {
            //         flag = 0;
        
            //     }
        
            //     if(data.code != "")
            //     {
            //         flag = 999;
            //         res.send(err);
            //     } 
            // }
            // )


            let newInstructor = new Instructor(req.body);

            newInstructor.save((error, results) => {
                
                if(error)
                {
                    res.send(error);
                //  return next(error);
                }

                res.send("Successfully posted..\n\n" + results);
            }
            )

        } //End of if where if: if( (tempCacheCodeOfInput.length == 3 ) && ( data == null ) )


        else
        {
            res.send("Oops !!! Post operation failed..\nThere already exists one instructors same name code..")
        }

    } //part of Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data)
    )  //Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data)

}
) //End of POST[] method.




//Start of PUT[] Method to update any datams
app.put('/instructors/:id', (req, res, next) => {
    

    if((req.params.id.length) == 3 || (req.params.id.length) == 2)
    {

        var tempCacheString_1 = req.params.id;

        if( isLowerCase(tempCacheString_1) )
        {

            var tempCacheString_2 = toUpperCase(req.params.id);

            Instructor.findOne({code: tempCacheString_2}, function(error, data){
            
                if(error)
                {
                    return next(error);
                } 

                else if(data == "")
                {
                    res.send("\n\tSorry, the required data doesn't exists/inserted.. update failed..");
                }

                else
                {
                    //res.json(data);
                    if(error)
                    {
                        res.send(error);
                       // return next(error);
                    }

                    if(req.body.courses)
                    {
                        data.courses = req.body.courses;
                    }
                    
                    if(req.body.code)
                    {
                        data.code = req.body.code;
                    }
        
                    if(req.body.name)
                    {
                        data.name = req.body.name;
                    } 
        
                    
        
                    data.save((error, results) => {         //setStatusCode = 404
        
                        if(error) console.log(error);
                    
                        res.send("Successfully updated: \n\n" + results);
                    }
                    )


                } //End of inner-inner else vlock inside Instructor.findOne({code: tempCacheString_2}, function(error, data);   

            } //Part of Instructor.findOne({code: tempCacheString_2}, function(error, data)
            ) //End off Instructor.findOne({code: tempCacheString_2}, function(error, data);
      

        } //End of inner if block where if: if( isLowerCase(tempString) ) condition;


        //1st else after if block, where if: if( isLowerCase(tempCacheString_1) )
        else
        {
            Instructor.findOne({code: req.params.id }, function(error, data){
            
                if(error)
                {
                    return next(error);
                } 

                if(req.body.courses)
                {
                    data.courses = req.body.courses;
                }
                
                if(req.body.code)
                {
                    data.code = req.body.code;
                }
    
                if(req.body.name)
                {
                    data.name = req.body.name;
                } 
    
                
    
                data.save((error, results) => {             //setStatusCode 405
    
                    if(error) console.log(error);
                
                    res.send("Successfully updated: \n\n" + results);
                }
                )

            }
            )

        } //End of inner else after if block, where if: if( isLowerCase(tempCacheString_1) )

    } //End of outer if where if: if( (req.params.id.length) == 3) );



    //1st outer else block, where if: if( (req.params.id.length) == 3) );
    else if( (req.params.id.length == 24) )
    {

        //-----------------------------
        Instructor.findById(req.params.id, (error, data) => {
        
            if(error)
            {
                return next(error);
            } 

            if(req.body.courses)
            {
                data.courses = req.body.courses;
            }
            
            if(req.body.code)
            {
                data.code = req.body.code;
            }

            if(req.body.name)
            {
                data.name = req.body.name;
            } 

            

            data.save((error, results) => {         //setStatusCode = 204;

                if(error) console.log(error);
            
                res.send("Successfully updated: \n\n" + results);
            }
            )

        }
        ) //End of Instructor.findById(req.params.id, (error, data) =>;

    } //End of else if( (req.params.id.length ==24) );



    else
    {
        res.send("\n\toops !! \tSomething went wrong.. please try again..");
    }
    

} //Part of PUT[]
) //End of PUT[] Method.




//Start of Delete Method to remove any datams
app.delete('/instructors/:id', (req, res, next) => {
    

    if( (req.params.id.length) < 2 )
    {
        res.send("\toops !!! Enter id or name code to delete..");
    }


    else if( (req.params.id.length) == 2 || (req.params.id.length) == 3 || (req.params.id.length) == 24)
    {

        Instructor.findById(req.params.id, (error, data) => {
            
            if (error) 
            {
                return next(error);
            }  

            data.remove((error, results) => {
            
                if (error)
                {
                    return next(error);
                } 
                
                res.send("Successfully Deleted: \n\n" + results);
            }
            )

        }//Part of Instructor.findById(req.params.id, (error, data) =>;
        ) //End of Instructor.findById(req.params.id, (error, data) => inside DELETE[ ];
        
    } //End of else if( (req.params.id.length) == 2 / 3 /24;


    else
    {
        res.send("\tInvalid uri..")
    }

} //Part of DELETE[]
) //End of DELETE[] Method.



app.use( errorhandler() );

//process.env.PORT(8086 || port);

app.listen(port);
console.log("Server is listening at: " + port);