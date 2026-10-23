const fs = require('node:fs');

exports.loggerMiddleware = function(req, res, next){
    const log = `[${Date.now()}] ${req.method} ${req.url}\n`;
    
    fs.appendFile('./log.txt', log, (err) => {
        if(err) throw new Error('Request not logged');
        
    });
    next();

};

