const http = require('http');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	console.log('Request sent');
	res.render('index');
})
app.listen(8080);
console.log('Listening on port 8080');