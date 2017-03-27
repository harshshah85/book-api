var should = require('should'),
  sinon = require('sinon');

describe('Book Controller Test:', function(){
  describe('Post', function(){
    it('should not allow empty title on Post', function(){
      var Book = function(book){this.save = function(){}};
      var req = {
        body:{
          author:'Some author'
        }
      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var bookController = require('../controllers/bookController')(Book);

      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status');
      res.send.calledWith('Title is required').should.equal(true);
    })
  })
})
