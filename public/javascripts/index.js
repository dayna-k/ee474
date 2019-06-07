// index.js

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'EE474' });
// });
// var express = require('express');
// var router = express.Router();
// var exec = require("child_process").exec;


var color_list = [["var(--color1)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--color5)", "var(--color6)", "var(--color7)", "var(--color8)", "var(--color9)", "var(--color10)"],
["var(--color1_s_2)", "var(--color2_s_2)", "var(--color3_s_2)", "var(--color4_s_2)", "var(--color5_s_2)", "var(--color6_s_2)", "var(--color7_s_2)", "var(--color8_s_2)", "var(--color9_s_2)", "var(--color10_s_2)"],
["var(--color1_s_3)", "var(--color2_s_3)", "var(--color3_s_3)", "var(--color4_s_3)", "var(--color5_s_3)", "var(--color6_s_3)", "var(--color7_s_3)", "var(--color8_s_3)", "var(--color9_s_3)", "var(--color10_s_3)"],
["var(--color1_s_4)", "var(--color2_s_4)", "var(--color3_s_4)", "var(--color4_s_4)", "var(--color5_s_4)", "var(--color6_s_4)", "var(--color7_s_4)", "var(--color8_s_4)", "var(--color9_s_4)", "var(--color10_s_4)"],
["var(--color1_s_5)", "var(--color2_s_5)", "var(--color3_s_5)", "var(--color4_s_5)", "var(--color5_s_5)", "var(--color6_s_5)", "var(--color7_s_5)", "var(--color8_s_5)", "var(--color9_s_5)", "var(--color10_s_5)"]];

var input_img = "";
var output_img = "";
var cmd_line = "";
var prev_t = 0;
var prev_t_color_r = 3;
var prev_t_color_c = 1;
var prev_b = 0;
var prev_b_color_r = 3;
var prev_b_color_c = 1;
var top_count = 0;


function open_top_box_s(){
  var color_top_s = document.getElementById("color_box_top_s");
  var color_bottom_s = document.getElementById("color_box_bottom_s");
  if(color_top_s.style.display=='none'){
    $("#color_box_top_s").slideDown(500);
  }
  else if(color_top_s.style.display!='none'){
    $("#color_box_top_s").slideUp(500);
  }
  return false;
}


function open_bottom_box_s(){
  var color_top_s = document.getElementById("color_box_top_s");
  var color_bottom_s = document.getElementById("color_box_bottom_s");
  if(color_bottom_s.style.display=='none'){
    $("#color_box_bottom_s").slideDown(500);
  }
  else if(color_bottom_s.style.display!='none'){
    $("#color_box_bottom_s").slideUp(500);
  }
  return false;
}

function btn_reset(){
  localStorage.setItem('input_img', "/py_code/input/white.jpg");
  localStorage.setItem('output_img', "/py_code/output/white.jpg");
  localStorage.setItem('file', "test");
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
  localStorage.setItem('input_img', $("#input_img")[0].src);
  localStorage.setItem('output_img', $("#output_img")[0].src);
  console.log(localStorage.getItem('input_img'));
  console.log(localStorage.getItem('output_img'));
  // console.log(localStorage.getItem('top_val'))
  // console.log(localStorage.getItem('bottom_val'))
  // $("#input_img")[0].src = localStorage.getItem('input_img');
  // $("#output_img")[0].src = localStorage.getItem('output_img');
  // $("#myRange1")[0].value = localStorage.getItem('top_val');
  // slider1_val.innerHTML = ": "+$("#myRange1")[0].value;
  // $("#myRange2")[0].value = localStorage.getItem('bottom_val');
  // slider2_val.innerHTML = ": "+$("#myRange2")[0].value;
  /*
  */

  /* Load Image File When Clicking the Select btn */
  $("#getimg").change(function () {
    var imgname = document.getElementById("getimg");
    var file = $("#getimg").prop("files")[0];
    console.log("file: ", file.name);

    localStorage.setItem('input_img', "/py_code/input/"+file.name);
    console.log("input_img: ", localStorage.getItem('input_img'))
    $("#input_img")[0].src = localStorage.getItem('input_img');

    input_img = file.name;
    var strArray = input_img.split('.');
    localStorage.setItem('file', strArray[0]);

    $("#output_img")[0].style.display = 'none';
    $("#output_img")[0].src = "/py_code/output/white.jpg";

    var success = document.getElementById("out_success");
    success.innerHTML= "&nbsp<i class='fas fa-exclamation-circle'></i>";

    var color_top_s = document.getElementById("color_box_top_s");
    var color_bottom_s = document.getElementById("color_box_bottom_s");
    if(color_top_s.style.display!='none'){
      $("#color_box_top_s").slideUp(500);
    }
    if(color_bottom_s.style.display!='none'){
      $("#color_box_bottom_s").slideUp(500);
    }

    setTimeout(function() {
      $("#output_img").fadeIn(500);
    }, 1500);
  });

  /* OnClick Function of Change Color btn */
  $("#btn_color").click(function btn_color_onClick(){
    var color_top_s = document.getElementById("color_box_top_s");
    var color_bottom_s = document.getElementById("color_box_bottom_s");
    var success = document.getElementById("out_success");

    console.log("btn_color clicked");
    console.log("top_color_h: ", prev_t_color_c);
    console.log("top_color_s: ", prev_t_color_r);
    console.log("bottom_color_h: ", prev_b_color_c);
    console.log("bottom_color_s: ", prev_b_color_r);
    console.log("local file name: ", localStorage.getItem('file'));
    // console.log("top_val: ", localStorage.getItem('top_val'))
    // console.log("bottom_val: ", localStorage.getItem('bottom_val'))

    /* set cmd line */

    cmd_line = "cd public/py_code; source activate pbj; python myUI.py --images ./input/"+localStorage.getItem('file')+".jpg --top "+prev_t_color_c+" "+prev_t_color_r+" --bottom "+prev_b_color_c+" "+prev_b_color_r+"; sleep 5; cd ..; cd ..; pwd";
    // $("#target_input")[0].value = "cd public/py_code; source activate pbj; python myUI.py --images ./input/"+file.name+" --top "+localStorage.getItem('top_val')+" --bottom "+localStorage.getItem('bottom_val')+"; sleep 5; pwd";
    // $("#target_input")[0].value = "cd public/py_code && source activate pbj && python myUI.py --images ./input/"+file.name+" --top "+localStorage.getItem('top_val')+" --bottom "+localStorage.getItem('bottom_val') && sleep(7) && pwd;
    $("#target_input")[0].value = cmd_line;
    var cmd_input = document.getElementById("target_input");
    console.log("cmd_input: ", cmd_input.value);
    // console.log("cmd: ", req.query.cmd);
    //exec_cmd($("#target_input")[0].value);


    /* set output image name */
    output_img = localStorage.getItem('file')+"_"+prev_t_color_c+"_"+prev_t_color_r+"_"+prev_b_color_c+"_"+prev_b_color_r+".png";
    localStorage.setItem('output_img', output_img);
    console.log(localStorage.getItem('output_img'));
    //$("#output_img")[0].src = "/py_code/output/"+output_img;

    // $("#output_img")[0].src = localStorage.getItem('output_img');
    $("#output_img")[0].style.display = 'none';
    // $("#output_img")[0].src = "/py_code/output/output.jpg";
    $("#output_img")[0].src = "/py_code/output/"+localStorage.getItem('file')+"/"+output_img;

    setTimeout(function() {
      success.innerHTML= "&nbsp<i class='fas fa-check-circle'></i>";
      $("#output_img").fadeIn(500);
    }, 2000);
    // $("#cmd_submit").click();
  });


  /* When Clicking the Top Color H */
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

    /* collapse the s table */
    if(color_top_s.style.display=='none'){
      $("#color_box_top_s").slideDown(500);
    }
    return false;
  })

  /* When Clicking the Top Color S */
  $("#color_table_top_s td").click(function(){
    var table_top_s = document.getElementById("color_table_top_s");
    var table_bottom_s = document.getElementById("color_table_bottom_s");
    var topval = document.getElementById("topval");
    var ts_td = $(this);
    var tr = $(this).parent();
    var row = 0;
    var col = 0;
    top_count = 0;

    if (ts_td.text()%10 == 0){
      row = parseInt(ts_td.text()/10)-1;
      col = 10;
    }else{
      row = parseInt(ts_td.text()/10);
      col = ts_td.text()%10;
    }
    prev_t_color_r = row;
    prev_t_color_c = col;

    if (prev_t == prev_t_color_c){
      console.log("클릭된 top color는 "+ ts_td.text());
      console.log("row: ", prev_t_color_r);
      console.log("col: ", prev_t_color_c);
      console.log("prev: ", prev_t);
      for (var j=0; j<5; j++){
            table_top_s.rows[j].cells[col-1].classList.remove("color_h_clicked");
      }
      this.classList.add("color_h_clicked");
      topval.innerHTML='&nbsp&nbsp<span style="background-color: '+color_list[row-1][col-1]+'; word-spacing:10px">&nbsp&nbsp;</span>'
      var success = document.getElementById("out_success");
      success.innerHTML= "&nbsp<i class='fas fa-exclamation-circle'></i>";
    }
    return false;
  })

  /* When Clicking the Bottom Color H */
  $("#color_table_bottom td").click(function(){
    var str ="";
    var td = $(this);
    var tr = $(this).parent();
    var color_top_s = document.getElementById("color_box_top_s");
    var table_top_s = document.getElementById("color_table_top_s");
    var color_bottom_s = document.getElementById("color_box_bottom_s");
    var table_bottom_s = document.getElementById("color_table_bottom_s");

    console.log("클릭된 top color는 "+td.text());
    prev_b = td.text();
    console.log(prev_b);

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

    /* collapse the s table */
    if(color_bottom_s.style.display=='none'){
      $("#color_box_bottom_s").slideDown(500);
    }
    return false;
  })


  /* When Clicking the Bottom Color S */
  $("#color_table_bottom_s td").click(function(){
    var table_top_s = document.getElementById("color_table_top_s");
    var table_bottom_s = document.getElementById("color_table_bottom_s");
    var bottomval = document.getElementById("bottomval");
    var ts_td = $(this);
    var tr = $(this).parent();
    var row = 0;
    var col = 0;
    top_count = 0;

    if (ts_td.text()%10 == 0){
      row = parseInt(ts_td.text()/10)-1;
      col = 10;
    }else{
      row = parseInt(ts_td.text()/10);
      col = ts_td.text()%10;
    }
    prev_b_color_r = row;
    prev_b_color_c = col;

    if (prev_b == prev_b_color_c){
      console.log("클릭된 bottom color는 "+ ts_td.text());
      console.log("row: ", prev_b_color_r);
      console.log("col: ", prev_b_color_c);
      console.log("prev: ", prev_b);
      for (var j=0; j<5; j++){
            table_bottom_s.rows[j].cells[col-1].classList.remove("color_h_clicked");
      }
      this.classList.add("color_h_clicked");
      bottomval.innerHTML='&nbsp&nbsp<span style="background-color: '+color_list[row-1][col-1]+'; word-spacing:10px">&nbsp&nbsp;</span>'
      var success = document.getElementById("out_success");
      success.innerHTML= "&nbsp<i class='fas fa-exclamation-circle'></i>";
    }
    return false;
  });


});

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
