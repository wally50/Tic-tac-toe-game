console.log('Tic Tac Toe - ready!');

var playerOneWinCount = 0;
var playerTwoWinCount = 0;
var winCombo = [
 [ 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 ],
 [ 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 ],
 [ 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 ],
 [ 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 ],
 [ 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 ],
 [ 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 ],
 [ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 ],
 [ 0 , 0 , 1 , 0 , 1 , 0 , 1 , 0 , 0 ]];
 // deaults to reset
 var eventClassString = "";
 var counterTurn = 0;
 var matchCount = 0;
 var gameStarter = 0;
 var endOfGameFlag = false;
 var play = 0;
 var player = [[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
               [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]];

var selectedSquares = document.querySelectorAll('.box');
var resetBoardInput = document.querySelector('.ipBoardReset');
console.log(selectedSquares);

var resetBoard = function () {
  var x = document.querySelectorAll('.box');
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundImage = '';
  }
  document.querySelector('.oneWinner h2').classList.add('hidden');
  document.querySelector('.twoWinner h2').classList.add('hidden');
  document.querySelector('.draw').classList.add('hide');
  endOfGameFlag = false;
  if (gameStarter == 1) {
    counterTurn = 1;
  }
  gameStarter = 0;
};

var resetCodeForNextGame = function () {
  var x = document.querySelectorAll('.box');
  for (var i = 0; i < x.length; i++) {
    if (x[i].classList.contains("plyrOne")) {
      x[i].classList.remove("plyrOne");
    }
    if (x[i].classList.contains("plyrTwo")) {
      x[i].classList.remove("plyrTwo");
    }
  }
  player = [[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]];
  eventClassString = '';
  counterTurn = 0;
  endOfGameFlag = true;
  };

var checkWin = function(){
// loop thru and compare player square selections with wining combinations array.
// notify of win or draw. Increment counter of each players wins.
  matchCount=0;
  for (var ind = 0; ind <= winCombo.length-1; ind++)
  {
    matchCount = 0;
    for (var index = 0; index <= winCombo[ind].length-1; index++)
    {
      if(((winCombo[ind][index]) === 1) && (player[play][index] === winCombo[ind][index]))
      {
        matchCount = matchCount +1;
        console.log("Match Count: " + matchCount);
        if(matchCount === 3)
        {
          if (counterTurn === 1 || counterTurn === 3 || counterTurn === 5 || counterTurn === 7 || counterTurn === 9)
          {
            playerOneWinCount = playerOneWinCount +1;
            resetCodeForNextGame();
            document.querySelector('.winCounterOne h5').textContent = playerOneWinCount;
            document.querySelector('.oneWinner h2').classList.remove('hidden');
          }
          if (counterTurn === 2 || counterTurn === 4 || counterTurn === 6 || counterTurn === 8 || counterTurn === 10)
          {
            playerTwoWinCount = playerTwoWinCount + 1;
            resetCodeForNextGame();
            document.querySelector('.winCounterTwo h5').textContent = playerTwoWinCount;
            document.querySelector('.twoWinner h2').classList.remove('hidden');
          }
        }
      }
    }
  }
  if (( counterTurn === 9 && gameStarter == 1 && matchCount < 3) || ( counterTurn === 10 && gameStarter == 0 && matchCount < 3))
    {
      resetCodeForNextGame();
      document.querySelector('.draw').classList.remove('hide');
    }
};

var changeSquarePlayer1 = function (event) {
  // Changes square selected. Convert to string, extract cell number identifier from string
  // and convert to a number which becomes the index to insert a 1 into players array.
  play = 0; //required for checkWin
  event.target.style.backgroundSize = "90px 90px";
  event.target.style.backgroundImage = "url('images/nought.png')";
  eventClassArray = event.target.classList;
  eventClassArray.add('plyrOne');
  console.log(eventClassArray);
  if( eventClassArray.contains('plyrOne')){
    var eventClassString = eventClassArray.toString();
    var index = eventClassString.match(/\d+/g).map(Number);
    player[0].splice(index , 1 , 1 );
    checkWin();
  }
};
var changeSquarePlayer2 = function (event) {
  // Changes square selected. Convert to string, extract cell number identifier from string
  // and convert to a number which becomes the index to insert a 1 into players array.
  play = 1; //required for checkWin
  //event.target.style.backgroundColor = "#de0004";
  event.target.style.backgroundSize = "90px 90px";
  event.target.style.backgroundImage = "url('images/cross.png')";
  //event.target.innerHTML='<img src="images/cross.png">';
  eventClassArray = event.target.classList;
  eventClassArray.add('plyrTwo');
  if( eventClassArray.contains('plyrTwo')){
    eventClassString = eventClassArray.toString();
    var index = eventClassString.match(/\d+/g).map(Number);
    player[1].splice(index , 1 , 1 );
    checkWin();
  }
};

function changeSquareClickHandler(event) {
  //  alert - no reclick on an already selected square and alternate turns.
  if (endOfGameFlag === false) {
    if( event.target.classList.contains('plyrOne') || event.target.classList.contains('plyrTwo')){
      alert ("Choose a different Square");
    } else {
        counterTurn = counterTurn +1;
        if ((counterTurn % 2) === 0) {
          changeSquarePlayer2(event);
        } else {
            if (counterTurn == 1) {
              gameStarter = 1;
            }
            changeSquarePlayer1 (event);
          }
      }
  }
}

  selectedSquares.forEach(function(elem){
    elem.addEventListener('click', changeSquareClickHandler);
  });

resetBoardInput.addEventListener('click', resetBoard);
