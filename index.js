document.querySelector("#player-num-form").addEventListener("submit", saveNumOfPlayers)
let numOfPlayers = 0
let totalFrames = 0
let currentFrame = 1
let currentPlayer = 1
let currentBowl = 1

function saveNumOfPlayers(e){
  e.preventDefault()
  document.querySelector("main").innerHTML = ""
  numOfPlayers = e.target.childNodes[3].value
  totalFrames = numOfPlayers * 10
  createPlayerCards(numOfPlayers)
  document.querySelector(".score-form").setAttribute("class", "score-form")
  document.querySelector(".score-form").addEventListener("submit", addScore)
  document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
}

function createPlayerCards(num){
  for(var i = 0; i < num; i++){
    let playerCard = document.createElement("div")
    playerCard.setAttribute("id", i + 1)
    playerCard.setAttribute("class", "player-card")
    let player = document.createElement("h1")
    player.innerText = `Player ${i + 1}`
    playerCard.appendChild(player)
    createFrameCards(playerCard)
    document.querySelector("main").appendChild(playerCard)
  }
}

function createFrameCards(div){
  for(var j = 0; j < 10; j++){
    let frameCard = document.createElement("div")
    frameCard.setAttribute("class", `${j +1} frame-card`)
    let frameLabel = document.createElement("h2")
    frameLabel.innerText = `Frame ${j + 1}`
    let frameScore1 = document.createElement("p")
    frameScore1.setAttribute("class", "frame-score-1")
    let frameScore2 = document.createElement("p")
    frameScore2.setAttribute("class", "frame-score-2")
    let totalScore = document.createElement("p")
    totalScore.setAttribute("class", "total-score")
    frameCard.appendChild(frameLabel)
    frameCard.appendChild(frameScore1)
    frameCard.appendChild(frameScore2)
    frameCard.appendChild(totalScore)
    div.appendChild(frameCard)
  }
}

function addScore(e){
  e.preventDefault()
  
  setCurrentBowl()
}

function setCurrentBowl(){
  document.querySelector(".score-label").innerText = ""
  if(currentBowl === 1){
    currentBowl = 2
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else {
    currentBowl = 1
    setCurrentPlayer()
  }
}

function setCurrentPlayer(){
  if(currentPlayer < Number(numOfPlayers)){
    currentPlayer++
  } else if(currentPlayer === Number(numOfPlayers)){
    currentPlayer = 1
    currentFrame++
  }
  document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
}
