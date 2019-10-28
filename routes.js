
const express = require('express');
const router = new express.Router;


const userController = require('./controllers/user');
const bookController = require('./controllers/book');


router.get('/',(req,res)=>res.send('ok'));

router.get('/users' ,userController.findAll)
router.get('/users/:id',userController.getUser);
router.post('/users',userController.create );
router.post('/users/:userId/borrow/:bookId',userController.borrow );
router.post('/users/:userId/return/:bookId',userController.returnbook );

router.get('/books' , bookController.findAll)
router.get('/books/:id',bookController.getBook);
router.post('/books',bookController.create );


module.exports = router;