const boxes = document.querySelectorAll(".square");
const gameMessage = document.getElementById("gameMessage");
const resetButton = document.getElementById("resetButton");

let isPlayerOneTurn = true;
let gameOver = false;

const changePlayer = () => {
  isPlayerOneTurn = !isPlayerOneTurn;
  gameMessage.innerText = isPlayerOneTurn
    ? "Player 1, it's your turn!"
    : "Player 2, it's your turn!";
};

const isBoxEmpty = (box) => {
  return (box.style.backgroundColor !== "blue" && box.style.backgroundColor != "red");
};

const fillBox = (box) => {
  box.style.backgroundColor = isPlayerOneTurn ? "blue" : "red";
};

const handleBoxClick = (box) => {
  if (gameOver) {
    return;
  }
  if (isBoxEmpty(box)) {
    fillBox(box);
    if (isWinner(boxes)) {
      gameOver = true;
      displayWinner();
      resetButton.style.display = "block";
      return;
    }
    changePlayer();
  } else {
    alert("This box is already filled!");
  }
};

const displayWinner = () => {
  gameMessage.innerText = isPlayerOneTurn ? "Player 1 wins!" : "Player 2 wins!";
};

const isWinner = (boxes) => {
  const winningCombos = [
    [0, 1, 2], //horizontal
    [0, 3, 6], //vertical
    [0, 4, 8], //diagonal
    [1, 4, 7], //vertical
    [2, 5, 8], //vertical
    [2, 4, 6], //diagonal
    [3, 4, 5], //horizontal
    [6, 7, 8],
  ];

  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      boxes[a].style.backgroundColor &&
      boxes[a].style.backgroundColor === boxes[b].style.backgroundColor &&
      boxes[a].style.backgroundColor === boxes[c].style.backgroundColor
    );
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => handleBoxClick(box));
});

resetButton.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.style.backgroundColor = "";
  });
  isPlayerOneTurn = true;
  gameOver = false;
  resetButton.style.display = "none";
  gameMessage.innerText = "Player One, click the board to start the game!"
});
