var express	 = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').createServer(app);

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'view')));

// HTTP configuration

app.use(bodyParser.text());

app.use(bodyParser.urlencoded({
	extended: true
}));

http.listen(1111, function() {
	console.log('HTTP server listening on port: ' + 1111);
});

// Routes

app.get('/get', function(req, res){
	fs.readFile('ip.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        res.send(data);
    });
});

app.post('/', function(req, res){
    console.log(req.body);

    let writeStream = fs.createWriteStream('ip.txt');
	fs.writeFile('ip.txt', req.body, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('IP saved!');
    });

    res.send(req.body);
});


app.get('/change', function(req, res){
    res.sendFile(__dirname + '/view/index.html');
});