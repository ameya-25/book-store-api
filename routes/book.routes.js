// All book related Routes here

const express = require('express');
const controller = require('../controllers/book.controller');   

const router = express.Router();

router.get('/', controller.getAllBooks);      // '/' means the base path ke andar ka root path, not the application's root path (http://localhost:3000/)

router.get('/:id', controller.getBookById);              // Route - level Middleware : middlwareD can be put in between

router.post('/', controller.createBook);

router.delete('/:id', controller.deleteBookById);

module.exports = router;          