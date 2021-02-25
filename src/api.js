const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

let MODE = 0;

router.get('/getMode', (req, res) => {
    res.json({"mode": MODE});
});

router.post('/updateMode', (req, res) => {
    const number = +req.body.toString();
    if(number === 0 || number === 1 || number === 2){
        MODE = number;
    }
    console.log(MODE);
    res.json({"mode": MODE});
});

router.get('/doAddressCheck', (req, res) => {
    if (MODE === 1) {
        wait();
        res.json({ "action": "timeout" });
    } else if (MODE == 2){        
        res.json({"action": "invalid xml"})
    } else {
        res.json({"action": error})
    }
});


const wait = () => {
    const seconds = 7;
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    console.log(waitTill); 
    while(waitTill > new Date()){}
 }

app.use('/.netlify/functions/api', router);


module.exports.handler = serverless(app);