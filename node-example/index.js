// var rect = {
//   perimeter : (x,y) => (2*(x+y)),
//   area : (x,y) => (x*y)
// }
var rect = require('./rectangle');

function solveRect(l, w) {
  console.log("solving the rectangle with length = " + l + " and width = " + w);
  rect(l, w, (error, rectangle) => {
    if(error) {
      console.log("ERROR:" + error.message);
    }
    else {
      console.log("perimeter = " + rectangle.perimeter());
      console.log("area = " + rectangle.area());
    }
  });
  console.log("this is a statement after callback");
}
solveRect(1, 2);
solveRect(3, 4);
solveRect(0, 4);
solveRect(-1, -1);
