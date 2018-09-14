var now = new Date();

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

//get time of first train
    var firstTrainTime = getTime(firstTime, "hh:mm");
	    console.log(firstTrainTime);

//get current time
    var currentTime = now.getTime();
        console.log("CURRENT TIME: " + currentTime.format("hh:mm"));

//get difference between current time and first train
    var diffInTime = differenceInMinutes((firstTrainTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffInTime);
 
//divide the difference in time in minutes by freq of train
    var remainder = diffInTime % freqMin;
        console.log(remainder);

//find out minutes until next train by taking freqmin and subtracting the remainder 
var minutesLeft=freqMin - remainder;
    console.log(minutesLeft);

//figure out next train
var nextTrain = getTime().add(minutesLeft, "minutes").format("hh:mm");
    console.log("Next Train Arrival Time: "+ nextTrain.format("hh:mm"));

//create local variables 
var newTrain ={
    name=name,
    destination=destination, 
    firstTime=firstTime,
    freqMin=freqMin,
    nextArrival=nextArrival,
    minutesAway=minutesAway,
}
});
    database.ref().push(trainData)




database.ref().on("child_added", function (childSnapshot) {
    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().name + '<td>' + childSnapshot.val().destination + '<td>' + childSnapshot.val().firstTime + '<td>' + childSnapshot.val().freqMin + '<td>' + childSnapshot.val().nextArrival)

})