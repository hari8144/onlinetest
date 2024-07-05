var express = require('express');
var router = express.Router();
const con = require('../dbconfig');
// var authcheck = require('./authentication')
// var sprintf = require('sprintf-js').sprintf;
// const moment = require('moment');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const nodemailer = require("nodemailer");


router.get('/qa', function (req, res) {
    try {
        console.log("Welcome to Qustion Block");
        // cmd = '	SELECT * from selfguru order by RAND() LIMIT ' + req.query.limit + '';
cmd=	"SELECT sgid, questionname, json_array(JSON_OBJECT('key',1,'value',option1),JSON_OBJECT('key',2,'value', option2),JSON_OBJECT('key',3,'value', OPTION3),JSON_OBJECT('key',4,'value', OPTION4)) AS optionlist, correctans, status, catagory from selfguru order by RAND() LIMIT " + req.query.limit ;
console.log(cmd);
        con.query(cmd, function (err, result) {
            // console.log(result);
            console.log(result.length);
            if (result.length > 0) {
                // var ress=JSON.stringify(result);
                // res.send(JSON.parse(ress) );
                var i = 0;
            for (var obj in result) {

              console.log(result[obj],"obj-result", result[obj].optionlist);
              result[obj].optionlist =JSON.parse(result[obj].optionlist)
           };
            res.send(result);
            
            
                
                        }
                                // }
            else {  res.send("Pls give correct input");
        }
          }        )
    }
    catch (e) {
    console.log("Catch");
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });
}
    
});

module.exports = router;


