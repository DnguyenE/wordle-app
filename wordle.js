var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; //variables tracking the user guess attempts
var col = 0;

var gameOver = false;

var word = "SQUID";

window.onload = function () {
  intialize();
};

function intialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span"); //creating a <span id="0-0" class="tile"></span>
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile); //going to find board and then create the span tag into the board div
    }
  }

  //listen for keypress from the user

  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    //alert(e.code);

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      //conditional statement ensurring that the user input is a letter
      if (col < width) {
        let currentTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currentTile.innerText == "") {
          currentTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {  //If the backspace is pressed by the user
      if (0 < col && col <= width) {
        //if the user is not on the first letter or the user is less than the width to ensure that backspace is legal
        col -= 1;
      }
      let currentTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currentTile.innerText = "";
    } else if (e.code == "Enter") {  //If the enter is pressed by the user
      update();
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
  let correct = 0;

  for (let c = 0; c < width; c++){
    let currentTile = document.getElementById(
      row.toString() + "-" + col.toString()
    );
    let letter = currentTile.innerText;

    //if the letters are in the correct position
    if (word[c] == letter) {
      tile.classList.add("correct");
    }
  }

}
