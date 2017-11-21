// db.js 1st draft DATA MODEL.
const mongoose = require('mongoose');
const fs = require('fs');

//const configString = fs.readFileSync("config.json");
//const configObj = JSON.parse(configString);

//const uri = configObj ? configObj.uri : "mongodb://localhost/SNdata";

const Result = new mongoose.Schema({
    swipeResults: [Number], //number between 1-15 for which they ppl they swiped right on.
    //if user chooses to see both genders when swiping, then women are stored 1-15 for right swipes, and men 16-30.
    picId: Number, //1-6 depending on which set of photos user sees!
    gender: String,
    interest: String
});


//register the models
//
mongoose.model('Result', Result);

//connect to Database.
//
//mongoose.connect(uri, {useMongoClient: true});

mongoose.connect("mongodb://localhost/SNdata", {useMongoClient: true});
