var config = {
  apiKey: "AIzaSyAyW-K5sVcltrCcfIkFZ7LRzaSxvD9XdXk",
  authDomain: "coding-bootcamp-52fa0.firebaseapp.com",
  databaseURL: "https://coding-bootcamp-52fa0.firebaseio.com",
  projectId: "coding-bootcamp-52fa0",
  storageBucket: "coding-bootcamp-52fa0.appspot.com",
  messagingSenderId: "382484346354"
};
firebase.initializeApp(config);

console.log("hello");

var database = firebase.database();


$("#add-user").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  var train = $("#trainName").val().trim();
  var destination = $("#trainDestination").val().trim();
  var firstTrain = moment($("#firstDeparture").val().trim(), "MM/DD/YYYY").format("X");
  var frequency = $("#trainFrequency").val().trim();

  // Code for handling the push


  var newEntry = {
    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newEntry);

  // // Logs everything to console
  // console.log(newEntry.train);
  // console.log(newEntry.destination);
  // console.log(newEntry.firstTrain);
  // console.log(newEntry.frequency);

  // alert("Added new train!");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#firstDeparture").val("");
  $("#trainFrequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrain = childSnapshot.val().train;
  var newDest = childSnapshot.val().destination;
  var newFirst = childSnapshot.val().firstTrain;
  var newFreq = childSnapshot.val().frequency;

  // newloyee Info
  console.log(newTrain);
  console.log(newDest);
  console.log(newFirst);
  console.log(newFreq);

  var tFrequency = 30;

  // Time is 3:30 AM
  var firstTime = "03:30";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<td>").text(newTrain),
    $("<td>").text(newDest),
    $("<td>").text(newFreq),
    //$("<td>").text(newFirst),
    $("<td>").text(tMinutesTillTrain),
    
    $("<td>").text(nextTrain)
  );

  $("#train-table > tbody").append(newRow);
});