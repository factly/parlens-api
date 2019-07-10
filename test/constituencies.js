/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    path = require('path'),
    request = require('supertest');


describe('constituencies/getConstituencyById', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.resolve(__dirname, '..')
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should return value for constituency 1234', function (done) {
        request(mock)
            .get('/constituencies/getConstituencyById/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/[{"_id":1234,"constituency":"Tikamgarh","state":"Madhya Pradesh","pincode":["472001","472447","472101","472010","472111","472339","472118","472337","472005","472115","472331","472442","472246","472221","472446","472445","472336"],"current_mp":515}]/)

            .end(function (err, res) {
                done(err);
            });
    });

});
