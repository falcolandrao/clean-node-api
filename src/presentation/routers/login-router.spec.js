const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

const makeSut = () => {
    class AuthUseCaseSpy{
        auth(email){
            this.email = email
        }
    }
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut =  new LoginRouter(authUseCaseSpy)
    return {
        sut, authUseCaseSpy
    }
}

describe('Login Router', () => {
    test('Should return 400 if no email is provided', () =>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                password: any_password
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', () =>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                password: 'any_email@email.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 500 if no httpRequest is provided', () =>{
        const { sut } = makeSut()

        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 500 if httpRequest has no body', () =>{
        const { sut } = makeSut()
        const httpRequest = {}
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call AuthUseCase with correct params', () =>{
        const { sut, authUseCaseSpy } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        sut.route(httpRequest)
        expect(authUseCaseSpy.email).toBe(httpResponse.body.email)
        expect(authUseCaseSpy.email).toBe(httpResponse.body.password)
    })

    test('Should return 401 when invalid credentials are provided', () =>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'invalid_email@email.com',
                password: 'invalid_password'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new UnauthorizedError(''))
    })

})