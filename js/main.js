/* ================================= 
  My Scripts
==================================== */

// Global Variables
var myAudio = new Audio();
var track;

// Sets the initial Playback Rate Text value (BPM) in the display on page load
$("#currentPbr").text(($("#pbr").val()) + " BPM");

// Function when Set Metronome Button is clicked
// Will be used to load the corresponding mp3 to the seleected BPM value
$("#setSpeed").click(function(){
    track = $("#pbr").val();
});

// ** Dynamically show the current range value to the screen **
function updateVal(val) {
    $("#currentPbr").text(val + " BPM");
}

// Getting the sound tick to continuously play
function startTick() {

    myAudio = new Audio("media/" + track + ".mp3"); 
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.playbackRate = 1;
    myAudio.play();

    blinkDot();

}

//Blinking dot in time to BPM
function blinkDot(){
    $(myAudio).bind('timeupdate', function(){
        //Get hours and minutes of the current playing time
        // var num = parseInt(myAudio.currentTime); 
        
        // contional to determine if song is playing or paused --> 
        if (myAudio.currentTime > 0) {

            var toggleTime = ((60 / track) * 1000) / 2;
            // $("#green").css("animation", "blink toggleTime linear infinte");
            function blinker() {
            $('.blinking').fadeOut(toggleTime);
            $('.blinking').fadeIn(toggleTime);
            }

            blinker();
        }
    });
}
            

//Start Metronome
$("#audio-start").click(function(){
    $("#audio-stop").trigger('click'); //stop the current audio to prevent double play
    $("#green").addClass("blinking");  //add class to begin the visual dot tick
    $("#setSpeed").trigger('click');   //set speed so proper track is loaded to play
    startTick();
    blinkDot();
});
//Stop Metronome
$("#audio-stop").click(function(){
    myAudio.pause();  //stop audio
    $("#green").finish();  //stop blinking
    $("#green").removeClass("blinking");  //stop blinking
});



