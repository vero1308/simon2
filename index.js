//lance le jeu avec une séquence aléatoire
let playerSequence = []; //quand le joueur joue et tape dans l'ordre
let validSequence = []; //la sequence que le joueur doit répeter (elle est génerée une seule fois au démarrage)
let flash; //quand ça change "s'éclaire"
let good; //quand c'est bon
let on = false; //pour demarrer
let sequenceMaxLength = 5; //la taille de la sequence à reproduire, à changer pour determiner la longueur du jeu
let win; //quand le joueur gagne et la séquence continue
let sound; //pour que le son se déclenche qd la touche est allumée
let difficulty = 1; // à chaque sequence la difficulté incremente, elle est égale à la quantité de touches à jouer à chaque étape
let points; //les points s'incrémentent. Quand on arrive à 10 -> message pour aller jusqu'à 20.
let speed = 1000; // la vitesse d'affichage de la sequence du jeu, elle est diminuite à chaque niveau
const turnCounter = document.querySelector("#counter");
const topLeft = document.querySelector("#btnTopLeft");
const topRight = document.querySelector("#btnTopRight");
const bottomLeft = document.querySelector("#btnBottomLeft");
const bottomRight = document.querySelector("#btnBottomRight");
const startButton = document.querySelector(".btn.start");
startButton.addEventListener("click", event => {
  initialize(); //on initialise toutes les variables du jeu
});
function initialize() {
  difficulty = 1;
  on = true;
  points = 0;
  playerSequence = [];
  validSequence = generateRandomSequence();
  playSequence(0);
}
function clearColor() {
  topLeft.style.backgroundColor = "#007";
  topRight.style.backgroundColor = "#e22025";
  bottomLeft.style.backgroundColor = "#2a960d";
  bottomRight.style.backgroundColor = "#FFFB0C";
}
function flashColor() {
  topLeft.style.backgroundColor = "royalblue";
  topRight.style.backgroundColor = "#FFA061";
  bottomLeft.style.backgroundColor = "#34FF23";
  bottomRight.style.backgroundColor = "#EBAF15";
}
async function playSequence(i) {
  // cette function reproduit la sequence aleatoire
  if (i < difficulty) {
    setTimeout(() => {
      if (validSequence[i] == 1) one();
      if (validSequence[i] == 2) two();
      if (validSequence[i] == 3) three();
      if (validSequence[i] == 4) four();
      playSequence(i + 1);
    }, speed);
  }
}
function gameCounter() {
  for (let i = 0; i <= 5; i++) {}
}
function generateRandomSequence() {
  // elle est appelée une seule fois au démarrage cette fonction
  let sequence = [];
  for (var i = 0; i < 100; i++) {
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  return sequence;
}
function getRandomNote() {
  const notes = [one, two, three, four];
  const randomIndex = Math.floor(Math.random() * notes.length);
  console.log(randomIndex);
  return notes[randomIndex];
}
function one() {
  //quand la touche en haut à gauche est appelée
  let audio = new Audio(
    (src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
  );
  audio.play();
  topLeft.style.backgroundColor = "royalblue";
  setTimeout(() => {
    topLeft.style.backgroundColor = "#007";
  }, 300);
}
function two() {
  //quand la touche en haut à droite est appelée
  let audio = new Audio(
    (src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  );
  audio.play();
  topRight.style.backgroundColor = "#FFA061";
  setTimeout(() => {
    topRight.style.backgroundColor = "#e22025";
  }, 300);
}
function three() {
  //quand la touche en bas à gauche est appelée
  let audio = new Audio(
    (src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
  );
  audio.play();
  bottomLeft.style.backgroundColor = "#34FF23";
  setTimeout(() => {
    bottomLeft.style.backgroundColor = "#2a960d";
  }, 300);
}
function four() {
  //quand la touche en bas à droite est appelée
  let audio = new Audio(
    (src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
  );
  audio.play();
  bottomRight.style.backgroundColor = "#EBAF15";
  setTimeout(() => {
    bottomRight.style.backgroundColor = "#FFFB0C";
  }, 300);
}
topLeft.addEventListener("click", event => {
  //joueur presse touche 1
  if (on) {
    playerSequence.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
topRight.addEventListener("click", event => {
  //joueur presse touche 2
  if (on) {
    playerSequence.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
bottomLeft.addEventListener("click", event => {
  //joueur presse touche 3
  if (on) {
    playerSequence.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
bottomRight.addEventListener("click", event => {
  //joueur presse touche 4
  if (on) {
    playerSequence.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
function check() {
  let lastTouch = playerSequence.length - 1; //lance la séquence
  if (playerSequence[lastTouch] !== validSequence[lastTouch]) {
    console.log("wrong");
    turnCounter.innerHTML = "NO!";
    clearColor();
    initialize(); // si le joueur se trompe on reinitialise le jeu
  } else if (playerSequence.length == difficulty) {
    if (playerSequence.length == sequenceMaxLength) {
      // le joueur a bien accompli la sequence
      winGame();
      return;
    }
    playerSequence = [];
    difficulty++;
    turnCounter.innerHTML = difficulty.toString();
    setTimeout(() => {
      playSequence(0);
    }, 500);
  }
}
function winGame() {
  playerSequence = [];
  difficulty++;
  speed = Math.ceil(speed / 2); //ça augmente la vitesse de réponse?
  sequenceMaxLength += 5;
  turnCounter.innerHTML = "WIN!"; //quand joueur fait une séquence de 5
  setTimeout(() => {
    playSequence(0);
  }, 500);
}
