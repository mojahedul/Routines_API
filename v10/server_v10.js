/*
 * Software Engineering Lab.
 * 27-03-2018
 * Server.js - API no:04, according t Team-7 SRS.
 * version: v10
 * It'll require specific uri (Instructors short code) & then callback a 
 * course list that the instructor takes. 
 * Mojahedul Islam
*/

var fs = require("fs");
var util = require("util");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
var isUpperCase = require("is-upper-case");
var isLowerCase = require("is-lower-case");
var toUpperCase = require("upper-case");

var port = 5972;

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017')

var date = new Date();
  
 
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
    
    if (error)
    {
        fs.appendFile('report.log', error, function (err) {
            if (err)
            {
                fs.appendFile('report.log', error, function (err) {
                    
                    if (err) throw err;
        
                    fs.appendFile('report.log', "\n" );
                    console.log("Error reported in Get[]");
                  });

                throw err; 
            } 

            fs.appendFile('report.log', "\n" );
            console.log('Updated!');
          });

        return next(error);
    } 
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
    

//-------------Validity_Checker---------

function validity_Checker() {

    let flag;
    let validity_1;
    let validity_2 = true;
    let code_Input_Cache = req.params.id;
    let length_Of_code_Input_Cache = req.params.id.length;

    
    // if(error)  
    // {
    //     res.send(error);
    // } 

    if( length_Of_code_Input_Cache == 2 || length_Of_code_Input_Cache == 3 )
    {

        for(i = 0; i < length_Of_code_Input_Cache; i++)
        {
            value_For_Input_Cache = code_Input_Cache.charCodeAt(i);

            
            if( (value_For_Input_Cache >= 65 && value_For_Input_Cache <= 90) || (value_For_Input_Cache >= 97 && value_For_Input_Cache <= 122) )
            {
                validity_1 = true;
    
            }

            else
            {
                validity_2 = false;
            }

            console.log(code_Input_Cache.charCodeAt(i) + " " );
            console.log(" " + validity_1);
            console.log(" " + validity_2);

        }

        
        if( validity_1 == true && validity_2 == true)
        {
            flag = true;

            return (true);
        }

        else
        {
            flag = false;

            return (false);
        }

    } //End of outer if: if( length_Of_code_Input_Cache == 2 || length_Of_code_Input_Cache == 3 );

    else
    {
        return (false);
    }
    

} //End of function validity_Checker( );


//-------------Validity_Checker---------



//--------------------------------***

function Input_Case_Checker_Fixer()
{
    let i;
    var reqBodyStringCache = (req.params.id);
    let str_Array = "";

    if( validity_Checker() )
    {
        for( i = 0; i < length; i++ )
        {
            if( isUpperCase( reqBodyStringCache[i] ) )
            {
                //Thats good;
                str_Array += reqBodyStringCache[i];
            }

            else if( isLowerCase( reqBodyStringCache[i] ) )
            {
                str_Array += toUpperCase( reqBodyStringCache[i] );
                //console.log( reqBodyStringCache[i] );
            }

            else                                                                //setStatusCode 500
            {
                res.send("\tDataRetrievationError 500.. ");
            }
        }

        console.log( reqBodyStringCache );
        return ( str_Array );

    } //End of if: if( length == 2 || length == 3 );

    else                                                                       //setStatusCode 501
    {
        return (null);
        res.send("\tError-501 - Invalid input..")
    }


} //End of function Input_Case_Checker_Fixer();




    //Start of Condition block;
    //----------------------------***
    if(length == 3 || length == 2)
    {
        

        if( validity_Checker() )
        {

            var upperCaseStringCache = Input_Case_Checker_Fixer();

            Instructor.find({code: upperCaseStringCache}, function(err, data){
            
                if(err)
                {
                    fs.appendFile('report.log', err, function (err) {
                        if (err)
                        {
                            throw err;
                        }

                        fs.appendFile('report.log', "\n" );
                        console.log('Reported Error in Get[]..');
                      });

                    console.error(err);  
                } 

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
        
                if(err)
                {
                    fs.appendFile('report.log', error, function (err) {
                        if (err) throw err;
            
                        fs.appendFile('report.log', "\n" );
                        console.log('Reported Error in Get[]..');
                      });

                    console.error(err);
                } 
    
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
            
            if (error)
            {
                fs.appendFile('report.log', error, function (err) {
                    if (err) throw err;
        
                    fs.appendFile('report.log', "\n" );
                    console.log('Reported Error in Get[]..');
                  });

                return next(error)
            } 

            else if( data == null || (typeof data) == null )
            {
                res.send("\tOpss !!! Required data doesn't exists.. Check your unique ID.");
            }

            else
            {
                res.json(data);
            }
            
        
        } //Part of Get[ ],
        ) //End of Instructor.findById(req.params.id, (error, data) => inside Get[ ];
    }

    else
    {
        res.send("\n\tOops !! You entered a wrong url, please try again.. Allowed name code is 3 digit.")
    }
    

} //Part of GET[];
) //End of GET[] Handler method which'll handle GET[] request with params.
//----------------------------------------------




//----------------------------------------------
//Start of POST[] Method to post any any datams.
app.post('/instructors', (req, res, next) => {                      //setStatusCode = 403 + 504

    let i;
    var flag;
    var validity_1;
    var validity_2 = true;
    var code_Input_Cache;
    var length_Of_code_Input_Cache;
    var value_For_Input_Cache = 0;

    var tempCacheCodeOfInput = (req.body.code);

    console.log(tempCacheCodeOfInput);

    validity_Checker();

    // Method for Validity checker of Input Name Code
    function validity_Checker() {

        code_Input_Cache = req.body.code;
        length_Of_code_Input_Cache = req.body.code.length;

        
        // if(error)  
        // {
        //     res.send(error);
        // } 


        for(i = 0; i < length_Of_code_Input_Cache; i++)
        {
            value_For_Input_Cache = code_Input_Cache.charCodeAt(i);

            
            if( value_For_Input_Cache >= 65 && value_For_Input_Cache <= 90 )
            {
                validity_1 = true;
      
            }

            else
            {
                validity_2 = false;
            }

            console.log(code_Input_Cache.charCodeAt(i) + " " );
            console.log(" " + validity_1);
            console.log(" " + validity_2);

        }

        
        if( validity_1 == true && validity_2 == true)
        {
            flag = true;
        }

        else
        {
            flag = false;
        }
        

    } //End of function validity_Checker( );


    //Outermost If block to filter the input name code
    if( (tempCacheCodeOfInput.length == 2 || tempCacheCodeOfInput.length == 3 ) && flag == true )
    {

        Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data) {


            if(err)
            {
                fs.appendFile('report.log', err, function (err) {
                    
                    if (err) throw err;
        
                    fs.appendFile('report.log', "\n" );
                    console.log('Reported Error in Post[]..');
                }
                );

                res.send(err);
            }

        //   console.log(data.code.length);
            //------------------------------
            else if(  ( data == null ) && flag == true )
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
                //         flag = 999;                                                 //setstatusCode 999
                //         res.send(err);
                //     } 
                // }
                // )


                let newInstructor = new Instructor(req.body);

                newInstructor.save((error, results) => {
                    
                    if(error)
                    {

                        fs.appendFile('report.log', error, function (err) {
                            if (err) throw err;
                
                            fs.appendFile('report.log', "\n" );
                            console.log('Reported Error in Post[]..');
                          });

                        res.send(error);
                    //  return next(error);
                    }

                    res.send("Successfully posted..\n\n" + results);
                }
                )

            } //End of else if where if: else if(  ( data == null ) && flag == true )


     

            //--------------------
            else if( data != null)                                                      //setstatusCode502
            {
                if( (typeof data.code) == "undefined" || (typeof data.code) == null )
                {
                    res.send("\tDatabaseCreationError 502.. \n\tpossible reason: invalid name code.." + data.code);
                }

                else if( (typeof data.code) != "undefined" || (typeof data.code) != null )
                {
                    res.send("Oops !!! Post operation failed..\nThere already exists one instructors same name code.. " + data.code);
                }
                       
                else                                                                   //setstatusCode503
                {
                    res.send("\tdatabaseCreationError 503 " + tempCacheCodeOfInput);    
                }
                    
            }

            //--------------------------
            //Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data)
            else                                                                    //setstatusCode504
            {
                res.send("\tDatabaseCreationError 504 " + data );
            } 
            

        } //part of Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data)
        )  //Instructor.findOne({code : tempCacheCodeOfInput}, function(err, data)


    } //outer if block where if:if( (tempCacheCodeOfInput.length == 2 || 
      //tempCacheCodeOfInput.length == 3 ) && flag == true );



    //Outermoost else block after only if block
    else
    {
        if( req.body.code.length < 2 )                                              //setstatusCode506
        {
            res.send("\tDatabaseCreationError 506 \n\tInvalid name code -single digit/blank space name code not allowed.");      
        }


        else if( isLowerCase(req.body.code) )                                      //setstatusCode507
        {
            if( tempCacheCodeOfInput == "" || tempCacheCodeOfInput == " ")
            {
                res.send("\tInvalid Name Code - Entered Name Code is blank. 507");   
            }

            else
            {
                res.send("Error 507, LowerCase letters not allowed for name code.. try Capital letters.." );
            }     
        }


        else if( flag == false)                                                    //setstatusCode508
        {
            res.send("\tError 508, Invalid Name Code..")
        }


        else if( tempCacheCodeOfInput.length > 3 )                                //setstatusCode509
        {
            res.send("\tError 509,  Name code is not allowed more than 3 digits..");
        }

        else                                                                      //setstatusCode511
        {
            res.send("\tInvalid Name Code Error 511");
        }

    } //Outermoost else block after only if block

} //Part of Post[],
) //End of POST[] method.
//-------------------------------------------





//--------------------------------------------------------
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
                    fs.appendFile('report.log', error, function (err) {
                        
                        if (err) throw err;
            
                        fs.appendFile('report.log', "\n" );
                        console.log('Reported Error in Put[]..');
                    }
                    );

                    return next(error);
                } 

                else if(data == "")                                         //setStatusCode 403
                {
                    res.send("\n\tError 403, the required data doesn't exists/inserted.. update failed..");
                }

                else
                {
                    //res.json(data);
                    if(error)
                    {
                        fs.appendFile('report.log', error, function (err) {
                            if (err) throw err;
                
                            fs.appendFile('report.log', "\n" );
                            console.log('Reported Error in put[]..');
                        }
                        );

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
        
                    
        
                    data.save((error, results) => {                      //setStatusCode = 404
        
                        if(error)
                        {
                            fs.appendFile('report.log', error, function (err) {
                                if (err) throw err;
                    
                                fs.appendFile('report.log', "\n" );
                                console.log('Reported Error in put[]..');
                            }
                            );

                            console.log(error);
                        } 
                    
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
                    fs.appendFile('report.log', error, function (err) {
                        if (err) throw err;
            
                        fs.appendFile('report.log', "\n" );
                        console.log('Reported Error in put[]..');
                    }
                    );

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
    
                
    
                data.save((error, results) => {                       //setStatusCode 405
    
                    if(error)
                    {
                        fs.appendFile('report.log', error, function (err) {
                            if (err) throw err;
                
                            fs.appendFile('report.log', "\n" );
                            console.log('Reported Error in put[]..');
                        }
                        );

                        console.log(error);
                    } 
                
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
                fs.appendFile('report.log', error, function (err) {
                    if (err) throw err;
        
                    fs.appendFile('report.log', "\n" );
                    console.log('Reported Error in put[]..');
                }
                );

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

            

            data.save((error, results) => {                         //setStatusCode = 204;

                if(error) 
                {
                    fs.appendFile('report.log', error, function (err) {
                        if (err) throw err;
            
                        fs.appendFile('report.log', "\n" );
                        console.log('Reported Error in put[]..');
                    }
                    );

                console.log(error);
            
                res.send("Successfully updated: \n\n" + results);
                }
            
            }
            )

        } //Part of Instructor.findById(req.params.id, (error, data) =>;
        ) //End of Instructor.findById(req.params.id, (error, data) =>;

    } //End of else if( (req.params.id.length ==24) );


    else
    {
        res.send("\n\toops !! \tSomething went wrong.. please try again..");
    }
    

} //Part of PUT[]
) //End of PUT[] Method.






//Start of Delete Method to remove any datams                        //setStatusCode = 406
app.delete('/instructors/:id', (req, res, next) => {
    
    if( req.params.id.length == 24 )
    {

        //--------------------
        Instructor.findById( req.params.id, function(err, data) {

            if(err)
            {
                fs.appendFile('report.log', err, function (err) {
                    
                    if (err) throw err;
        
                //    res.send();

                    fs.appendFile('report.log', "\n", function(error) {

                        if(error) throw error;
                    }
                    );
                    console.log("Reported Error in Delete[]..111");
                }
                );

                res.send("\tInvalid uri. This uri doesn't match any records..\n\t" + err);
            }


            //----------------------
            // if( (req.params.id.length) < 2 )
            // {
            //     res.send("\toops !!! Enter valid id or name code to delete..");
            // }


            else if( (req.params.id.length) == 24 && data != null)
            {

                
                
                Instructor.findById(req.params.id, (error, data) => {
                    
                    if (error) 
                    {
                        fs.appendFile('report.log', error, function (err) {
                            
                            if (err) throw err;
                
                            fs.appendFile('report.log', "\n" );
                            console.log('Reported Error in Delete[]..');
                        }
                        );

                        return next(error);
                    }  

                    data.remove((error, results) => {
                    
                        if (error)
                        {
                            fs.appendFile('report.log', error, function (err) {
                            
                                if (err) throw err;
                    
                                fs.appendFile('report.log', "\n" );
                                console.log('Reported Error in Delete[]..');
                            }
                            );

                            return next(error);
                        } 
                        
                        res.send("Successfully Deleted: \n\n" + results);
                    }
                    )

                }//Part of inner Instructor.findById(req.params.id, (error, data) =>;
                ) //End of inner Instructor.findById(req.params.id, (error, data) => inside DELETE[ ];
                
            } //End of 1st else if( (req.params.id.length) == 24 && data != null;



            else if(  data == null )
            {
                res.send("\tInvalid URI. This uri doesn't match any records..")
            }


            else
            {
                res.send("\tFailed.. reason: Invalid id or data hasn't yet inserted/Not exists.")
            }


        } //Part of outer Instructor.findByID( { code : req.params.id }, function(err, data);
        ) //End of outer Instructor.findByID( { code : req.params.id }, function(err, data), inside DEL[ ];

    } //End of if block where if: if( req.params.id.length == 24 ), inside DEL[ ];



    //The only else block after if block, where if: if( req.params.id.length == 2 || req.params.id.length == 3 ), inside Del[ ];
    else
    {
        res.send("\tDataRemovalError 512..Invalid uri..");                                             //setStatusCode 512
    }


} //Part of DELETE[]
) //End of DELETE[] Method.




app.use( errorhandler() );

//process.env.PORT(5972 || port);

app.listen(port, function() {

    console.log("Server is listening at: " + port);

    var month = date.getMonth() + 1;

    fs.appendFile("report.log", ("\n" + date.getDate() + "-"+ month + "-" +date.getFullYear() + "\n"), function(error) {
        
        if(error)
        {
            console.error(error);
        }
    }
    );

}
);