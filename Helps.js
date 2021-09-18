module.exports.Objects = (a,b) => {
    var c = {};
  
    for (var i in a) {
      c[i] = typeof b[i] != 'undefined' ? b[i] : a[i];
    }
  
    return c;
}

module.exports.ArrayToString = (array) => {
  var str = "";

  array.forEach((elem)=>{
      str+=elem;
  })

  return str;
}