const [port, express, http, bodyParser] = [80, require('express'), require('node:http'), require('body-parser')];
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = { port, express, server, app, http, bodyParser };