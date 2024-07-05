var express = require('express');
var router = express.Router();
const con = require('../dbconfig');
const moment = require('moment');
const bcrypt = require('bcryptjs');
var sprintf = require('sprintf');
const jsonwebtoken = require('jsonwebtoken');
const nodemailer = require("nodemailer");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



const authcheck = (req, res, next) => {
  headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": ' <origin>',
    "Access-Control-Allow-Credentials": true
  };
  // console.log(headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, (err, obj) => {

    if (err) {
      console.log("error", err);
      return res.sendStatus(403);
    }
    req.username = obj.username;
    req.password = obj.password;
    next();

  })
}

//end 

//st auth login

router.post('/auth', async function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    cmd ='SELECT *FROM user as usr, userrolemap as urm WHERE usr.userid=urm.userid AND username ="'+request.body.username+'"and password="'+request.body.password+'"';
    con.query(cmd,function (error, results) {
      console.log(cmd)
    
    // con.query('SELECT *FROM user as usr, userrolemap as urm WHERE usr.userid=urm.userid AND username = ?  ', [request.body.username], function (error, results) {
      if (results.length > 0) {
        const accesstoken = jsonwebtoken.sign({ username, password }, process.env.ACCESS_TOKEN);
        console.log("token", accesstoken);
        var type = '';
        if (results[0].roleid == 1) {
          type = "Admin"
          var cdatetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          console.log(cdatetime);
          console.log(results[0].userid);
          console.log(results[0].username);
          var userdetail = sprintf('insert into logindetail (userid,username,logindatetime,usertype,status) VALUES (%d,"%s","%s","%s",%b)', results[0].userid, results[0].username, cdatetime, type, 1);
          con.query(userdetail, function (res, res) {
            response.status(200).send({ accesstoken: accesstoken, usertype: type, username: results[0].username, userid: results[0].userid, email: results[0].email, phonenumber: results[0].phonenumber, firstname: results[0].firstname, message: "Admin Login Sucessfully" });
            response.end();
          })
        }
        else if (results[0].roleid == 2) {
          type = "Customer"
          var cdatetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          console.log(cdatetime);
          console.log(results[0].userid);
          console.log(results[0].username);
          var userdetail = sprintf('insert into logindetail (userid,username,logindatetime,usertype,status) VALUES (%d,"%s","%s","%s",%b)', results[0].userid, results[0].username, cdatetime, type, 1);
          con.query(userdetail, function (res, res) {
            // console.log("ma",res);
            response.status(200).send({ accesstoken: accesstoken, usertype: type, username: results[0].username, userid: results[0].userid, email: results[0].email, phonenumber: results[0].phonenumber, firstname: results[0].firstname, message: "Manager Login Sucessfully " });
            response.end();
          })
        }
      }
      else {
        response.status(401).send('Incorrect Username and/or Password!');
        response.end();
      }

    }
    );
  } else {
    response.status(401).send('Please enter Username and Password!');
    response.end();
  }
});




//end multiple

//end auth login

router.post('/addusers', function (req, res) {
  try {
    console.log("Welcome to Add User Page");
    con.query("select count(email) count from user where email=?", [req.body.email], async (error, result) => {
      console.log("Error", error, result[0].count);
      if (result[0].count > 0) {
        res.send({ status: true, message: "Already email id exist give correct email id " })
        console.log("Already email id exist give correct email id")
        return;
      }
      else {
        let hashedPassword = await bcrypt.hash(req.body.password, 8);
        console.log(hashedPassword);
        console.log(req.body);
        cdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        var command = sprintf('INSERT INTO user (name,email,phonenumber,address,area,pincode,username,password,createddate,status) VALUES ("%s","%s","%s","%s","%s","%s","%s","%s","%s",%b)', req.body.name, req.body.email, req.body.phonenumber, req.body.address, req.body.area, req.body.pincode, req.body.username, hashedPassword, cdate, 1);
        console.log(command);
        con.query(command, function (err, mysqlres1) {
          if (err) throw err;
          console.log("Error", err);
          userid = mysqlres1.insertId;
          console.log(userid);
          var cmd = sprintf('INSERT INTO otpstore (userid ,email,status) VALUES (%d, "%s",%b);', userid, req.body.email,1);
          con.query(cmd, function (err, mysqlres2) {
                      var command = sprintf('INSERT INTO userrolemap (userid ,roleid,status) VALUES (%d,%d,%b)', userid, req.body.roleid, 1);
          con.query(command, function (err, mysqlres2) {
            console.log("role", command);
            // console.log("proof",command1);
            if (err) {
              res.status(401).send({ "message": err });
            }
            else {
              res.status(200).send({ message: "Successfully Register" });
            }
          })
        })
        })
        }}
  )
  }

  catch (e) {
    console.log("Catch", e.err);
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });

  }
})

//st forgot password
router.post('/forgotpassword', authcheck, async function (req, res) {
  var email = req.body.email;
  let hashedPassword = await bcrypt.hash(req.body.password, 8);
  console.log(hashedPassword);

  var command = 'UPDATE user SET password="' + hashedPassword + '" WHERE email = "' + email + '"';
  let data = [true, 1];
  con.query(command, data, function (error, result) {
    if (result.affectedRows >= 1) {
      console.log("Done");
      res.status(200).send({ message: "Successfully Changed Password" });

    }
    else {
      res.status(400).send({ status: false, message: "Pls check Email Id" });
      console.log("Pls check Email Id");

    }
  });

});


//end change password


//update user st
router.post('/updateuser', authcheck,function (req, res) {
  console.log("Welcome to update user ");
  var id = req.body.userid;
  var name = req.body.name;
  var email = req.body.email;
  var phonenumber = req.body.phonenumber;
  var address = req.body.address;
  var area = req.body.area;
  var pincode = req.body.pincode;


  var command = 'UPDATE user SET name="' + name + '", email="' + email + '", phonenumber="' + phonenumber + '",address="' + address + '", area="' + area + ' ",pincode="' + pincode + '" WHERE userid=' + id + '';
  console.log(command);
  let data = [true, 1];
  con.query(command, data, function (error, result) {
    // console.log(result.affectedRows);
    if (result.affectedRows <= 0) {
      res.send({ status: false, message: "No User Id Pls check User id" });
      console.log(error);
      // throw error;
    }
    else {
      res.status(200).send({ message: "Successfully update user" });
    };
  });

})

//end user update


//soft del  st
router.post('/softdeluser',  function (req, res) {
  console.log("Welcome to soft del  user ");
  var id = req.body.userid;
  // var status = req.body.status;
  var command = 'UPDATE user SET status=0 WHERE userid=' + id + '';
  console.log(command);
  let data = [true, 1];
  con.query(command, data, function (error, result) {
    // console.log(result.affectedRows);
    if (result.affectedRows <= 0) {
      res.send({ status: false, message: "No User Id Pls check User id" });
      console.log(error);
      // throw error;
    }
    else {
      res.status(200).send({ message: "Successfully Soft Del user" });
    };
  });

})



//end soft Del

//st send email
router.get('/generateOTP', (req, res) => {

  // var email = req.body;
  var otpCode = Math.floor(100000 + Math.random() * 900000);
  console.log("otpcode", otpCode);
  var ctime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  var tentime = moment(Date.now()).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  console.log("ten", tentime);
  console.log("ctime",ctime)
  var cmd='UPDATE otpstore SET otpno="'+otpCode+'",otpctime="'+ctime+'",otpetime="'+tentime+'" WHERE email="'+req.query.email+'"';
  console.log(cmd);
  let data = [true, 1];
  con.query(cmd,data,async function(err,result){
    
    if (result.affectedRows <= 0) {
      res.send({ status: false, message: "No Email Pls check" });
      console.log("err",err);
      // throw error;
    }
    else {
      try{
        const transporter = nodemailer.createTransport({
          host: process.env.HOST,
          service: process.env.SERVICE,
          port: 465,
          secure: true,
          auth: {
              user: process.env.USER,
              pass: process.env.PASS,
          },
      });
         await transporter.sendMail({
          from: process.env.USER,
          // to: ["muthu@stashook.com","muthuslm2006@gmail.com"],
            to: req.query.email,
               subject:"OTP",
          text:"Otp : " + otpCode
      });   
      console.log("email sent sucessfully");
      // res.send("email sent sucessfully");
      res.status(200).send({message:"Successfully update and send email "});

      }
      catch (error) {
        console.log(error, "email not sent")
    }
    }
})
}
);
//end  send email

// st verify otp

  router.post('/verifyOTP',  (req, res) => {
    try {
      // var inputotp = req.body.inputotp;
      // console.log(req.body);
      // var cmd = ('select count(otp,otpetime from otpstore where userid=' + req.body.userid);
      // usrid = req.body.userid;
      // console.log(usrid);
      ctime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      console.log(ctime);
      otp = req.body.inputotp
      console.log("otp", otp);
      // console.log(userid);
      var cmmd = ('select count(otpno) as counting from otpstore where email="' + req.body.email +'" AND otpetime>"' + ctime + '" AND otpno=' + otp + '');
      console.log("cmd", cmmd);
      con.query(cmmd, function (error, result) {
        console.log("count", result[0].counting);
        if (result[0].counting >= 1) {
          res.send({ status: true, message: "Successfully Verify " });
        }
        else {
          console.log("Error", error)
          // res.send({ "Message": "Unable to get Date " });
          res.send({ status: false, message: "Expired OTP Or Unable to get data" });
        }
      })
    }
    catch (err) {
      console.log("Catch");
      const statusCode = e.statusCoderes || 500;
      res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });

    }

  })



  // end verify otp



//st get user 

router.get('/getuser', function (req, res) {
  try {
    command = 'select * from user';
    con.query(command, function (error, results) {
      if (error) {
        res.send("Unable to get Date ")
      }
      else {
        res.send(results);
      }
    })
  }
  catch (e) {
    console.log("Catch");
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });
  }

})




//end get user 


module.exports = router;
