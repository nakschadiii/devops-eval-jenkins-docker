const fs = require('fs');
const baseFile = './myfirstJSON.json';
let getData = () => fs.readFileSync(baseFile, 'utf-8');
let fields = ['name', 'note', 'hp'];

module.exports = { fs, baseFile, getData, fields }