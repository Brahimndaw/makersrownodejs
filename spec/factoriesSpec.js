'use strict';

var request = require('supertest');

describe('Factories', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all factories', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/factories/2c2f5287-3d7a-4ebd-aae9-be7a453d0578')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new factory', function (done) {
        request(app)
            .post('/factories')
            .send({ name: 'Test Factory',
                  email: 'moonshine@gmail.com',
                  phone_number: '301-909-9309',
                  City: 'Arlington',
                  State: 'VA'
          })
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Factory');
                expect(res.body.email).toEqual('moonshine@gmail.com')
                expect(res.body.phone_number).toEqual('301-909-9309')
                expect(res.body.City).toEqual('Arlington')
                expect(res.body.State).toEqual('VA')

                done(res);
            });
    })


        it('deletes the factories', function (done) {
            request(app)
                .delete('/factories')
                .end(function (err, res) {
                    if (err) return done.fail(res);
                    expect(res.body.company_type).toEqual();
                    expect(res.body.name).toEqual();
                    expect(res.body.email).toEqual()
                    expect(res.body.phone_number).toEqual()
                    expect(res.body.City).toEqual()
                    expect(res.body.State).toEqual()
                    done(res);
                });
        })

});
