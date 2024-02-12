//const fs = require('fs');
//console.log(fs.readFileSync('./myfirstJSON.json', 'utf-8'));

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.type('html').send('<h1>Welcome</h1>')
});

app.listen(80, () => console.log('listening on port ' + 80)); 