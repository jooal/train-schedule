
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6mltaOjLnzEwJPBSY_stAa9tEO73QWt8",
    authDomain: "train-schedule-30297.firebaseapp.com",
    databaseURL: "https://train-schedule-30297.firebaseio.com",
    projectId: "train-schedule-30297",
    storageBucket: "train-schedule-30297.appspot.com",
    messagingSenderId: "804978158609"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

var d = new Date();
 setInterval(function(startTime) {
    $("#current-time").html("Current Time: " + moment().format('MMMM Do YYYY, hh:mm A'))
  }, 1000);


$("#submit").on("click", function() {
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFrequency = $("#frequency").val().trim();
    var firstTime= $("#time").val().trim();

    var trainData= {
        formName:trainName, 
        formDestination: trainDestination, 
        formFrequency: trainFrequency, 
        formFirstTime:firstTime, 
    };

    database.ref().push(trainData);

 // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().formName;
    var trainDestination = childSnapshot.val().formDestination;
    var trainFrequency = childSnapshot.val().formFrequency;
    var firstTime = childSnapshot.val().formFirstTime;

//get time of first train
    var firstTrainTime = moment(firstTime, "hh:mm");
	    console.log(firstTrainTime);

//get current time and date
    
    var currentTime = moment();
        console.log("CURRENT TIME: " + currentTime.format("hh:mm A"));


//get difference between current time and first train
    var diffInTime = moment().diff(moment(firstTrainTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffInTime);
 
//divide the difference in time in minutes by freq of train
    var remainder = diffInTime % trainFrequency;
        console.log(remainder);

//find out minutes until next train by taking freqmin and subtracting the remainder 
var minutesLeft=trainFrequency - remainder;
    console.log(minutesLeft);

//figure out next train
var nextTrain = moment().add(minutesLeft, "minutes").format("hh:mm");
    console.log("Next Train Arrival Time: "+ moment(nextTrain).format("hh:mm A"));

    $("#tableContents").append("<tr><td>" + '<i class="fa fa-times" id="delete" aria-hidden="true"></i>' + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesLeft + "</td></tr>");
    
});


//delete a train function
$("body").on("click", "#delete", function () {
  $(this).closest("tr").remove();
    console.log("train removed");
});
