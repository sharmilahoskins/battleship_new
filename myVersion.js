//Model****************************************************

var torpedoesLeft
var board =[[],[],[],[],[],[],[],[],[],[]]
var hits
var shipArray=[]
const ship = 1

ship5counter = 0
ship4counter = 0
ship3counter = 0
ship2counter = 0
shipsLeft = 8

function place5(){
  var coordinate1 = Math.floor(Math.random() * 10)
  var coordinate2 = Math.floor(Math.random() * 6)

  for (i=0; i<5; i++) {
    board[coordinate1][coordinate2 + i]= ship
    $("#"+ coordinate1 + (coordinate2 + i)).addClass("ship5")
    shipArray.push(coordinate1.toString()+(coordinate2 + i).toString())
  }
}

function makeShipVert(shipLength) {
  var coordinate1;
  var coordinate2;
  var shipLength
  var passed
  pullCoord()

  function pullCoord() {
  coordinate1 = Math.floor(Math.random() * 7);
  coordinate2 = Math.floor(Math.random() * 10);
  checkCoordVertical(coordinate1, coordinate2, shipLength)
  }

  function checkCoordVertical(coordinate1, coordinate2, shipLength) {
    for (i = 0; i < shipLength; i++) {
      if(shipArray.indexOf(((coordinate1 + i).toString()+coordinate2.toString())) >= 0) {
        console.log("Pulling new coord vert")
        pullCoord()
      } else {
        for (j=0; j<shipLength; j++) {
          board[coordinate1 + j][coordinate2]= ship
          $("#"+ (coordinate1 + j) + coordinate2).addClass("ship"+shipLength)
          shipArray.push((coordinate1 + j).toString()+ coordinate2.toString())
        }
      }
    }
  }
}


function makeShipHoriz(shipLength) {
  var coordinate1;
  var coordinate2;
  var shipLength
  var passed
  pullCoord()

  function pullCoord() {
  coordinate1 = Math.floor(Math.random() * 10);
  coordinate2 = Math.floor(Math.random() * 7);
  checkCoordHoriz(coordinate1, coordinate2, shipLength)
  }

  function checkCoordHoriz(coordinate1, coordinate2, shipLength) {
    for (i = 0; i < shipLength; i++) {
      if(shipArray.indexOf((coordinate1.toString()+((coordinate2+i).toString()))) >= 0) {
        console.log("pulling new coord horiz");
      pullCoord()
      } else {
        for (j=0; j<shipLength; j++) {
          board[coordinate1][coordinate2+j]= ship
          $("#"+ coordinate1 + (coordinate2+j)).addClass("ship"+shipLength)
          shipArray.push(coordinate1.toString()+ (coordinate2+j).toString())
        }
      }
    }
  }
}

//make and place a 1 block ship
function place1() {
  var coordinate1 = Math.floor(Math.random() * 10)
  var coordinate2 = Math.floor(Math.random() * 10)
  var passed=true

  shipArray.forEach(function(item, index) {
    if ((coordinate1.toString()+ coordinate2.toString()) === item ) {
      passed=false;
      place1();
    }
  })
    if (passed) {
    board[coordinate1][coordinate2]= ship
    $("#"+ coordinate1 + coordinate2).addClass("ship1")
    shipArray.push(coordinate1.toString()+ coordinate2.toString())
    }
}

function makeTable() {
  for (i = 0; i < 10; i++){
    $("#board").append("<tr>")
    $("tr").eq(i).attr("id", "row" + i)
      for (j = 0; j<10; j++){
        $("tr").eq(i).append("<td id=" + i + j + ">")
      }
  }
}

function showAllShips() {
  if($("td").hasClass("ship5")) {
    $(".ship5").addClass("ship5show")
  }
  if ($("td").hasClass("ship4")) {
    $(".ship4").addClass("ship4show")
  }
  if($("td").hasClass("ship3")) {
    $(".ship3").addClass("ship3show")
  }
  if($("td").hasClass("ship2")) {
    $(".ship2").addClass("ship2show")
  }
  if($("td").hasClass("ship1")) {
    $(".ship1").addClass("ship1show")
  }
  if($("td").hasClass("hit")){
    $(".hit").addClass("hit2")
  }
}

//Controller***********************************************

$(document).ready(function(){
  makeTable();
  $("td").off("click");

  $(".btn").click(function(){  //clicking start clears/resets
    $("td").removeClass("torpedoed");
    $("td").removeClass("hit");
    $("td").removeClass("hit2");
    $("td").removeClass("ship1show");
    $("td").removeClass("ship2show");
    $("td").removeClass("ship3show");
    $("td").removeClass("ship4show");
    $("td").removeClass("ship5show");
    $("td").removeClass("ship1");
    $("td").removeClass("ship2");
    $("td").removeClass("ship3");
    $("td").removeClass("ship4");
    $("td").removeClass("ship5");
    shipArray=[];
    board = [[],[],[],[],[],[],[],[],[],[]];
    hits=0;
    torpedoesLeft=10;
    ship5counter=0;
    ship4counter=0;
    ship3counter=0
    ship2counter=0
    shipsLeft=8;
    $("#hitTracker").text("Hits: " + hits);
    $("#torpedoTracker").text("Torpedoes left: " + torpedoesLeft);
    $("#winLose").text("");

    $(".btn").hide(); //hide start button until game over

    place5()
    makeShipVert(4)
    makeShipHoriz(4)
    makeShipVert(3)
    makeShipHoriz(3)
    makeShipVert(2)
    makeShipHoriz(2)
    place1()

    $("td").click(function(){
      var currentTd = $(this).attr("id")
      var dig0 = currentTd[0]
      var dig1 = currentTd[1]

      if ($(this).hasClass("ship5")) {
        ship5counter ++
      }
      if (ship5counter === 5) {
        shipsLeft --
        $("#shipTracker").text("Ships Left: " + shipsLeft)
      }
      if ($(this).hasClass("ship4")) {
        ship4counter ++
      }
      if (ship4counter === 4) {
        shipsLeft --
        $("#shipTracker").text("Ships Left: " + shipsLeft)
      }
      if ($(this).hasClass("ship3")) {
        ship3counter ++
      }
      if (ship3counter === 3) {
        shipsLeft --
        $("#shipTracker").text("Ships Left: " + shipsLeft)
      }
      if ($(this).hasClass("ship2")) {
        ship2counter ++
      }
      if (ship2counter === 2) {
        shipsLeft --
        $("#shipTracker").text("Ships Left: " + shipsLeft)
      }
      if ($(this).hasClass("ship1")) {
        shipsLeft--
        $("#shipTracker").text("Ships Left: " + shipsLeft)
      }

      if (board[dig0][dig1] === ship){
        $(this).addClass("hit");
        hits ++
        $("#hitTracker").text("Hits: " + hits)
        if (hits === 5) {
          $("#winLose").text("You Won!!!");
          $("td").off("click");
          showAllShips()
          $(".btn").show();
        }
      } else {
      $(this).addClass("torpedoed");
      $(this).off("click");
      }
    torpedoesLeft--;
    $("#torpedoTracker").text("Torpedoes left: " + torpedoesLeft);

    if(torpedoesLeft === 0){
      $("#winLose").text("Game Over.");
      $("td").off("click");
      showAllShips() //after game over, show ships they did not hit
      $(".btn").show();
    }
    })
  })

})
