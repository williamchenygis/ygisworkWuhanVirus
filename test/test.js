var express = require('express'); // (npm install --save express)
var request = require('supertest');
var expect = require('chai').expect;

function createApp() {
  app = express();

  var router = express.Router();
  router.route('/').get(function(req, res) {
    return res.json({goodCall: true});
  });

  app.use(router);

  return app;
}

describe('Our server', function() {
  var app;
  var server;

  var req = request('http://localhost:3000');

  // Called once before any of the tests in this block begin.
  before(function(done) {
  	//app=require("./../app");
    // app = createApp();
    // app.listen(function(err) {
    //   if (err) { return done(err); }
    //   done();
    // });
    done();
  });

  after(function () {
    //app.close();
    //done();
  });

  it('should send back a test page', function(done) {
    req
      .get('/test')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { 
        	console.log(err);
        	//console.log(res);
        	return done(err); }
        console.log(res.body);
        //callStatus = res.body.goodCall;
        //expect(res.body).to.equal("test response");
        // Done
        done();
      });
  });

  //test data module
  it('should send back a test page', function(done) {
    req
      .get('/test')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { 
        	console.log(err);
        	//console.log(res);
        	return done(err); }
        console.log(res.body);
        //callStatus = res.body.goodCall;
        //expect(res.body).to.equal("test response");
        // Done
        done();
      });
  });

});