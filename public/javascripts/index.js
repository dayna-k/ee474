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

var slider2 = document.getElementById("myRange2");
var slider2_val = document.getElementById("slidevalue2");

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  slider1_val.innerHTML = ": "+this.value;
  localStorage.setItem('top_val', slider1.value);
}

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  slider2_val.innerHTML = ": "+this.value;
  localStorage.setItem('bottom_val', slider2.value);
}

function btn_color(){
  console.log("btn_color clicked");
  console.log("top_val: ", localStorage.getItem('top_val'))
  console.log("bottom_val: ", localStorage.getItem('bottom_val'))
  //$("#output_img")[0].src = "/images/output/"+input_img;
  $("#output_img")[0].src = "/py_code/output/output.jpg";
  $("#cmd_submit").click();
}

function btn_reset(){
  localStorage.setItem('input_img', "/images/input1.jpg");
  localStorage.setItem('output_img', "/images/output1.jpg");
  localStorage.setItem('top_val', 50);
  localStorage.setItem('bottom_val', 50);
  $("#myRange1")[0].value = localStorage.getItem('top_val');
  slider1_val.innerHTML = "value: "+$("#myRange1")[0].value;
  $("#myRange2")[0].value = localStorage.getItem('bottom_val');
  slider2_val.innerHTML = "value: "+$("#myRange2")[0].value;


  location.href="/";
}

function setPng24(obj) {
        obj.width=obj.height=1;
        obj.className=obj.className.replace(/\bpng24\b/i,'');
        obj.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
        obj.src='';
        return '';
    }


$(document).ready(function () {
  console.log(localStorage.getItem('input_img'))
  console.log(localStorage.getItem('output_img'))
  console.log(localStorage.getItem('top_val'))
  console.log(localStorage.getItem('bottom_val'))
  $("#input_img")[0].src = localStorage.getItem('input_img');
  $("#output_img")[0].src = localStorage.getItem('output_img');
  $("#myRange1")[0].value = localStorage.getItem('top_val');
  slider1_val.innerHTML = ": "+$("#myRange1")[0].value;
  $("#myRange2")[0].value = localStorage.getItem('bottom_val');
  slider2_val.innerHTML = ": "+$("#myRange2")[0].value;
  setTimeout(function() {
    console.log('Reload!')
    console.log(localStorage.getItem('input_img'))
    console.log(localStorage.getItem('output_img'))
    console.log(localStorage.getItem('top_val'))
    console.log(localStorage.getItem('bottom_val'))
    $("#input_img")[0].src = localStorage.getItem('input_img');
    $("#output_img")[0].src = localStorage.getItem('output_img');
    $("#myRange1")[0].value = localStorage.getItem('top_val');
    slider1_val.innerHTML = ": "+$("#myRange1")[0].value;
    $("#myRange2")[0].value = localStorage.getItem('bottom_val');
    slider2_val.innerHTML = ": "+$("#myRange2")[0].value;
  }, 4000);




  $("#getimg").change(function () {
    var imgname = document.getElementById("getimg");
    var file = $("#getimg").prop("files")[0];
    console.log("file: ", file.name);
    //localStorage.setItem('input_img', "/images/input/"+file.name);
    localStorage.setItem('input_img', "/py_code/input/"+file.name);
    console.log("input_img: ", localStorage.getItem('input_img'))
    $("#input_img")[0].src = localStorage.getItem('input_img');
    //localStorage.setItem('output_img', "/image/output/"+file.name);
    //localStorage.setItem('output_img', "/py_code/output/"+file.name);
    localStorage.setItem('output_img', "/py_code/output/output.jpg");
    console.log("output_img: ", localStorage.getItem('output_img'))
    input_img = file.name;
    // $("#output_img")[0].src = localStorage.getItem('output_img');
    //console.log(input_img);

    $("#target_input")[0].value = "cd public/py_code; source activate pbj; python myUI.py --images ./input/"+file.name+" --top "+localStorage.getItem('top_val')+" --bottom "+localStorage.getItem('bottom_val')+"; sleep 5; pwd";
    // $("#target_input")[0].value = "cd public/py_code && source activate pbj && python myUI.py --images ./input/"+file.name+" --top "+localStorage.getItem('top_val')+" --bottom "+localStorage.getItem('bottom_val') && sleep(7) && pwd;

    var cmd_input = document.getElementById("target_input");
    console.log("cmd_input: ", cmd_input.value);
    //console.log("cmd: ", req.query.cmd);
    // exec_cmd($("#target_input")[0].value);
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
