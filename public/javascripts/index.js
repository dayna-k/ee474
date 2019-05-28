// index.js



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'EE474' });
// });
// var express = require('express');
// var router = express.Router();
// var exec = require("child_process").exec;


var input_img = ""

var slider1 = document.getElementById("myRange1");
var slider1_val = document.getElementById("slidevalue1");
slider1_val.innerHTML = "value: "+slider1.value; // Display the default slider value

var slider2 = document.getElementById("myRange2");
var slider2_val = document.getElementById("slidevalue2");
slider2_val.innerHTML = "value: "+slider2.value; // Display the default slider value

window.top_val = slider1.value;
window.bottom_val = slider2.value;

$("#myRange1")[0].value = window.top_val;
console.log("top_val: ", window.top_val);
console.log("bottom_val: ", window.bottom_val);

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  slider1_val.innerHTML = "value: "+this.value;
  window.top_val = this.value;
}

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  slider2_val.innerHTML = "value: "+this.value;
  window.bottom_val = this.value;
}

function btn_color(){
  console.log("btn_color clicked");
  console.log("top_val: ", window.top_val);
  console.log("bottom_val: ", window.bottom_val);
  $("#output_img")[0].src = "/images/output/"+input_img;
  // $("#cmd_submit").click();
}

function btn_reset(){
  location.href="/";
}



$(document).ready(function () {


  $("#getimg").change(function () {
    var imgname = document.getElementById("getimg");
    var file = $("#getimg").prop("files")[0];
    console.log("file: ", file.name);
    // console.log($("#input_img")[0]);
    $("#input_img")[0].src = "/images/input/"+file.name;
    input_img = file.name;
    console.log(input_img);

    $("#target_input")[0].value = "pwd";
    var cmd_input = document.getElementById("target_input");
    console.log("cmd_input: ", cmd_input.value);
    //console.log("cmd: ", req.query.cmd);
    // exec_cmd($("#target_input")[0].value);
    //$("#cmd_submit").click();
  })


});



//
// function exec_cmd(input){
//   exec($("#target_input")[0].value, function (err, stdout, stderr) {
//   //Print stdout/stderr to console
//     console.log("output: ", stdout);
//   })
// }
//
// router.get('/', function(req, res, next) {
//
//   if (req.query.cmd){
//       console.log("input: ",req.query.cmd);
//       exec(req.query.cmd, function (err, stdout, stderr) {
//       //Print stdout/stderr to console
//       console.log("output: ", stdout);
//       // console.log("error: ", stderr);
//
//       res.render('index', { title: 'EE474', data: stdout });
//     });
//   }
//   else {res.render('index', { title: 'EE474', data: "" });}
// });
//
// module.exports = router;
