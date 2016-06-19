var j5 = require('johnny-five');
var board = new j5.Board();

board.on('ready', function(){
  console.log('BEEP BOOP');
  // INIT --------------
  var motorOne = new j5.Motor({
    pins:{
      pwm: 5,
      dir: 4
    },
    invertPWM: true
  });

  var motorTwo = new j5.Motor({
    pins:{
      pwm: 3,
      dir: 2
    },
    invertPWM: true
  });

  // TESTING FUNCTIONS --------------
  // -- go forward, stop, reverse, stop
  // forward();
  // board.wait(1000, function(){
  //   stop();
  //   board.wait(300, function(){
  //     reverse();
  //     board.wait(1000, function(){
  //       stop();
  //     });
  //   });
  // });


  // FUNCTIONS --------------
  function forward(t){
    motorOne.forward(255);
    motorTwo.forward(255);
    board.wait(t, stop);
  }

  function reverse(t){
    motorOne.reverse(255);
    motorTwo.reverse(255);
    board.wait(t, stop);
  }

  function stop(){
    motorOne.stop();
    motorTwo.stop();
  }

  // approx 90 deg turns...
  function turnLeft(){
    motorOne.forward(255);
    motorTwo.reverse(255);
    board.wait(500, stop);
  }

  function turnRight(){
    motorTwo.forward(255);
    motorOne.reverse(255);
    board.wait(500, stop);
  }

  // attempt at 360 deg turn...
  function spinLeft(){
    motorOne.forward(255);
    motorTwo.reverse(255);
    board.wait(1800, function(){stop()});
  }

  function spinRight(){
    motorTwo.forward(255);
    motorOne.reverse(255);
    board.wait(1800, function(){stop()});
  }

  function boogey(){
    spinLeft();
    board.wait(1800, spinRight);
  }

  // injecting vars/functions into the repl loop so can be accessed later
  this.repl.inject({
    forward: forward,
    stop: stop,
    reverse: reverse,

    turnLeft: turnLeft,
    turnRight: turnRight,

    spinLeft: spinLeft,
    spinRight: spinRight,

    boogey: boogey,

    motorOne: motorOne,
    motorTwo: motorTwo
  });

}); //end of board ready function
