//File for the logic of the game

/*

Need to implement:

Word Database for random words
Currection for duplicated letters for example: SSSSS returns green 1 and yellow rest.  Should return green and gray for rest

*/


var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; //variables tracking the user guess attempts
var col = 0; 

var gameOver = false;  //initializing the game to be complete

var word = "SQUID";  //declared word to be SQUID but can change

window.onload = function () {
  intialize();  //when the window just loads, run this function, can treat this function as the main function 
};

function intialize() {  //main function for initializing the boxes for the user inputs
  for (let r = 0; r < height; r++) {  
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span"); //creating a <span id="0-0" class="tile"></span>
      tile.id = r.toString() + "-" + c.toString();  //creating the tile id to be r-c
      tile.classList.add("tile");  //editing the span to have class="tile" for css
      tile.innerText = "";  //inserting an inner text of null
      document.getElementById("board").appendChild(tile); //going to find board and then create the span tag into the board div
    }
  }

  //listen for keypress from the user

  document.addEventListener("keyup", (e) => {  //when there is a keyup from the user
    if (gameOver) return;  //if gameOver, return nothing and end

    //alert(e.code);

    if ("KeyA" <= e.code && e.code <= "KeyZ") {  //if the user entered a alpha character
      //conditional statement ensurring that the user input is a letter
      if (col < width) {  //if the current col is less than the width
        let currentTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );  //creating an index of currentTile
        if (currentTile.innerText == "") {  //if the current tile has nothing in it, replace the character inside with just the character from eventListener
          currentTile.innerText = e.code[3];
          col += 1;  //Move onto the next tile
        }
      }
    } else if (e.code == "Backspace") {  //If the backspace is pressed by the user
      if (0 < col && col <= width) {
        //if the user is not on the first letter or the user is less than the width to ensure that backspace is legal
        col -= 1;  //Move back one column for the next iteration
      }
      let currentTile = document.getElementById(  //creating the currentTile index again
        row.toString() + "-" + col.toString()  //searching for the index
      );
      currentTile.innerText = "";  //change the tile content to null
    } else if (e.code == "Enter") {  //If the enter is pressed by the user
      update();  //run the update function only called when the user hits enter
      row += 1;  //start a new row
      col = 0;  //the col is restarted to start at 0
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  }); //once the key is lifted, we will then key a change
}

function update(){
  let correct = 0;  //init the correct var

  for (let c = 0; c < width; c++){  //iterate through the width which is 5
    let currentTile = document.getElementById(  //get the current element in the iteration
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;  //Retrieve the letter in that box

    //if the letters are in the correct position
    if (word[c] == letter) {  //if the word[c] == currentTile(letter)
      currentTile.classList.add("correct");  //change that tile to correspond to the css 'correct' 
      correct += 1;  //correct++
    }
    else if (word.includes(letter)) {
      currentTile.classList.add("present");  //if the word contains this letter but incorrect spot, change tile to yellow
    }
    else {
      currentTile.classList.add("absent");  //if the word doesnt have that letter at all, return gray
    }

    if (correct == width) {  //if all the letters are in the correct postion, return true
      gameOver = true;  //gameOver = true;
    }
  }

}
