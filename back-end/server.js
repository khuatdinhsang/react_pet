const express = require('express');
const app = express();
const cors = require('cors')
var bodyParser = require('body-parser')
const dataDog = require('./dog.json');
const dataCat = require('./cat.json');
const dataFood = require('./food.json');
const dataSupplies = require('./supplies.json');
const dataUser = require('./user.json');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// Define the API endpoint
app.get('/dogs', (req, res) => {
    // Map the JSON data to the API endpoint
    res.json(dataDog);
});
app.get('/dogs/:id', (req, res) => {
    let id = req.params.id;
    res.json(dataDog[id - 1]);
});
app.get('/cats', (req, res) => {
    // Map the JSON data to the API endpoint
    res.json(dataCat);
});
app.get('/cats/:id', (req, res) => {
    let id = req.params.id;
    res.json(dataCat[id - 1]);
});
app.get('/food', (req, res) => {
    // Map the JSON data to the API endpoint
    res.json(dataFood);
});
app.get('/food/:id', (req, res) => {
    let id = req.params.id;
    res.json(dataFood[id - 1]);
});
app.get('/supplies', (req, res) => {
    // Map the JSON data to the API endpoint
    res.json(dataSupplies);
});
app.get('/supplies/:id', (req, res) => {
    let id = req.params.id;
    res.json(dataSupplies[id - 1]);
});
app.get('/users', (req, res) => {
    res.json(dataUser);
});
app.post('/users', (req, res) => {
    const customer = req.body;
    dataUser.push(customer);
    res.json(dataUser);
});
app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    let customer = req.body;
    const dataUser = dataUser.map((user) => user.id === id ? customer : user)
    res.json(dataUser);
});

// Serve the API
app.listen(5000, () => {
    console.log('API listening on port 5000!');
});
