
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

 trainCount = 0;

var d = new Date();
 setInterval(function(startTime) {
    $("#current-time").html("Current Time: " + moment().format('MMMM Do YYYY, hh:mm A'))
  }, 1000);


$("#submit").on("click", function() {
    trainCount++;
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFrequency = $("#frequency").val().trim();
    var firstTime= $("#time").val().trim();

    var trainData= {
        formName:trainName, 
        formDestination: trainDestination, 
        formFrequency: trainFrequency, 
        formFirstTime:firstTime, 
        formTrainCount: trainCount,
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

    var timeArr = firstTime.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

      // If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var diffInTime = moment().diff(moment(trainTime), "minutes");
    var remainder = diffInTime % trainFrequency;
    tMinutes = trainFrequency - remainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

// //get time of first train
//     var firstTrainTime = moment(firstTime, "hh:mm");
// 	    console.log(firstTrainTime);

// //get current time and date
    
//     // var currentTime = moment();
//     //     console.log("CURRENT TIME: " + currentTime.format("hh:mm A"));


// //get difference between current time and first train
//     var diffInTime = moment().diff(moment(firstTrainTime), "minutes");
        
//         console.log("DIFFERENCE IN TIME: " + diffInTime);

 
// //divide the difference in time in minutes by freq of train
//     var remainder = diffInTime % trainFrequency;
//         console.log(remainder);

// //find out minutes until next train by taking freqmin and subtracting the remainder 
// var minutesLeft=trainFrequency - remainder;
//     console.log(minutesLeft);

//figure out next train
var nextTrain = moment().add(tMinutes, "minutes").format("hh:mm A");
    console.log("Next Train Arrival Time: "+ moment(nextTrain).format("hh:mm A"));

    $("#tableContents").append("<tr><td>" + '<i class="fa fa-times" id="delete" aria-hidden="true"></i>' + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutes + "</td></tr>");

//$("#delete-train").append("<tr><td>" + deleteTrain);
});

var deleteTrain = $("#delete");
    deleteTrain.attr("data-to-delete", num);
    deleteTrain.addClass("delete");
    

    $(document).on("click", ".delete", function () {
    var thisNumber = $(this).attr("data-to-delete");
    console.log(thisNumber)
    $("#item-" + thisNumber).remove();
    database.ref("items/item" + thisNumber).remove()
    console.log("click")
});

//delete a train function
// $("body").on("click", "#delete", function () {
     
//     var thisTrain = $(this).attr("data-to-delete");
//     //var thisDiv=$("#item-", thisTrain);
 

//   $(this).closest("tr").remove();
//   //var deleteMe= $(this).closest(thisTrain);
//   database.ref("items/item" + thisTrain).remove()
   
//  });


//'<i class="fa fa-times" id="delete" aria-hidden="true"></i>'
// var deleteTrain = $("<button id='x'>");
// deleteTrain.attr("data-to-delete");
// deleteTrain.addClass("delete");
// deleteTrain.append("x");
