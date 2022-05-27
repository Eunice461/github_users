const app = require('../../app')
const request = require('supertest')
require('dotenv').config()
require('../../redis-connect')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

const demoUser = {
    firstName: 'chi',
    lastName: 'chi',
  	email: 'daracoder20@gmail.com',
  	password: 'abc12345',
	  confirmPassword: 'abc12345',
   isVerified: true
}


describe('Auth API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

/**
 * Testing user signup
 */

// test('Should signup new user', async () => {
//   const response = await request(app)
//     .post('/v1/register')
//     .send(demoUser)
//     .expect('Content-Type', /json/)
//     .expect(201)
//})

/** Testing user login */
test('Login existing user', async () => {
  const response = await request(app)
    .post('/v1/login')
    .send({
      email: "chieunice114@gmail.com",
      password: '123456'
    })
    .expect('Content-Type', /json/)
    .expect(200)
})

/** Testing non existing user login */
test('Should not login non-existing user', async () => {
  await request(app).post('/v1/login').send({
    email: 'random@random.com',
    password: 'random@123'
  })
  .expect('Content-Type', /json/)
  .expect(404)
})


/** Forgot password request **/
test('Should send the request to change the password ', async () => {
	const response = await request(app)
	  .patch('/v1/forgetPassword')
	  .send({
      email: "chieunice114@gmail.com",
	  })
	  .expect(404)
  })

 })

 