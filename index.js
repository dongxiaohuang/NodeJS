var rect = {
  perimeter : (x,y) => (2*(x+y)),
  area : (x,y) => (x*y)
}

function solveRect(l, w){
  console.log("solving the rectangle with length = "+ l+ " and width = " + w);
  if(l <= 0 || w <= 0){
    console.log("width = " +w +" and length = "+l + ' must be greater than zero');
  }else{
    console.log("perimeter = " + rect.perimeter(l,w));
    console.log("area = "+ rect.area(l,w));
  }
}
solveRect(1,2);
solveRect(3,4);
solveRect(0,4);
solveRect(-1,-1);
