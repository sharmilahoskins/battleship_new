//Model****************************************************

//Make table:
//Loop to append tds
//Nested loop to append rows
//Added IDs to each row and each td





//declare variables
var torpedoesLeft
var board =[[],[],[],[],[],[],[],[],[],[]]
var hits
var shipArray=[]
const ship = 1
var proposedCoordinate

//place 5 1 length ships and make sure they don't sit on top of each other
function placeShips(){
  for (i=0; i<1; i++){
    proposedCoordinate = Math.floor(Math.random() * 100);  //generate random #
    shipArray.push(proposedCoordinate)
  }
  while (shipArray.length < 5){
    proposedCoordinate = Math.floor(Math.random() * 100);  //generate random #
    var passed = true; // assume proposedCoordinate passes, if it meets conditions of not pass, it'll be set to false

    shipArray.forEach(function(item, index){
       if (proposedCoordinate === item || proposedCoordinate === item+1 ||
       proposedCoordinate === item-1 || proposedCoordinate === item+10 || proposedCoordinate === item-10 || proposedCoordinate === item+11 || proposedCoordinate === item-11 || proposedCoordinate === item+9 || proposedCoordinate === item-9){
         console.log("this coordinate does NOT PASS")
         passed = false;
       }
     })
    if (passed){
     shipArray.push(proposedCoordinate);
    }
  } // end of i is less than 5 for loop
  shipsInArray()
} // end of placeShips function

console.log(shipArray)

function shipsInArray() {
  //making sure all ship array items have two digits and push ship coordinates into shipArray and board array
  shipArray.forEach(function(item, index){
    if (item < 10){
      item = "0" + item.toString()  //add 2nd digit to single digit numbers
      shipArray[index]= item
      console.log("Ship array index that is supposed to have a 0" + shipArray[index])
    }
    if (item > 9){
      item = item.toString()
      shipArray[index] = item
      console.log("shiparray index that was made into a string" + shipArray[index])
    }

    //place coordinated into board array
    var digit0 = item[0]; //split random number, get first digit (corresponds to row)
    var digit1= item[1]; //split random num, get 2nd digit (corresponds to column)
    board[digit0][digit1] = ship; //place ship on board array
  })
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
    torpedoesLeft=25;

    //clear text on screen
    $("#hitTracker").text("Hits: " + hits);
    $("#torpedoTracker").text("Torpedoes left: " + torpedoesLeft);
    $("#winLose").text("");

    //hide start button until game over
    $(".btn").hide();

    placeShips() //places ships

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
        //check number of hits to see if they won, if won indicate game over and turn off click of board and show start button
        if (hits === 5) {
          $("#winLose").text("You Won!!!");
          $("td").off("click");
            $(".btn").show();
        }
      } else { //turns square dark blue (miss)
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
        for (i = 0; i < 5; i++){
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
