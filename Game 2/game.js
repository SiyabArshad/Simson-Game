var buttons=['red','blue','green','yellow']
var gamespattern=[]
var userpattern=[]
var start=false
var level=0
$(document).keypress(function() {
    if (!start) {
      $("#h1").text("Level " + level);
      nextSequence();
      start = true;
    }
  });
  
$(".gm").click(function() {

    var userChosenColour = $(this).attr("id");
    userpattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userpattern.length-1);
  });
  
  function checkAnswer(currentLevel) {

    if (gamespattern[currentLevel] === userpattern[currentLevel]) {
      if (userpattern.length === gamespattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
    userpattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttons[randomNumber];
    gamespattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function startOver() {
    level = 0;
    gamespattern = [];
    start = false;
  }
  