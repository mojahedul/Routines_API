/*
 * Software Engineering Lab.
 * 27-03-2018
 * Server.js - API no:04, according t Team-7 SRS.
 * It'll require specific uri (Instructors short code) & then callback a 
 * course list that the instructor takes. 
 * Mojahedul Islam
*/

const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

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

    Instructor.find({}, null, {}, (error, data) => {
    
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

	//res.send({type: "GET"});
 // res.writeHead(200, {"Content-Type": "application/json"});
 //   res.end(JSON.stringify(data));

    Instructor.find({code: req.params.id}, function(err, data){
        
      if(err) console.log(err)

      res.json(data);

    }
    )

}
) //End of GET[] Handler method which'll handle GET[] request with params.


//Start of POST[] Method to post any any datams.
app.post('/instructors', (req, res, next) => {

    let newInstructor = new Instructor(req.body);

    newInstructor.save((error, results) => {
        
        if(error)
        {
            return next(error)
        }

        res.send(results)
    }
    )

}
) //End of POST[] method.


//Start of PUT[] Method to update any datams
app.put('/instructors/:id', (req, res, next) => {
    
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

         

        data.save((error, results) => {
        
            res.send(results);
        }
        )
    }
    )

}
) //End of PUT[] Method.


//Start of Delete Method to remove any datams
app.delete('/instructors/:id', (req, res, next) => {
    
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
            
            res.send("Deleted: " + results);
        }
        )
    }
    )

}
) //End of DELETE[] Method.

app.use(errorhandler());

//process.env.PORT(3000 || );

app.listen(3000);
console.log("Server is listening at: 3000");