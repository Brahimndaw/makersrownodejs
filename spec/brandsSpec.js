'use strict';

var request = require('supertest');

describe('Brands', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all brands', function (done) {
        request(app)
            .get('/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/brands/Dakar')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new Brand', function (done) {
        request(app)
            .post('/brands')
            .send({ name: 'Abidjan',
                    email: 'Babi@gmail.com',
                    phone_number: '225-909-9309',
                    City: 'Abidjan',
                    State: 'Cote-Ivoire'
          })
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Abidjan');
                expect(res.body.email).toEqual('Babi@gmail.com')
                expect(res.body.phone_number).toEqual('225-909-9309')
                expect(res.body.City).toEqual('Abidjan')
                expect(res.body.State).toEqual('Cote-Ivoire')
                done(res);
            });
    })
});
