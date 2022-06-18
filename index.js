
var buttonColors = ["red", "purple", "green", "yellow"];
var randomChosenColor = "";
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").keypress(function(){
    if (level==0){
        nextSequence();
    }
});

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    userClickedPattern = [];
}

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    $("."+userChosenColor).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSequence();
});

function checkSequence(){
    var index = userClickedPattern.length - 1;
    if (gamePattern[index]!=userClickedPattern[index]){
        $("h1").text("Wrong Pattern Press Any Key To Start");
        $("body").addClass("alert");
        playSound("wrong");
        gamePattern = [];
        setTimeout(function(){
            $("body").removeClass("alert");
        },100);
        level=0;
    }
    if (index+1 == gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },500);
    }
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(shadow){
    $("."+shadow).addClass("pressed");
    setTimeout(function(){
        $("."+shadow).removeClass("pressed");
    },100);
}
