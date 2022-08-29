const app = require('../../app')
const request = require('supertest')
require('dotenv').config()
require('../../redis-connect')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Auth API', () => {
    beforeAll(async() => {
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

/**
 * Testing user signup
 */

describe('Test POST /Register', () => {

  const signup = {
    firstName: "darasimi",
    lastName: "Akaniru",
    email: "daracoder20@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  }

  const wrongPassword =  {
    firstName: "darasimi",
    lastName: "Akaniru",
    email: "daracoder20@gmail.com",
    password: "123456",
    confirmPassword: "123",
  }

  const emailAlreadyExist =  {
    firstName: "darasimi",
    lastName: "Akaniru",
    email: "chieunice114@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  }

   test('It should respone with 201 created', async () => {
        const response = await request(app)
    .post('/v1/register')
    .send(signup)
    .expect('Content-Type', /json/)
    .expect(200)
})

test('It should respone with 400 password does not match', async () => {
  const response = await request(app)
.post('/v1/register')
.send(wrongPassword)
.expect('Content-Type', /json/)
.expect(400)
})

test('It should respone with 400 Email already exists', async () => {
  const response = await request(app)
.post('/v1/register')
.send(emailAlreadyExist)
.expect('Content-Type', /json/)
.expect(400)
})

 })

/** Testing user login */
describe('Test POST /login', () => {

  const correctUser = {
    email: "chieunice114@gmail.com",
    password: '12345678'
  }

  //Please provide email and password

  const wrongPassworg = {
      email: "chieunice114@gmail.com",
      password: '123456'
  }

  const withoutPassword = {
  email: "chieunice114@gmail.com",
}

const withoutEmail =  {
password: '123456'
}

const notUser = {
  email: 'random@random.com',
  password: 'random@123'
}

test(' it should with Login user', async () => {
  const response = await request(app)
    .post('/v1/login')
    .send(correctUser)
    .expect('Content-Type', /json/)
    .expect(200)
})

/** Testing non existing user login */
test('it should response with Please provide email', async () => {
  await request(app).post('/v1/login')
  .send(withoutPassword)
  .expect('Content-Type', /json/)
  .expect(400)
})

test('it should response with Please provide password', async () => {
  await request(app).post('/v1/login')
  .send(withoutEmail)
  .expect('Content-Type', /json/)
  .expect(400)
})

test('it should response with Invalid Credentials, Incorrect Password', async () => {
  await request(app).post('/v1/login')
  .send(wrongPassworg)
  .expect('Content-Type', /json/)
  .expect(401)
})

test('it should response with Invalid Credentials, Incorrect Password', async () => {
  await request(app).post('/v1/login')
  .send(wrongPassworg)
  .expect('Content-Type', /json/)
  .expect(401)
})

test('it should response with Invalid Credentials, Account not found', async () => {
  await request(app).post('/v1/login')
  .send(notUser)
  .expect('Content-Type', /json/)
  .expect(401)
})

})

/** Testing user Aminlogin */
describe('Test POST /login', () => {

  const correctUser = {
    email: "chieunice114@gmail.com",
    password: '12345678'
  }
  const wrongPassworg = {
      email: "chieunice114@gmail.com",
      password: '123456'
  }

  const withoutPassword = {
  email: "chieunice114@gmail.com",
}

const withoutEmail =  {
password: '123456'
}

const notUser = {
  email: 'random@random.com',
  password: 'random@123'
}

test(' it should with Login user', async () => {
  const response = await request(app)
    .post('/v1/admin/login')
    .send(correctUser)
    .expect('Content-Type', /json/)
    .expect(200)
})


test('it should response with Invalid Credentials, Incorrect Password', async () => {
  await request(app).post('/v1/admin/login')
  .send(wrongPassworg)
  .expect('Content-Type', /json/)
  .expect(401)
})

test('it should response with Invalid Credentials, Account not found', async () => {
  await request(app).post('/v1/admin/login')
  .send(notUser)
  .expect('Content-Type', /json/)
  .expect(404)
})


// /** Forgot password request **/
// test('Should send the request to change the password ', async () => {
// 	const response = await request(app)
// 	  .patch('/v1/forgetPassword')
// 	  .send({
//       email: "chieunice114@gmail.com",
// 	  })
// 	  .expect(404)
//   })

  })

})

 