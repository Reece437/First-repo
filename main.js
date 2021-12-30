const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	console.log('Request sent');
	res.render('index');
})
app.listen(port, () => {
	console.log(`listening on port ` + port)
});
