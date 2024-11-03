const guessesArray = [];
let wordsArray = [];
let columnNumber = 0;
let rowNumber = 0;
let isHardmode = false;
let incorrectLetters = [];
let correctLetters = ["0", "0", "0", "0", "0"];
let wrongLetters = [];
let response = "";
loadDoc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            read(this.responseText);
        }
    };
    xhttp.open("GET", "allowedGuesses.txt", true);
    xhttp.send();
}

function read(text) {
    wordsArray = text.split("\n");
}

function keyboard(letter) {
    if (columnNumber < 5) {
        let cell = document.getElementById("cell" + rowNumber + "-" + columnNumber);
        cell.innerHTML = letter;
        columnNumber++;
    }
}

function backspace() {
    if (columnNumber > 0) {
        columnNumber--;
        let cell = document.getElementById("cell" + rowNumber + "-" + columnNumber)
        cell.innerHTML = "";
    }
}

function enter() {
    let guess = "";
    for (let i = 0; i < 5; i++) {
        let cell = document.getElementById("cell" + rowNumber + "-" + i);
        guess += cell.innerHTML;
    }
    if (checkGuess(guess)) {
        guessesArray.push(guess);
        sendGuess(guess);
        rowNumber++;
        columnNumber = 0;
    } else {
        alert("Guess is not valid! Please try again.");
    }
}

function format(character) {
    for (let i = 0; i < 5; i++) {
        let cell = document.getElementById("cell" + (rowNumber - 1) + "-" + i);
        if (character[i] == "correct") {
            cell.classList.add("correct");
        } else if (character[i] == "dead") {
            cell.classList.add("incorrect");
        } else if (character[i] == "wrong") {
            cell.classList.add("wrongSpot");
        }
    }
}

function checkGuess(guess) {
    for (let i = 0; i < wordsArray.length; i++) {
        let valid = wordsArray[i];
        if (valid.toUpperCase() == guess) {
            return true;
        }
    }
    return false;
}

function sendGuess(guess) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            format(response);
        }
    };
    xmlhttp.open("GET", "server.php?q=" + guess, true);
    xmlhttp.send();
}

document.addEventListener('keydown', function(event) {
    let key = event.keyCode;
    switch (key) {
        case 81:
            keyboard("Q");
            break;
        case 87:
            keyboard("W");
            break;
        case 69:
            keyboard("E");
            break;
        case 82:
            keyboard("R");
            break;
        case 84:
            keyboard("T");
            break;
        case 89:
            keyboard("Y");
            break;
        case 85:
            keyboard("U");
            break;
        case 73:
            keyboard("I");
            break;
        case 79:
            keyboard("O");
            break;
        case 80:
            keyboard("P")
            break;
        case 65:
            keyboard("A");
            break;
        case 83:
            keyboard("S");
            break;
        case 68:
            keyboard("D");
            break;
        case 70:
            keyboard("F");
            break;
        case 71:
            keyboard("G");
            break;
        case 72:
            keyboard("H");
            break;
        case 74:
            keyboard("J");
            break;
        case 75:
            keyboard("K");
            break;
        case 76:
            keyboard("L");
            break;
        case 90:
            keyboard("Z");
            break;
        case 88:
            keyboard("X");
            break;
        case 67:
            keyboard("C");
            break;
        case 86:
            keyboard("V");
            break;
        case 66:
            keyboard("B");
            break;
        case 78:
            keyboard("N");
            break;
        case 77:
            keyboard("M");
            break;
        case 13:
            enter();
            break;
        case 8:
            backspace();
            break;
    }

});