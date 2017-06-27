//Model****************************************************



//declare variables
var torpedoesLeft
var board =[[],[],[],[],[],[],[],[],[],[]]
var hits
var shipArray=[]
const ship = 1
const ship5 = 5
const ship4 = 4
const ship3 = 3
const ship2 = 2
var pass

var proposedCoordinate

//make and place a 5 ship
function place5(){
  var coordinate1 = Math.floor(Math.random() * 10)
  var coordinate2 = Math.floor(Math.random() * 6)
  console.log("5 ship coordinate 1 is " + coordinate1 + " coordinate 2 is "+ coordinate2)
  //place 55555 ship on board array
  for (i=0; i<5; i++) {
    board[coordinate1][coordinate2 + i]= ship5
    shipArray.push(coordinate1.toString()+(coordinate2 + i).toString())
  }
}

//make and place a 4 ship
function place4(){
  var coordinate1 = Math.floor(Math.random() * 7)
  var coordinate2 = Math.floor(Math.random() * 10)
  var passed = true;

  for (i=0; i<4; i++) {
    if (board[coordinate1 + i][coordinate2] == 5 || board[coordinate1 + i][coordinate2] == 4 || board[coordinate1 + i][coordinate2] == 3 || board[coordinate1 + i][coordinate2] == 2 || board[coordinate1 + i][coordinate2] == 1 ) {
      passed = false;
      console.log("Calling place4 function AGAIN!")
      place4()
    } //end if statement
    if (passed){
      for (i=0; i<4; i++) {
        board[coordinate1 + i][coordinate2]= ship4
        shipArray.push((coordinate1 + i).toString()+ coordinate2.toString())
      }
      console.log("4 ship coordinate 1 is " + coordinate1 + " coordinate 2 is "+ coordinate2)
    }
}
}

//make and place a 3 ship
function place3(){
  var coordinate1 = Math.floor(Math.random() * 10)
  var coordinate2 = Math.floor(Math.random() * 8)
  var passed = true;

  //place 333 ship on board array
  for (i=0; i<3; i++) {
    if (board[coordinate1 + i][coordinate2] == 5 || board[coordinate1 + i][coordinate2] == 4 || board[coordinate1 + i][coordinate2] == 3 || board[coordinate1 + i][coordinate2] == 2 || board[coordinate1 + i][coordinate2] == 1 ) {
      passed = false;
      console.log("Calling place3 function AGAIN!")
      place3()
    } //end if statement
  }//end for loop
  if (passed){
    for (i=0; i<3; i++) {
    board[coordinate1][coordinate2 + i]= ship3
    shipArray.push(coordinate1.toString()+(coordinate2 + i).toString())
    }
    console.log("3 ship coordinate 1 is " + coordinate1 + " coordinate 2 is "+ coordinate2)
  }
}

//make and place a 2 ship
function place2(){
  var coordinate1 = Math.floor(Math.random() * 9)
  var coordinate2 = Math.floor(Math.random() * 10)
  var passed = true;
  //place 22 ship on board array
 for (i=0; i<2; i++) {   //first check if the ship will be overlapping any block
   if (board[coordinate1 + i][coordinate2] == 5 || board[coordinate1 + i][coordinate2] == 4 || board[coordinate1 + i][coordinate2] == 3 || board[coordinate1 + i][coordinate2] == 2 || board[coordinate1 + i][coordinate2] == 1 ) {
     passed = false;
     console.log("Calling place2 function AGAIN!")
     place2()
   } //end if statement
 }//end for loop

 if (passed){
  for (i=0; i<2; i++) {
     board[coordinate1 + i][coordinate2]= ship2
    shipArray.push((coordinate1 + i).toString()+ coordinate2.toString())

  }
  console.log("2 ship coordinate 1 is " + coordinate1 + " coordinate 2 is "+ coordinate2)

 }
} //closes place2

//make and place a 1 block ship
function place1() {
  var coordinate1 = Math.floor(Math.random() * 10)
  var coordinate2 = Math.floor(Math.random() * 10)
  var passed = true; // assume proposedCoordinate passes, if it meets conditions of not pass, it'll be set to false
  shipArray.forEach(function(item, index) {
    if ((coordinate1.toString()+ coordinate2.toString()) === item ) {
      passed = false;
      console.log("Calling place1 function AGAIN")
      place1();
    }
    })
    if (passed){
      board[coordinate1][coordinate2]= ship
      shipArray.push(coordinate1.toString()+ coordinate2.toString())
      console.log("1 ship coordinate 1 is " + coordinate1 + " coordinate 2 is "+ coordinate2)
    }

}






//build board for view in html
//eq(i) gets element of position i
function makeTable() {
  for (i = 0; i < 10; i++){
    $("#board").append("<tr>")
    $("tr").eq(i).attr("id", "row" + i) //for tr[i] we add an id="row[i]"
      for (j = 0; j<10; j++){
        $("tr").eq(i).append("<td id=" + i + j + ">") //for each tr we add 10 tds and give tds an id="[i][j]"
      }
  }
}

//Controller***********************************************
//***********************************************

$(document).ready(function(){
  //on load you see table
  makeTable() //create board
  $("td").off("click"); //clicking off until start button pressed

  //Once start button clicked all this happens:
  $(".btn").click(function(){

    //make board all light blue: (reset)
    $("td").removeClass("torpedoed");
    $("td").removeClass("hit");
    $("td").removeClass("showShip");

    //setting variables to 0/empty
    shipArray=[];
    board = [[],[],[],[],[],[],[],[],[],[]];
    hits=0;
    torpedoesLeft=10;

    //clear text on screen
    $("#hitTracker").text("Hits: " + hits);
    $("#torpedoTracker").text("Torpedoes left: " + torpedoesLeft);
    $("#winLose").text("");

    //hide start button until game over
    $(".btn").hide();

    place5()
    place4()
    place3()
    place2()
    place1()

    //each time user clicks specific square:
    $("td").click(function(){
      var currentTd = $(this).attr("id") //grab id of td clicked
      var dig0 = currentTd[0] //split td, get first digit
      var dig1 = currentTd[1] //split td, get 2nd digit

      //turn square red or blue if ship is hit or not
      if (board[dig0][dig1] === ship){
        //turns square red
        $(this).addClass("hit");
        hits ++
        $("#hitTracker").text("Hits: " + hits)
      }
      if(board[dig0][dig1] === ship5) {
        $(this).addClass("hit");
        for (i=0; i<10; i++){
          if(board[dig0][i] === ship5){
            $("#" + dig0 + parseInt(i)).addClass("hit");
          }
        }
        hits ++
        $("#hitTracker").text("Hits: " + hits)
      }
      if(board[dig0][dig1] === ship4) {
        $(this).addClass("hit");
        for (i=0; i<10; i++){
          if(board[i][dig1] === ship4){
            $("#" + parseInt(i) + dig1).addClass("hit");
          }
        }
        hits ++
        $("#hitTracker").text("Hits: " + hits)
      }
      if(board[dig0][dig1] === ship3) {
        $(this).addClass("hit");
        for (i=0; i<10; i++){
          if(board[dig0][i] === ship3){
            $("#" + dig0 + parseInt(i)).addClass("hit");
          }
        }
        hits ++
        $("#hitTracker").text("Hits: " + hits)
      }
      if(board[dig0][dig1] === ship2) {
        $(this).addClass("hit");
        for (i=0; i<10; i++){
          if(board[i][dig1] === ship2){
            $("#" + parseInt(i) + dig1).addClass("hit");
          }
        }
        hits ++
        $("#hitTracker").text("Hits: " + hits)
      }

      // $("#" + dig0 + (parseInt(dig1)+1)).addClass("hit");

        //check number of hits to see if they won, if won indicate game over and turn off click of board and show start button
        if (hits === 5) {
          $("#winLose").text("You Won!!!");
          $("td").off("click");
            $(".btn").show();
        }
       else { //turns square dark blue (miss)
        $(this).addClass("torpedoed");
      }
      $(this).off("click"); //can't click same square twice
      torpedoesLeft--;
      //update torpedo count on screen
      $("#torpedoTracker").text("Torpedoes left: " + torpedoesLeft);
      //check if used 25 torpedos.  Game over, show start button, turn board click off
      if(torpedoesLeft === 0){
        $("#winLose").text("Game Over.");
        $("td").off("click");
        $(".btn").show();

        //after game over, show ships they did not hit
        for (i = 0; i < 40; i++){
          var temp = "#" + shipArray[i]
          if (!($(temp).hasClass("hit"))) {  //checks if already hit and then don't show ship there
            $(temp).addClass("showShip")
          }
        }

      }
    })
  console.log("game is starting")
})

})
