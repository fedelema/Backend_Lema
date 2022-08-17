"use strict";

var generateColor = function generateColor() {
  var red = Math.floor(Math.random() * (255 - 0) + 0);
  var green = Math.floor(Math.random() * (255 - 0) + 0);
  var blue = Math.floor(Math.random() * (255 - 0) + 0);
  return rgb = "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
};

var color = generateColor();
console.log(color);
