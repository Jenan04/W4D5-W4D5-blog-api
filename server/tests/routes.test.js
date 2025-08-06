const request = require('supertest');
const data = require('../models/data.json')
const app = require('../index');


  test('POST /users add new user', (done) => {
    // const newUser = {
    //   firstname: 'John',
    //   secondname: 'Doe',
    //   password: 'G3'
    // }
    request(app)
      .post('/users')     
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
          expect(res.body.firstname).toBe(newUser.firstname);
           expect(res.body.secondname).toBe(newUser.secondname);
           expect(res.body.password).toBe(newUser.password);
           expect(res.body.id).toBeDefined();
           done();
      })

  });


  test('POST /posts add new post', (done) => {
    // const newpost = {
    //   userId: 1,
    //   title: 'Doe',
    //   body: 'G3'
    // }
    request(app)
      .post('/posts')     
      .send(newpost)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
          expect(res.body.userId).toBe(newpost.userId);
           expect(res.body.title).toBe(newpost.title);
           expect(res.body.body).toBe(newpost.body);
           expect(res.body.id).toBeDefined();
           done();
      })
  
  });  
  test('GET /posts All posts', (done) => {
    request(app)
      .get(`/posts`)
      .expect(200)
       .end(function(err, res) {
        if (err) return done(err);
         expect(Array.isArray(res.body)).toBe(true)
         done();
      })
  });

  test('GET /posts/user/:userId', (done) => {
    request(app)
      .get(`/posts/user/1`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].userId).toBe(1);
         done();
      })
  });

