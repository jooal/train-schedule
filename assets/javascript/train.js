// var now = new Date();

function showTime () {
    var d = new Date();
    document.getElementById("current-time").textContent= ("Current Time: " + d);
    console.log(d);
};
showTime();


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6mltaOjLnzEwJPBSY_stAa9tEO73QWt8",
    authDomain: "train-schedule-30297.firebaseapp.com",
    databaseURL: "https://train-schedule-30297.firebaseio.com",
    projectId: "train-schedule-30297",
    storageBucket: "",
    messagingSenderId: "804978158609"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

var trainData = {
    name: '',
    destination: '',
    firstTime:'',
    freqMin: '',
    nextArrival: 0,
    minutesAway: 0,
}

//delete a train function
$("#delete").on("click", function () {
    $(this).closest("tr").remove();
    console.log("train removed");
});

$("#submit").on("click", function () {
    event.preventDefault();
    trainData.name = $("#name").val().trim();
    trainData.destination = $("#destination").val().trim();
    trainData.firstTime = $("#time").val().trim();
    trainData.freqMin=$("#frequency").val().trim();

    //create local variables 
    var newTrain = {
    formName: name,
    formDestination:destination, 
    formFirstTime:firstTime,
    formFreqMin:freqMin,
    formNextArrival:nextArrival,
    formMinutesAway:minutesAway,
};  
database.ref().push(newTrain)

console.log(trainData.formName);
console.log(trainData.formDestination);
console.log(trainData.formFirstTime);
console.log(trainData.formFrequency);

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().formName; 
    var destination = childSnapshot.val().formDestination;
    var frequency = childSnapshot.val().formFreqMin;
    var firstTime = childSnapshot.val().formFirstTime;

//get time of first train
    var firstTrainTime = moment(firstTime, "hh:mm");
	    console.log(firstTrainTime);

//get current time
    var currentTime = moment();
        console.log("CURRENT TIME: " + currentTime.format("hh:mm"));

//get difference between current time and first train
    var diffInTime = moment().diff(moment(firstTrainTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffInTime);
 
//divide the difference in time in minutes by freq of train
    var remainder = diffInTime % frequency;
        console.log(remainder);

//find out minutes until next train by taking freqmin and subtracting the remainder 
var minutesLeft=frequency - remainder;
    console.log(minutesLeft);

//figure out next train
var nextTrain = moment().add(minutesLeft, "minutes").format("hh:mm");
    console.log("Next Train Arrival Time: "+ moment(nextTrain).format("hh:mm"));
    
$("#tableContents").append("<tr><td>" + '<i class="fa fa-times" aria-hidden="true"></i>' + "</td><td>" + name + "</td><td>" + destination + "</td><td>" +
freqMin + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  
  
});









