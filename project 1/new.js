var Clock = require('./clock')

var cucu = new Clock();

cucu.on("tictac", function () {
  cucu.theTime();
});