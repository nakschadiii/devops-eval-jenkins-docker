const { app, server, port, bodyParser } = require('./nodeServ');
const { fs, getData, fields, baseFile } = require('./header');

app.get('/cards', (req, res) => res.status(200).type('json').send(getData()));
app.get('/cards/:id', (req, res) => {
	let data = JSON.parse(getData() || "[]");
	if (!data.find(row => row.__id === parseInt(req.params.id))) 
		return res
			.status(404)
			.type('text')
			.send(`La carte ${req.params.id} n'existe pas`);

	res.status(200).type('json').send(getData().find( row = __id === req.params.id ))
});
app.post('/cards', (req, res) => {
	let fieldsRequired = fields.filter(r => req.body[r] === undefined)
	if (fieldsRequired.length > 0)
		return res
			.status(400)
			.type('text')
			.send(`Le(s) champ(s) ${fieldsRequired.join(', ')} indéfini(s)`);

	let data = JSON.parse(getData() || "[]");
	data = [...data, {
		__id: data.length+1,
		...req.body
	}];

	fs.writeFile(baseFile, JSON.stringify(data, null, 4), err => {
		if(err) console.log(err);
		res.status(200).type('json').send(getData() || "[]");
	});
});
app.put('/cards/:id', (req, res) => {
	let data = JSON.parse(getData() || "[]");
	if (!data.find(row => row.__id === parseInt(req.params.id))) 
		return res
			.status(404)
			.type('text')
			.send(`La carte ${req.params.id} n'existe pas`);

	data[data.findIndex(row => row.__id === parseInt(req.params.id))] = {
		...data.find(row => row.__id === parseInt(req.params.id)),
		...req.body
	};

	fs.writeFile(baseFile, JSON.stringify(data, null, 4), err => {
		if(err) console.log(err);
		res.status(200).type('json').send(getData() || "[]");
	});
});
app.delete('/cards', (req, res) => {
	fs.writeFile(baseFile, JSON.stringify([], null, 4), err => {
		if(err) console.log(err);
		res.status(200).type('json').send(getData() || "[]");
	});
});
app.delete('/cards/:id', (req, res) => {
	let data = JSON.parse(getData() || "[]");
	if (!data.find(row => row.__id === parseInt(req.params.id))) 
		return res
			.status(404)
			.type('text')
			.send(`La carte ${req.params.id} n'existe pas`);

	data = data.filter(row => row.__id !== parseInt(req.params.id));
	fs.writeFile(baseFile, JSON.stringify(data, null, 4), err => {
		if(err) console.log(err);
		res.status(200).type('json').send(getData() || "[]");
	});
});

app.get('/search/:search', (req, res) => {
	res.status(200).send(JSON.parse(getData() || "[]").filter((row, i) => {
		return Object.entries(row).filter(entries => {
			return (
				entries[1] === req.params.search ||
				entries[1].toString().includes(req.params.search)
			)
		}).length>0;
	}));
});
app.post('/search/', (req, res) => {
	res.status(200).send(JSON.parse(getData() || "[]").filter((row, i) => {
		return !Object.entries(req.body).map(entries => {
			return (
				row[entries[0]] === entries[1] || row[entries[0]].toString().includes(entries[1])
			)
		}).includes(false);
	}));
});

app.all('*', (req, res) => res.status(400).send("Mauvaise requête"));

server.listen(port, () => console.log('listening on port ' + port)); 