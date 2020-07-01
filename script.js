// campo Fiorito
var campo = document.getElementById("campo");
for (var i = 1; i <= 100; i++) {
  campo.innerHTML += "<div class=\"square\" id=\"" + i + "\">" + "<span id=\"pickme-" + i + "\">" + i + "</span>" + "</div>"
}

// Seleziona difficoltà
var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var difficolta = document.getElementById("difficolta").value;
  var maxRange = 0;

  campo.innerHTML = "";

  if (difficolta == 0) {
    maxRange = 100;
  } else if (difficolta == 1) {
    maxRange = 80;
  } else {
    maxRange = 50;
  }

  makeGriglia(campo, maxRange);

  // Il computer deve generare 16 numeri casuali tra 1 e 100.
  // I numeri non possono essere duplicati
  var randomCPU = [];
  var num = 0;
  var maxFiori = 16;
  for (var i = 0; i < maxFiori; i++) {
    num = randomNum(1, maxRange);
    if (randomCPU.indexOf(num) == -1) {
      randomCPU.push(num);
    } else {
      i--;
    }
  }
  console.log(randomCPU);

  // In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
  // L’utente non può inserire più volte lo stesso numero.
  // Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
  // La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
  var numUser = 0;
  var numUserArray = [];
  var punteggio = 0;
  var squareColor = "";
  var numSquare = "";
  var maxTentativi = maxRange - maxFiori;

  var i = 1;
  var promptAlternativo = "";
  while (i <= maxTentativi) {
    numUser = parseInt(window.prompt("Inserisci un numero compreso tra 1 e" + " " + maxRange));
    squareColor = document.getElementById(numUser);
    numSquare = document.getElementById("pickme-" + numUser);

     if ((isNaN(numUser)) || (numUser > maxRange)) {
      promptAlternativo = window.prompt("HO DETTO INSERISCI UN NUMERO DA 1 A " + maxRange);
      i--;
    } else if (randomCPU.indexOf(numUser) != -1) {
      squareColor.className += " red";
      numSquare.className = "show";
      i = maxTentativi + 1;
    } else if (numUserArray.indexOf(numUser) == -1) {
      numUserArray.push(numUser);
      squareColor.className += " green";
      numSquare.className = "show";
      punteggio++;
    } else if (numUserArray.indexOf(numUser) != -1) {
      promptAlternativo = window.prompt("Questo numero è già stato inserito");
      i--;
    }

    i++;
  }
  console.log(numUserArray);

  // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
  var result = document.getElementById("result");
  if (punteggio == maxTentativi) {
    result.innerHTML = "Il tuo punteggio è: " + punteggio + "Complimenti! Hai raggiunto il punteggio massimo!";
  } else {
    result.innerHTML = "Il tuo punteggio è: " + punteggio;
  }

});

function randomNum(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var result = Math.floor(Math.random()*(max - min + 1)) + min;
  return result;
}

function makeGriglia(griglia, max) {
  for (var i = 1; i <= max; i++) {
    griglia.innerHTML += "<div class=\"square\" id=\"" + i + "\">" + "<span id=\"pickme-" + i + "\">" + i + "</span>" + "</div>"
  }
}
