console.log('Tic Tac Toe - ready!');

var counterTurn = 0;
var matchCount = 0;
var play = 0;

var player = [[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] , [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]];

var winCombo = [
 [ 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 ],
 [ 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 ],
 [ 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 ],
 [ 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 ],
 [ 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 ],
 [ 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 ],
 [ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 ],
 [ 0 , 0 , 1 , 0 , 1 , 0 , 1 , 0 , 0 ]];

var selectedSquares = document.querySelectorAll('.box');

var checkWin = function(){
// loop thru and compare player square selection with wining combinations array.
  matchCount=0;
  for (var ind = 0; ind <= winCombo.length-1; ind++) {
    matchCount = 0;
    for (var index = 0; index <= winCombo[ind].length-1; index++){
      if(((winCombo[ind][index]) === 1) && (player[play][index] === winCombo[ind][index])){
        matchCount = matchCount +1;
        if(matchCount === 3){
          if (counterTurn === 1 || counterTurn === 3 || counterTurn === 5 || counterTurn === 7 || counterTurn === 9) {
            document.querySelector('.oneWinner h2').classList.remove('hidden');
          }
          if (counterTurn === 2 || counterTurn === 4 || counterTurn === 6 || counterTurn === 8) {
            document.querySelector('.twoWinner h2').classList.remove('hidden');
          }
        }
      }
    }
  }
};

var changeSquarePlayer1 = function (event) {
  play = 0; //required for checkWin
  event.target.style.backgroundColor = "red";
  eventClassArray = event.target.classList;
  eventClassArray.add('plyrOne');
  if( eventClassArray.contains('plyrOne')){
    eventClassString = eventClassArray.toString();
    var index = eventClassString.match(/\d+/g).map(Number);
    player[0].splice(index , 1 , 1 );
    checkWin();
  }
};
var changeSquarePlayer2 = function (event) {
  play = 1; //required for checkWin
  event.target.style.backgroundColor = "green";
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
  if( event.target.classList.contains('plyrOne') || event.target.classList.contains('plyrTwo')){
    alert ("Choose a different Square");
  } else { counterTurn = counterTurn +1;
      if ((counterTurn % 2) === 0) {
        changeSquarePlayer2(event);
      } else {changeSquarePlayer1 (event);
      }
    }
}

selectedSquares.forEach(function(elem){
  elem.addEventListener('click', changeSquareClickHandler);
});
