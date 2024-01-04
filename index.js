'use strict'

const express = require('express');
const client = require('prom-client');
// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

// Define the route for the root path ("/")
app.get('/', (req, res) => {
    const sentence = 'Welcome to the CICD Automation world';

    // Send the sentence as the response
    res.json({ sentence });
});

app.get('/metrics', async(req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "pong" })
});
app.get('/error', (req, res) => {
    // Simulating an internal server error (500)
    const error = new Error('Internal Server Error');
    res.status(500).json({ error: error.message });
});
app.listen(PORT, HOST);
console.log('running on http://${HOST}:${PORT}')
