// Controllers : actual logic to do something exists here
// Controllers are responsible for handling incoming requests, processing them, and returning the appropriate responses. They act as an intermediary between the models (which handle data) and the views (which handle presentation).
// Critical file , needs to be secure.

// "Controllers is interacting with the Models(db) to perform CRUD operations" and send back to the ROUTES file , which sends backs to index.js file, which sends back to the client(View).
const {Books} = require('../models/book');      //{ Books } extracts ONLY the books property from the exported object.

exports.getAllBooks = function(req, res){  
    res.setHeader('x-name', 'ameya');
    return res.json(Books);
     
};

exports.getBookById = function(req, res){              
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
};

exports.createBook = function(req, res){
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
};

exports.deleteBookById = function(req, res){
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
};