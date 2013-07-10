// SimpleJSTokenizer tokenizes simplified JavaScript
// MIT License, 2013
// Saman Sedighi Rad <saman@posteo.de>

var tokenizer = require('./tokenizer').tokenizer,
    fs = require('fs'),
    file = './' + (process.argv.splice(2)[0]);

fs.readFile(file, {encoding: 'utf8', flag: 'r'}, function (err, data) {
    if (err) {
        throw err;
    } else {
        try {
            var tokens = tokenizer(data);
            console.log(tokens);
        } catch (e) {
            console.log(e.message);
        }
    }
});