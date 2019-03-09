/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
'use strict'
var scores, roundScore, activePlayer, dice, gamePlaying, prevRoundScore, inputGoal;
inputGoal = 100;
document.getElementsByClassName('btn-new')[0].addEventListener('click',resetTheGame);
document.getElementsByClassName('btn-roll')[0].addEventListener('click',rollDice);
document.getElementsByClassName('btn-hold')[0].addEventListener('click',changePlayer);
document.querySelector('.btn-goal').addEventListener('click', inputScore);
resetTheGame();

function inputScore(){
    inputGoal = Number(document.getElementById('goal').value);
    console.log(typeof(inputGoal));
    console.log('this new goal is :' + inputGoal);
    resetTheGame();
}


function rollDice(){
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').setAttribute('src','dice-' + dice + '.png');
        if (dice === 1){
            roundScore = 0;
            changePlayer();
        } else if(dice === 6 && prevRoundScore === 6){
            scores[activePlayer] = 0;
            roundScore = 0;
            prevRoundScore = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            changePlayer();            
        } else {
            roundScore += dice;
            prevRoundScore = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
}

function resetTheGame(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    prevRoundScore = 0;
    gamePlaying = true;
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-' + 0).textContent = "Player 0";
    document.getElementById('name-' + 1).textContent = "Plyaer 1";  
    var tmpCur = document.querySelectorAll('.player-current-score');
    console.log(tmpCur);
    for (var tmp of tmpCur) {
        console.log(tmp);
        tmp.textContent = 0;
    }
    var tmpSc = document.querySelectorAll('.player-score');
    for (var ttmp of tmpSc) {
        console.log(ttmp);
        ttmp.textContent = 0;
    }

}


function changePlayer(){
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        roundScore = 0;
        prevRoundScore = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        console.log('cur player score is:' + scores[activePlayer]);
        console.log('goal is: ' + inputGoal);
        if (scores[activePlayer] >= inputGoal) {
            document.getElementById('name-' + activePlayer).textContent = "Winner!";  
            gamePlaying = false;
        }
        activePlayer = activePlayer === 1 ? 0 : 1;
        document.querySelector('.active').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
}