// index.js

function btn1() {
  console.log("btn1 clicked");
}



// function btn_reset() {
//   console.log("btn_rest clicked");
//   console.log("val1: ", $("#target_input").val());
//   document.getElementById("target_input").value="";
//   console.log("val2: ", $("#target_input").val());
//
//   console.log("result1: ", $("#term_result"));
//   $("#term_result").innerHTML = "";
//
//   document.getElementById("term_result").value="";
//   console.log("result2: ", $("#term_result").val());
//
//   // module.exports = router;
// }

// $("#btn1").click(function () {
//   console.log("btn1 clicked in routes index.js");
// });

var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("slidevalue1");
output1.innerHTML = "value: "+slider1.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  output1.innerHTML = "value: "+this.value;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("slidevalue2");
output2.innerHTML = "value: "+slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  output2.innerHTML = "value: "+this.value;
}
