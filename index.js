

function waterfall(){
  var position = 0;
  var functionList = arguments[arguments.length - 1];
  var errorHandler = arguments[arguments.length - 2];
  var args = Array.prototype.slice.call(arguments);
  var cb = function(){
    if (arguments[0]) return errorHandler(arguments[0]);
    position++;
    var args = Array.prototype.slice.call(arguments);
    args.push(cb);
    functionList[position].apply(functionList[position], args);
  }
  args.pop();
  args.pop();
  args.push(cb);
  functionList[0].apply(functionList[0], args);
}

module.exports = {
  waterfall : waterfall
}