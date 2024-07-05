var express = require('express');
var router = express.Router();
const con = require('../dbconfig');
var sprintf = require('sprintf');



router.post('/addresult',(req,res)=>{
    try{
        console.log("Welcome to Add Result");
        var cmd = sprintf('INSERT INTO result (userid ,totalquestions,totalcorrectans,category) VALUES (%d, %d,%d,"%s");', req.body.userid, req.body.totalquestions,req.body.totalcorrectans,req.body.category);
        console.log("insert result",cmd);
        con.query(cmd, function (err, result) {
            if (err) {
                res.status(401).send({ "message": err });
              }
              else {
                res.status(200).send({ message: "Successfully Add Result" });
              }
    });
    }
    catch (e) {
        console.log("Catch");
        const statusCode = e.statusCoderes || 500;
        res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });
      } 
})



module.exports = router;
