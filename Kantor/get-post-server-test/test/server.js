'use strict';

const expect = require("chai").expect;
require('should');
require('trace');
const request = require("request");

const server = require('../server');
const config = require('config');

const mock = require('mock-fs');
const fs = require("fs");

describe("GET/POST server", () => {

    before(done => {
        server.listen(3000, '127.0.0.1', done);
    });

    after(done => {
        server.close(done);
    });

    beforeEach(() => {
        let files = {
          [`${config.get('publicRoot')}/index.html`]: '<html></html>',
          [`${config.get('publicRoot')}/existing.png`]: '...',
          '/test.jpg': '1б'.repeat(10000)
        }
        mock(files);
    });

    afterEach(() => {
        mock.restore();
    });


    describe("GET", () => {

        let url = 'http://localhost:3000/index.html';
        let nestedUrl = 'http://localhost:3000/nested/index.html';
        
        it("if /file exists then GET /file returns it", function(done) {
            request(url, function(error, response, body) {
                if (error) return done(error);
                response.statusCode.should.be.equal(200);
                body.should.not.be.empty;
                done();
            });
        });

        it("if /path/is/nested returns 400", function(done) {
            request(nestedUrl, function(error, response, body) {
                if (error) return done(error);
                response.statusCode.should.be.equal(400);
                done();
            });
        });

        it("if files does not exist returns status 404", function(done) {
            request('http://localhost:3000/no-such-file.html', function(error, response, body) {
                if (error) return done(error);
                response.statusCode.should.be.equal(404);
                done();
            });
        });
    });

    describe("POST", () => {
 
        it("when POST /new.jpg, saves it and returns 200", (done) => {

            let url = 'http://localhost:3000/new.jpg';
            let fstream = fs.createReadStream('/test.jpg');

            let req = request.post(url, function(err, response, body) {
                if (err) return done(err);
                response.statusCode.should.be.equal(200);
                let content1 = fs.readFileSync(config.get('publicRoot') + '/new.jpg')
                let content2 = fs.readFileSync('/test.jpg');
                Buffer.compare(content1, content2).should.be.equal(0);
                done();
            });

            fstream.pipe(req);
        });


        it("when POST /existing.png, returns 409", (done) => {
          let url = 'http://localhost:3000/existing.png';

          let fstream = fs.createReadStream('/test.jpg');

          let req = request.post(url, function(error, response, body) {
            if (error) return done(error);
            response.statusCode.should.be.equal(409);
            done();
          });

          fstream.pipe(req);
        });


    });

});