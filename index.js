const express = require('express');
const bookRouters = require('./routes/book.routes');
const { loggerMiddleware } = require('./middlewares/logger');

const app = express();

const PORT = 8000;


//Middleware
app.use(express.json());

app.use(loggerMiddleware);     

app.use(function(req, res, next) {      // custom 
    // console.log('I am Middleware A');
    //if(hackerDetected) return res.json({ message: 'Boom! I am a Middleware , Hacker detected'});      // req-res completed here if hacker detected
    next();     // send to next - calls whatever is next thing(Middleware/Route) 
    
});

// Routes   
// Mount book routes under the /books prefix.
app.use('/books', bookRouters);      //Ab router ka base path '/books' hai

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));