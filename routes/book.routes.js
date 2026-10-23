// All book related Routes here

const express = require('express');
const {Books} = require('../db/book');      //{ Books } extracts ONLY the books property from the exported object.

const router = express.Router();

router.get('/', (req, res) => {     // '/' means the base path ke andar ka root path, not the application's root path (http://localhost:3000/)
    res.setHeader('x-name', 'ameya');
    return res.json(Books);
     
});

router.get('/:id', (req, res) => {               // Route - level Middleware : middlwareD
    const id = Number(req.params.id);       // id --> id send by user as request
                                            // b.id --> database me book ki id

    if(isNaN(id)) return res.status(400).json({ error: 'ID must be of type number invalid input' });
    
    const book = Books.find((b) => b.id === id);
    
    if(!book) {
        return res
            .status(404)
            .json({error : `Book with ID ${id} does not exist!` });
    }
    else{
        return res
            .json(book);
    }
});

router.post('/', (req, res) => {

    // console.log(req.headers);
    // console.log(req.body);

    const {title, author} = req.body;

    // input validation
    if(!title || title.trim() === '')   return res.status(400).json({ message: 'title is required' });

    if(!author || author.trim() === '')   return res.status(400).json({ message: 'author is required' });

    // Creating data for POST request
    const newBook = {
        id: Books.length + 1,
        title: title,
        author: author
    };
    Books.push(newBook);
    // console.log(Books);
    
    return res.status(201).json( { message :'Book created success' });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);   

    if(isNaN(id)) return res.status(400).json({ message: 'ID must be of type number invalid input'});

    const indexToDelete = Books.findIndex((b) => b.id === id);

    if(indexToDelete === -1){
        return res
            .status(404)
            .json({ message: 'book does not exist'});
    }
    Books.splice(indexToDelete, 1);

    return res.status(204).end();
});

module.exports = router;          

