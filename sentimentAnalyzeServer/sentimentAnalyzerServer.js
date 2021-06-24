const express = require('express');
const dotenv = require('dotenv');

const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});

app.get("/url/emotion", (req,res) => {

    console.log("A client pinged server endpoint /url/emotion with query " + req.query.url);
    console.log("Now constructing request body for IBM API...");

    const analyzeParams = {
        "url": req.query.url,
        "features": {
          "emotion": {}
        }
    };

    console.log("Getting object instance of Natural Language Understanding service...");
    let ibm = getNLUInstance();

    console.log("Submitting parameters for analysis...");
    ibm.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("Response received.")
            let emotion = JSON.stringify(analysisResults.result.emotion.document.emotion);
            console.log("Document sentiment is " + emotion);
            console.log("Responding to client...");
            return res.send(emotion);
        })
        .catch(err => {
            return res.send(`error: ${err}`);
        });

});

app.get("/url/sentiment", (req,res) => {

    console.log("A client pinged server endpoint /url/sentiment with query " + req.query.url);
    console.log("Now constructing request body for IBM API...");

    const analyzeParams = {
        "url": req.query.url,
        "features": {
          "sentiment": {}
        }
    };

    console.log("Getting object instance of Natural Language Understanding service...");
    let ibm = getNLUInstance();

    console.log("Submitting parameters for analysis...");
    ibm.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("Response received.")
            let sentiment = analysisResults.result.sentiment.document.label;
            console.log("Document sentiment is " + sentiment);
            console.log("Responding to client...");
            return res.send(sentiment);
        })
        .catch(err => {
            return res.send(`error: ${err}`);
        });
});

app.get("/text/emotion", (req,res) => {
    console.log("A client pinged server endpoint /text/emotion with query " + req.query.text);
    console.log("Now constructing request body for IBM API...");

    const analyzeParams = {
        "text": req.query.text,
        "features": {
          "emotion": {}
        }
    };

    console.log("Getting object instance of Natural Language Understanding service...");
    let ibm = getNLUInstance();

    console.log("Submitting parameters for analysis...");
    ibm.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("Response received.")
            let emotion = JSON.stringify(analysisResults.result.emotion.document.emotion);
            console.log("Document sentiment is " + emotion);
            console.log("Responding to client...");
            return res.send(emotion);
        })
        .catch(err => {
            return res.send(`error: ${err}`);
        });
});

app.get("/text/sentiment", (req,res) => {
    console.log("A client pinged server endpoint /text/sentiment with query " + req.query.text);
    console.log("Now constructing request body for IBM API...");

    const analyzeParams = {
        "text": req.query.text,
        "features": {
          "sentiment": {}
        }
    };

    console.log("Getting object instance of Natural Language Understanding service...");
    let ibm = getNLUInstance();

    console.log("Submitting parameters for analysis...");
    ibm.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("Response received.")
            let sentiment = analysisResults.result.sentiment.document.label;
            console.log("Document sentiment is " + sentiment);
            console.log("Responding to client...");
            return res.send(sentiment);
        })
        .catch(err => {
            return res.send(`error: ${err}`);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

