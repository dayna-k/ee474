// index.js



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'EE474' });
// });
// var express = require('express');
// var router = express.Router();
// var exec = require("child_process").exec;


var input_img = ""
var color_list = [["var(--color1)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"],
["var(--default_s_2)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"],
["var(--default_s_3)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"],
["var(--default_s_4)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"],
["var(--default_s_5)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"]];

var prev_t = 0;
var prev_t_color_r = 0;
var prev_t_color_c = 0;
var prev_b = 0;
var prev_b_color = 0;
var top_count = 0;


$("#color_table_top td").click(function(){
  var str ="";
  var td = $(this);
  var tr = $(this).parent();
  var color_top_s = document.getElementById("color_box_top_s");
  var table_top_s = document.getElementById("color_table_top_s");
  var color_bottom_s = document.getElementById("color_box_bottom_s");
  var table_bottom_s = document.getElementById("color_table_bottom_s");

  console.log("클릭된 top color는 "+td.text());
  prev_t = td.text();
  console.log(prev_t);

  /* border setting, color setting of s_table */
  for (var i=0; i<10; i++){
    if (tr[0].cells[i].classList.length == 1){
      tr[0].cells[i].classList.remove("color_h_clicked");
      for(var j=0; j<5; j++){
        table_top_s.rows[j].cells[i].style.backgroundColor = "white";
        table_top_s.rows[j].cells[i].style.color = "white";
        table_top_s.rows[j].cells[i].classList.remove("selected_col");
        table_top_s.rows[j].cells[i].classList.remove("color_h_clicked");
      }
    }
  }


  this.classList.add("color_h_clicked");
  for (var k=0; k<5; k++){
    table_top_s.rows[k].cells[td.text()-1].style.backgroundColor = color_list[k][td.text()-1];
    table_top_s.rows[k].cells[td.text()-1].style.color = color_list[k][td.text()-1];
    table_top_s.rows[k].cells[td.text()-1].classList.add("selected_col");
  }

  if(color_top_s.style.display=='none'){
    // color_top_s.style.display = 'block';
    $("#color_box_top_s").slideDown(500);
  }
  if(color_bottom_s.style.display!='none'){
    // color_top_s.style.display = 'block';
    $("#color_box_bottom_s").slideUp(500);
  }
})

$("#color_table_top_s td").click(function(){
  var table_top_s = document.getElementById("color_table_top_s");
  var table_bottom_s = document.getElementById("color_table_bottom_s");
  var ts_td = $(this);
  var tr = $(this).parent();
  var row = 0;
  var col = 0;
  top_count = 0;

  // console.log("clicked td: ", ts_td);
  // console.log("tr: ", tr);
  console.log("클릭된 top color는 "+ ts_td.text());

  if (ts_td.text()%10 == 0){
    row = parseInt(ts_td.text()/10)-1;
    col = 10;
  }else{
    row = parseInt(ts_td.text()/10);
    col = ts_td.text()%10;
  }
  for (var j=0; j<5; j++){
        table_top_s.rows[j].cells[col-1].classList.remove("color_h_clicked");
  }

  this.classList.add("color_h_clicked");
  prev_t_color_r = row;
  prev_t_color_c = col;
  console.log("row: ", prev_t_color_r);
  console.log("col: ", prev_t_color_c);
  top_count = 1;

})

$("#color_table_bottom td").click(function(){
  var str ="";
  var td = $(this);
  var tr = $(this).parent();
  var color_top_s = document.getElementById("color_box_top_s");
  var table_top_s = document.getElementById("color_table_top_s");
  var color_bottom_s = document.getElementById("color_box_bottom_s");
  var table_bottom_s = document.getElementById("color_table_bottom_s");

  console.log("클릭된 top color는 "+td.text());
  prev_t = td.text();
  console.log(prev_t);

  /* border setting, color setting of s_table */
  for (var i=0; i<10; i++){
    if (tr[0].cells[i].classList.length == 1){
      tr[0].cells[i].classList.remove("color_h_clicked");
      for(var j=0; j<5; j++){
        table_bottom_s.rows[j].cells[i].style.backgroundColor = "white";
        table_bottom_s.rows[j].cells[i].style.color = "white";
        table_bottom_s.rows[j].cells[i].classList.remove("selected_col");
        table_bottom_s.rows[j].cells[i].classList.remove("color_h_clicked");
      }
    }
  }


  this.classList.add("color_h_clicked");
  for (var k=0; k<5; k++){
    table_bottom_s.rows[k].cells[td.text()-1].style.backgroundColor = color_list[k][td.text()-1];
    table_bottom_s.rows[k].cells[td.text()-1].style.color = color_list[k][td.text()-1];
    table_bottom_s.rows[k].cells[td.text()-1].classList.add("selected_col");
  }

  if(color_bottom_s.style.display=='none'){
    // color_top_s.style.display = 'block';
    $("#color_box_bottom_s").slideDown(500);
  }
  if(color_top_s.style.display!='none'){
    // color_top_s.style.display = 'block';
    $("#color_box_top_s").slideUp(500);
  }
})

/*
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
}*/

function btn_color(){
  console.log("btn_color clicked");
  console.log("top_val: ", localStorage.getItem('top_val'))
  console.log("bottom_val: ", localStorage.getItem('bottom_val'))
  //$("#output_img")[0].src = "/images/output/"+input_img;
  $("#output_img")[0].src = "/py_code/output/output.jpg";
  $("#cmd_submit").click();
}

function btn_reset(){
  localStorage.setItem('input_img', "/py_code/input/test.jpg");
  localStorage.setItem('output_img', "/py_code/output/output.jpg");
  // localStorage.setItem('top_val', 50);
  // localStorage.setItem('bottom_val', 50);
  // $("#myRange1")[0].value = localStorage.getItem('top_val');
  // slider1_val.innerHTML = "value: "+$("#myRange1")[0].value;
  // $("#myRange2")[0].value = localStorage.getItem('bottom_val');
  // slider2_val.innerHTML = "value: "+$("#myRange2")[0].value;


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
  // console.log(localStorage.getItem('top_val'))
  // console.log(localStorage.getItem('bottom_val'))
  $("#input_img")[0].src = localStorage.getItem('input_img');
  $("#output_img")[0].src = localStorage.getItem('output_img');
  // $("#myRange1")[0].value = localStorage.getItem('top_val');
  // slider1_val.innerHTML = ": "+$("#myRange1")[0].value;
  // $("#myRange2")[0].value = localStorage.getItem('bottom_val');
  // slider2_val.innerHTML = ": "+$("#myRange2")[0].value;
  setTimeout(function() {
    console.log('Reload!')
    console.log(localStorage.getItem('input_img'))
    console.log(localStorage.getItem('output_img'))
    // console.log(localStorage.getItem('top_val'))
    // console.log(localStorage.getItem('bottom_val'))
    $("#input_img")[0].src = localStorage.getItem('input_img');
    $("#output_img")[0].src = localStorage.getItem('output_img');
    // $("#myRange1")[0].value = localStorage.getItem('top_val');
    // slider1_val.innerHTML = ": "+$("#myRange1")[0].value;
    // $("#myRange2")[0].value = localStorage.getItem('bottom_val');
    // slider2_val.innerHTML = ": "+$("#myRange2")[0].value;
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
