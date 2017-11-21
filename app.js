//database config
//
require('./db');

// basic boiler plate for server
const express = require('express');
const app = express();

const mongoose = require("mongoose");

const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//top stop deprication errors
//
mongoose.Promise = global.Promise;

//setup a session

const sessionOptions = {
        secret: 'Blade Runner is better than Blade Runner 2049',
        saveUninitialized: false,
        resave: false
};

app.use(session(sessionOptions));

const Result = mongoose.model("Result");

app.get("/", function(req, res){
    res.render("survey1");
});


app.post("/survey1", function(req, res){

    if (!req.session.result) {
        req.session.result = {};
    }

    //validate form
    //
    if (req.body.gender === undefined || req.body.interest === undefined) {
        res.redirect("/");
    }

    //make new collection
    //
    const newResult = new Result({gender: req.body.gender, interest: req.body.interest});

    //random number to decide if survey taker   //1 if with badges //0 without
    //
    const verifiedSurvey = Math.floor(Math.random() * 2);

    //render the appropriate survey.
    //
    if (newResult.interest === "male") { //show males
        if (verifiedSurvey === 1) {
            res.render("survey2", {imagePath: "Verified_Men", both: false, picId: 1, gender: req.body.gender, interest: req.body.interest});
        }
        else {
            res.render("survey2", {imagePath: "Men", both: false, picId: 2, gender: req.body.gender, interest: req.body.interest});
        }
    }
    else if (newResult.interest === "female") { //show females
        if (verifiedSurvey === 1){
            res.render("survey2", {imagePath: "Verified_Women", both: false, picId: 3, gender: req.body.gender, interest: req.body.interest});
        }
        else {
            res.render("survey2", {imagePath: "Women", both: false, picId: 4, gender: req.body.gender, interest: req.body.interest});
        }

    }
    else { //both
        if (verifiedSurvey === 1) {
            res.render("survey2", {imagePath1: "Verified_Women", imagePath2: "Verified_Men", both: true, picId: 5, gender: req.body.gender, interest: req.body.interest});
        }
        else {
            req.session.result.picId = 6;
            res.render("survey2", {imagePath1: "Women", imagePath2: "Men", both: true, picId: 6, gender: req.body.gender, interest: req.body.interest});
        }

    }


});

app.post("/survey2", function(req, res){

    const collectionToSave = new Result({swipeResults: req.body.person,
                                            picId: req.body.picId,
                                            gender: req.body.gender,
                                            interest: req.body.interest});

    console.log(collectionToSave);

    collectionToSave.save(function(err){
        if(!err){
            res.render("thankyou");
        }
        else {
            res.redirect("survey2");
        }
    });

});



app.listen(3000);
