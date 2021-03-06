const MissingParamError = require('missing-param-error.js')
const Unauthorized = require('unauthorized-error.js')
const UnauthorizedError = require('./unauthorized-error')

module.exports = 
    class httpResponse{
        static badRequest (paramName){
            return{
                statusCode: 400,
                body: new MissingParamError(paramName)
            }
        }
    
        static serverError (){
            return{
                statusCode: 500
            }
        }

        static unauthorizedError (){
            return{
                statusCode: 401,
                body: new UnauthorizedError()
            }
        }
    }