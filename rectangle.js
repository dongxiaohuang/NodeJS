exports.perimeter = (x,y) => (2*(x+y));
exports.area = (x,y) => (x*y);
module.exports = (x, y, callback) => {
  if(x <= 0 || y <= 0){
    //callback(error_return, normal_return);
    // setTimeout(callback, timep)
    setTimeout(() => callback(
      new Error("width = " +x +" and length = "+y + ' must be greater than zero') // return value
      ,null //return value
    ), 2000);
    // set timeout to imitate the time from fetch data from database, this callback function will not run until the 2000 timeout ends;
  }
else{
  setTimeout(() =>
    callback(null // return value,
      {
        perimeter: () => (2*(x+y)), // closure of javascript, we dont need to add (x,y)
        area: () => (x*y)
      }// return value
    )
    ,2000);}
}
