const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

let dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// to mount start from '/'
// and extract the route
dishRouter.route('/')
.get((req, res, next) => {
  Dishes.find({})
  .then((dishes) => {
      res.StatusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes);
  }, (err) => {next(err)})
  // .exec() //  we don't need exec because it only handle this, we don't need recall to the next
  // so we dont need to return as well
  .catch((err) => {next(err)})
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dishes) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => {next(err)})
    .catch((err) => {next(err)});
})
.put((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.setHeader('Content-Type', 'text/html');
  res.end(req.method + " not supported!");
})
.delete((req, res, next) => {
  Dishes.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
 .catch((err) =>{next(err)});
});

// another endpoint
dishRouter.route('/:dishID')
.get((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishID, {
        $set: req.body
    }, { new: true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
// use :PARAMS_NAME to add params through endpoint
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => {next(err)});// because in app.js we have alread set error handling
});

dishRouter.route('/:dishID/comments')
.get((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }else{
            var err = new Error('Dish' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => {next(err)})
})
.post((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish != null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments);
            }, (err) => {next(err)});
        }else{
            var err = new Error('dish' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(req.method + 'operation is not supported on /dishes' + req.params.dishID +'/comments');
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish != null) {
            console.log('deleting ' + dish.comments.length + ' comments');
            for(var i=dish.comments.length-1; i >= 0; i--){
                // we cannot start from zero to delete must detere from the last

                //Each subdocument has an _id by default.
                //Mongoose document arrays have a special id method for
                //searching a document array to find a document with a given _id.
                //var doc = parent.children.id(_id);
                dish.comments.id(dish.comments[i]).remove();// embeded documents
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments);
            })
        }else{
            var err = new Error('dish'+ req.params.dishID + ' not found');
            err.status = 404;
            next(err);
        }
    });
})

dishRouter.route('/:dishID/:commentID')
.get((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        var needed_comment = dish.comments.id(req.params.commentID);
        if(dish && needed_comment){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentID));

        }else{
            var err = new Error('dish ' + req.params.dishID +' and comment' + req.params.commentID + ' not found');
            err.status = 404;
            next(err);
        }
    })
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(req.method + ' not supported for /dishes/' + req.params.dishID +'/'+ req.params.commentID);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        var needed_comment = dish.comments.id(req.params.commentID);
        if(needed_comment && dish){
            // only rating and comment is allowed to be modified
            if(req.body.comment){
                needed_comment.comment = req.body.comment;
            }
            if(req.body.rating){
                needed_comment.rating = req.body.rating;
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentID));
            })
        }else{
            var err = new Error('dish ' + req.params.dishID +' and comment' + req.params.commentID + ' not found');
            err.status = 404;
            next(err);
        }
    })
    .catch((err) => {next(err)});
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        var needed_comment = dish.comments.id(req.params.commentID);
        if(dish && needed_comment){
            needed_comment.remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentID));
            })
        }else{
            var err = new Error('dish ' + req.params.dishID +' and comment' + req.params.commentID + ' not found');
            err.status = 404;
            next(err);
        }
    })
    .catch((err) => next(err));
});
module.exports = dishRouter; // every new js file is a new node module
