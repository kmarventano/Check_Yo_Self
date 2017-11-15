/**
 * Website gives users a list of fake tinder profiles.
 * Half of the users are given regular profiles, the other
 * half are given profiles that are verified STD free. The only
 * data stored on users is their gender and sexual preferences,
 * and whether they swiped left or right on a particular profile
 */

// Bring in all the frameworks
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");
const mongoose = require('mongoose');


// express static setup
app.use(express.static(path.join(__dirname, 'public')));

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));


// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Our schema
require('./db');

// Our only page
app.get('/', function(req, res) {
    // Generate a random number to decide if user gets verified profiles
    const x = Math.round(Math.random())

    // Unverified
    if (x == 0){

    }

    // Verified
    else {

    }
});

// Listen in on 3000
app.listen(3000);