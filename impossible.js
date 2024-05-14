setInterval(function() {
  c1 = Math.floor(Math.random() * 255);
  c2 = Math.floor(Math.random() * 255);
  c3 = Math.floor(Math.random() * 255)
  let randomColor = "rgb(" + c1 + "," + c2 + "," + c3 + ")";
  let r2Color = "rgb(" + c1 + "," + c2 + "," + (c3+50) + ")"
  $("body").css("background-color", randomColor)
  $("body").css("color", r2Color)
}, 100)