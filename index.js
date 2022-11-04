const keys = document.querySelectorAll(".normal-key");
const enter = document.querySelector("#ENTER");
const back = document.querySelector("#BACK");
const card = document.querySelector("#card");
const output = document.querySelector("#output");
var letterCount = 0;
var rowCount = 0;
var correctWord = "HARSH";
var userWord = "";
var strCorrectWord = correctWord.split("");
var greenLetters = [];
var yellowLetters = [];
var darkLetters = [];
var win = false;

for (let key of keys) {
  key.addEventListener("click", function (e) {
    if (!win) {
      if (letterCount < 5) {
        card.children[rowCount].children[letterCount].children[0].innerText =
          e.target.id;
        letterCount++;
        userWord += e.target.id;
      }
    }
  });
}

enter.addEventListener("click", function () {
  if (!win) {
    if (letterCount == 5) {
      checkWord();
      setKeys();
      rowCount++;
      if (rowCount === 6) {
        output.children[0].innerText = "You Lose!";
        output.children[1].innerText = `Answer was: ${correctWord}`;
      }
      letterCount = 0;
      userWord = "";
      greenLetters = [];
      yellowLetters = [];
      darkLetters = [];
    }
  }
});

back.addEventListener("click", function () {
  card.children[rowCount].children[letterCount - 1].children[0].innerText = "";
  letterCount--;
  userWord = userWord.slice(0, -1);
});

function checkWord() {
  var strUserWord = userWord.split("");
  if (userWord !== correctWord) {
    for (let i = 0; i < correctWord.length; i++) {
      if (strCorrectWord[i] === strUserWord[i]) {
        card.children[rowCount].children[i].classList.add("green");
        greenLetters.push(strUserWord[i]);
      } else if (strCorrectWord.includes(strUserWord[i])) {
        card.children[rowCount].children[i].classList.add("yellow");
        yellowLetters.push(strUserWord[i]);
      } else {
        card.children[rowCount].children[i].classList.add("dark-grey");
        darkLetters.push(strUserWord[i]);
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      card.children[rowCount].children[i].classList.add("green");
      greenLetters.push(strUserWord[i]);
      gameWon();
      win = true;
    }
  }
}

function setKeys() {
  console.log(greenLetters);
  console.log(yellowLetters);
  console.log(darkLetters);
  for (let key of keys) {
    if (greenLetters.includes(key.id)) {
      if (key.classList[1] === "yellow") {
        key.classList.remove("yellow");
      }
      key.classList.add("green");
    } else if (yellowLetters.includes(key.id)) {
      if (key.classList[1] !== "green") {
        key.classList.add("yellow");
      }
    } else if (darkLetters.includes(key.id)) {
      key.classList.add("dark-grey");
    }
  }
}

function gameWon() {
  output.children[0].innerText = "You Win!";
}
