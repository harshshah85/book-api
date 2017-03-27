var express = require('express');

var routes = function(Book){

  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(Book)
  bookRouter.route('/')
  .post(bookController.post)
  .get(bookController.get);

  bookRouter.use('/:BookId', function(req, res, next){
    Book.findById(req.params.BookId, function(err, book){
      if(err)
      res.status(500).send(err);
      else if (book){
        req.book = book;
        next();
      }
      else {
        res.status(404).send('Book not found');
      }
    });
  });

  bookRouter.route('/:BookId')
  .get(function(req, res){
    res.json(req.book);
  })
  .put(function(req, res){
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    book.read = req.body.read;
    req.book.save(function(err){
      if(err)
      res.status(500).send(err);
      else {
        res.json(req.book);
      }
    })
  })
  .patch(function(req, res){
    if(req.body._id)
    delete req.body._id;

    for(var b in req.body)
    {
      req.book[b] = req.body[b];
    }
    req.book.save(function(err){
      if(err)
      res.status(500).send(err);
      else {
        res.json(req.book);
      }
    });
  })
  .delete(function(req,res){
    req.book.remove(function(err){
      if(err)
      res.status(500).send(err);
      else {
        res.status(204).send('removed');
      }
    });
  });

  return bookRouter;
};

module.exports = routes;
