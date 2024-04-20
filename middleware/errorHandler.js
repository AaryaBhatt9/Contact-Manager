const {constants} = require("../constants")
const errorHandler = (err,req,res,next) =>
{
    const statusCode = res.statusCode? res.statusCode : 500;
   switch(statusCode)
   {
        case constants.VALIDATION_ERROR:
            res.json({"title": "Validation error","message": err.message ,"stackTrace": err.stack })

        case constants.NOT_FOUND:
            res.json({"title": "Not found","message": err.message ,"stackTrace": err.stack })

        case constants.SERVER_ERROR:
            res.json({"title": "server error","message": err.message ,"stackTrace": err.stack })
    
        case constants.UNAUTHORIZED:
                res.json({"title": "Unauthorized","message": err.message ,"stackTrace": err.stack })
    
        case constants.FORBIDDEN:
                res.json({"title": "Forbidden","message": err.message ,"stackTrace": err.stack })
    

        default:
            console.log("No error, all good! ")
            break;

   }
    // res.json({"title": "Not found","message": err.message ,"stackTrace": err.stack })
    // res.json({"title": "Validation failed","message": err.message ,"stackTrace": err.stack })

};

module.exports = errorHandler;


// make a condition that stacktrace only in development environment and not in production environment!! 
// stacktrace means error object it shows in which file error is present it shows the path..