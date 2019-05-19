var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'EE474' });
// });
router.get('/', function(req, res, next) {
  if (req.query.cmd){
      console.log("input: ",req.query.cmd);
      exec(req.query.cmd, function (err, stdout, stderr) {
      //Print stdout/stderr to console
      console.log(stdout);
      console.log(stderr);
      //Simple response to user whenever localhost:3003 is accessed
      res.render('index', { title: 'EE474', data: stdout });
    });
  }
  else {res.render('index', { title: 'EE474', data: "" });}
});




module.exports = router;
