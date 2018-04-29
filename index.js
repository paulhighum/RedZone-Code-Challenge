document.querySelector("#player-num-form").addEventListener("submit", saveNumOfPlayers)
let numOfPlayers = 0
let totalFrames = 0
let currentFrame = 1
let currentPlayer = 1
let currentBowl = 1
let scoreArray =[]

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
    scoreArray.push([])
    let playerCard = document.createElement("div")
    playerCard.setAttribute("id", `player${i + 1}`)
    playerCard.setAttribute("class", "player-card")
    let player = document.createElement("h1")
    player.innerText = `Player ${i + 1}`
    playerCard.appendChild(player)
    createFrameCards(playerCard, i)
    document.querySelector("main").appendChild(playerCard)
  }
}

function createFrameCards(div, i){
  for(var j = 0; j < 10; j++){
    let frameCard = document.createElement("div")
    frameCard.setAttribute("class", `player${i + 1}frame${j + 1} frame-card`)
    let frameLabel = document.createElement("h2")
    frameLabel.innerText = `Frame ${j + 1}`
    let frameScore1 = document.createElement("p")
    frameScore1.setAttribute("class", "frame-score-1")
    let frameScore2 = document.createElement("p")
    frameScore2.setAttribute("class", "frame-score-2")
    let frameScoreDiv = document.createElement("div")
    frameScoreDiv.setAttribute("class", "frame-score-div")
    let totalScore = document.createElement("p")
    totalScore.setAttribute("class", "total-score")
    frameCard.appendChild(frameLabel)
    frameCard.appendChild(totalScore)
    frameScoreDiv.appendChild(frameScore1)
    frameScoreDiv.appendChild(frameScore2)
    frameCard.appendChild(frameScoreDiv)
    div.appendChild(frameCard)
  }
}

function addScore(e){
  e.preventDefault()
  let score = Number(e.target.childNodes[3].value)
  let currentPlayerScoreArr = scoreArray[currentPlayer - 1]
  currentPlayerScoreArr.push(score)
  addScoreToHTML(currentPlayerScoreArr, score)
  console.log(scoreArray)
}

function addScoreToHTML(currentPlayerScoreArr, score){
  if(score === 10){
    currentBowl = 1
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[2].childNodes[0].innerText = "X"
    setCurrentPlayer()
  } else if(currentBowl === 1){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[2].childNodes[0].innerText = score
    document.querySelector("#input-score").setAttribute("max", 10 - score)
    currentBowl = 2
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 2 && currentPlayerScoreArr[currentPlayerScoreArr.length - 2] + score === 10){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[2].childNodes[1].innerText = "/"
    currentBowl = 1
    document.querySelector("#input-score").setAttribute("max", 10)
    setCurrentPlayer()
  } else {
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[2].childNodes[1].innerText = score
    currentBowl = 1
    document.querySelector("#input-score").setAttribute("max", 10)
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
