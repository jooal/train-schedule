// var now = new Date();

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

var today = new Date();

var trainData = {
    name: '',
    destination: '',
    firstTime:'',
    freqMin: '',
    nextArrival: 0,
    minutesAway: 0,
}


$("#submit").on("click", function () {
    trainData.name = $('#name').val();
    trainData.destination = $('#destination').val();
    trainData.firstTime = $('#time').val()
    trainData.freqMin=$('#frequency').val()

    //create local variables 
var newTrain ={
    name=name,
    destination=destination, 
    firstTime=firstTime,
    freqMin=freqMin,
    nextArrival=nextArrival,
    minutesAway=minutesAway,
};
database.ref().push(newTrain)

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().name + '<td>' + childSnapshot.val().destination + '<td>' + childSnapshot.val().firstTime + '<td>' + childSnapshot.val().freqMin + '<td>' + childSnapshot.val().nextArrival)


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
    var remainder = diffInTime % freqMin;
        console.log(remainder);

//find out minutes until next train by taking freqmin and subtracting the remainder 
var minutesLeft=freqMin - remainder;
    console.log(minutesLeft);

//figure out next train
var nextTrain = moment().add(minutesLeft, "minutes").format("hh:mm");
    console.log("Next Train Arrival Time: "+ moment(nextTrain).format("hh:mm"));

$("#tableContents").append("<tr><td>" + "</td><td>" + name + "</td><td>" + destination + "</td><td>" +
freqMin + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });








