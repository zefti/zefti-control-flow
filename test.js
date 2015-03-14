var assert = require('assert');
var controlFlow = require('./index.js');

function requestHandler(req, res, cb){
  cb(null, {});
}

function middle1(payload, cb){
  payload.middle1 = true
  cb(null, payload);
}

function middle2(payload, cb){
  payload.middle2 = true;
  cb(null, payload);
}

function middle3(payload, cb){
  payload.middle3 = true;
  cb(null, payload);
}



var fakeReq = {headers:{}, body:{foo:'bar'}};
var fakeRes = {};

describe('waterfall with request handler', function(){
  //var waterfall = controlFlow.waterfall({requestHandler:true});
  var waterfall = controlFlow.waterfall;
  it('should return an object throughout flow', function(done){
    function end(payload, cb){
      assert.equal(typeof payload, 'object');
      done();
    }
    var testFlow = waterfall(fakeReq, fakeRes, [
        requestHandler
      , middle1
      , middle2
      , middle3
      , end
    ]);
  });

  it('should return a callback', function(done){
    function end(payload, cb){
      assert.equal(typeof cb, 'function');
      done();
    }
    var testFlow = waterfall(fakeReq, fakeRes, [
        requestHandler
      , middle1
      , middle2
      , middle3
      , end
    ]);
  });

  it('should set all the properties from the flow', function(done){
    function end(payload, cb){
      assert.equal(payload.middle1, true);
      assert.equal(payload.middle2, true);
      assert.equal(payload.middle3, true);
      done();
    }
    var testFlow = waterfall(fakeReq, fakeRes, [
        requestHandler
      , middle1
      , middle2
      , middle3
      , end
    ]);
  });
});