const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const admissionsRoutes = require('./routes/admissionsRoutes');

// Environment variables for database username and password
const dbUser = process.env.atlasUser;
const dbPass = process.env.atlasPassword;
const clusterName = process.env.atlasClusterName;
const dbName = process.env.atlasDBName;
const dbURI = `mongodb+srv://${dbUser}:${dbPass}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

// express app
const app = express();

// connect to MongoDB
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// routes

app.get('/health-check', (req, res) => {
    res.send('OK');
});

app.use('/admissions', admissionsRoutes);

app.use((req, res) => {
    res.status(404).send('Invalid URL');;
});