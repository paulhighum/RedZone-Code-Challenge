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
    let totalScoreDiv = document.createElement("div")
    totalScoreDiv.setAttribute("class", "total-score-div")
    let totalScore = document.createElement("p")
    totalScore.setAttribute("class", `player${i + 1}-total-score`)
    let totalScoreLabel = document.createElement("h3")
    totalScoreLabel.setAttribute("class", "total-score-label")
    totalScoreLabel.innerText = "Total Score"
    totalScoreDiv.appendChild(totalScoreLabel)
    totalScoreDiv.appendChild(totalScore)
    playerCard.appendChild(player)
    playerCard.appendChild(totalScoreDiv)
    createFrameCards(playerCard, i)
    document.querySelector("main").appendChild(playerCard)
  }
}

function createFrameCards(div, i){
  for(var j = 0; j < 10; j++){
    if(j === 9){
      let frameCard = document.createElement("div")
      frameCard.setAttribute("class", `player${i + 1}frame${j + 1} frame-card`)
      let frameLabel = document.createElement("h2")
      frameLabel.innerText = `Frame ${j + 1}`
      let frameScore1 = document.createElement("p")
      frameScore1.setAttribute("class", "frame-score-1")
      let frameScore2 = document.createElement("p")
      frameScore2.setAttribute("class", "frame-score-2")
      let frameScore3 = document.createElement("p")
      frameScore3.setAttribute("class", "frame-score-3")
      let frameScoreDiv = document.createElement("div")
      frameScoreDiv.setAttribute("class", "frame-score-div")
      frameCard.appendChild(frameLabel)
      frameScoreDiv.appendChild(frameScore1)
      frameScoreDiv.appendChild(frameScore2)
      frameScoreDiv.appendChild(frameScore3)
      frameCard.appendChild(frameScoreDiv)
      div.appendChild(frameCard)
    } else {
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
      frameCard.appendChild(frameLabel)
      frameScoreDiv.appendChild(frameScore1)
      frameScoreDiv.appendChild(frameScore2)
      frameCard.appendChild(frameScoreDiv)
      div.appendChild(frameCard)
    }
  }
}

function addScore(e){
  e.preventDefault()
  let score = Number(e.target.childNodes[3].value)
  let currentPlayerScoreArr = scoreArray[currentPlayer - 1]
  if(currentFrame === 10 && currentBowl === 3){
    addScoreToHTMLTenthFrame(currentPlayerScoreArr, score)
    let realCurrentPlayer = determineRealCurrentPlayer()
    calcTotalScoreEnd(scoreArray[realCurrentPlayer - 1], realCurrentPlayer)
  } else if(currentFrame === 10 && currentBowl === 2){
    addScoreToHTMLTenthFrame(currentPlayerScoreArr, score)
    let realCurrentPlayer = determineRealCurrentPlayer()
    calcTotalScorePenultimate(scoreArray[realCurrentPlayer - 1], realCurrentPlayer)
  } else if(currentFrame === 10){
    addScoreToHTMLTenthFrame(currentPlayerScoreArr, score)
    let realCurrentPlayer = determineRealCurrentPlayer()
    calcTotalScore(scoreArray[realCurrentPlayer - 1], realCurrentPlayer)
  } else {
    addScoreToHTML(currentPlayerScoreArr, score)
    let realCurrentPlayer = determineRealCurrentPlayer()
    calcTotalScore(scoreArray[realCurrentPlayer - 1], realCurrentPlayer)
  }
  console.log(scoreArray)
}

function addScoreToHTML(array, score){
  if(score === 10){
    currentBowl = 1
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[0].innerText = "X"
    array.push("X")
    setCurrentPlayer()
  } else if(currentBowl === 1){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[0].innerText = score
    document.querySelector("#input-score").setAttribute("max", 10 - score)
    array.push(score)
    currentBowl = 2
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 2 && array[array.length - 1] + score === 10){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[1].innerText = "/"
    array.push("/")
    currentBowl = 1
    document.querySelector("#input-score").setAttribute("max", 10)
    setCurrentPlayer()
  } else {
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[1].innerText = score
    array.push(score)
    currentBowl = 1
    document.querySelector("#input-score").setAttribute("max", 10)
    setCurrentPlayer()
  }
}

function addScoreToHTMLTenthFrame(array, score){
  if(currentBowl === 1 && score === 10){
    currentBowl = 2  
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[0].innerText = "X"
    array.push("X")
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 2 && score === 10){
    currentBowl = 3
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[1].innerText = "X"
    array.push("X")
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 3 && score === 10){
    currentBowl = 1
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[2].innerText = "X"
    array.push("X")
    setCurrentPlayer()
  } else if(currentBowl === 2 && array[array.length - 1] + score === 10){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[1].innerText = "/"
    array.push("/")
    currentBowl = 3
    document.querySelector("#input-score").setAttribute("max", 10)
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 2 && array[array.length - 1] === "X"){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[1].innerText = score
    document.querySelector("#input-score").setAttribute("max", 10 - score)
    array.push(score)
    currentBowl = 3
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else if(currentBowl === 1){
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[0].innerText = score
    document.querySelector("#input-score").setAttribute("max", 10 - score)
    array.push(score)
    currentBowl = 2
    document.querySelector(".score-label").innerText = `Player ${currentPlayer}, Frame ${currentFrame}, Bowl ${currentBowl} Score:`
  } else {
    document.querySelector(`.player${currentPlayer}frame${currentFrame}`).childNodes[1].childNodes[currentBowl - 1].innerText = score
    array.push(score)
    currentBowl = 1
    document.querySelector("#input-score").setAttribute("max", 10)
    setCurrentPlayer()
  }
}

function calcTotalScore(array, person){
  let total = 0
  for(var i = 0; i < array.length; i++){
    if(array[i] === "X"){
      if(array.length === i + 1){
        total += 10
      } else if(array.length === i + 2){
        if(array[i + 1] === "X"){
          total += 20
        } else {
          total += 10 + Number(array[i + 1])
        }
      } else {
        if(array[i + 1] === "X" && array[i + 2] === "X"){
          total += 30
        } else if(array[i + 1] === "X" && array[i + 2] != "X"){
          total += 20 + Number(array[i + 2])
        } else if(array[i + 2] === "/"){
          total += 20
        } else {
          total += 10 + array[i + 1] + array[i + 2]
        }
      }
    } else if(array[i] === "/"){
      if(array.length === i + 1){
        total += 10
      } else if(array[i + 1] === "X"){
        total += 20
      } else {
        total += 10 + array[i + 1]
      }
    } else if(array[i + 1] === "/"){
      total += 0
    } else {
      total += array[i]
    }
    
  }
  document.querySelector(`.player${person}-total-score`).innerText = total
  
}

function calcTotalScorePenultimate(array, person){
  let total = 0
  for(var i = 0; i < array.length; i++){
    if(array[i] === "X"){
      if(array.length === i + 1 || array.length === i + 2){
        total += 10
      } else {
        if(array[i + 1] === "X" && array[i + 2] === "X"){
          total += 30
        } else if(array[i + 1] === "X" && array[i + 2] != "X"){
          total += 20 + Number(array[i + 2])
        } else if(array[i + 2] === "/"){
          total += 20
        } else {
          total += 10 + array[i + 1] + array[i + 2]
        }
      }
    } else if(array[i] === "/"){
      if(array.length === i + 1 ){
        total += 10
      } else if(array[i + 1] === "X"){
        total += 20
      } else {
        total += 10 + array[i + 1]
      }
    } else if(array[i + 1] === "/"){
      total += 0
    } else {
      total += array[i]
    }
    
  }
  document.querySelector(`.player${person}-total-score`).innerText = total
}

function calcTotalScoreEnd(array, person){
  let total = 0
  for(var i = 0; i < array.length; i++){
    if(array[i] === "X"){
      if(array.length === i + 1 || array.length === i + 2 || array.length === i + 3){
        total += 10
      } else {
        if(array[i + 1] === "X" && array[i + 2] === "X"){
          total += 30
        } else if(array[i + 1] === "X" && array[i + 2] != "X"){
          total += 20 + Number(array[i + 2])
        } else if(array[i + 2] === "/"){
          total += 20
        } else {
          total += 10 + array[i + 1] + array[i + 2]
        }
      }
    } else if(array[i] === "/"){
      if(array.length === i + 1 || array.length === i + 2){
        total += 10
      } else if(array[i + 1] === "X"){
        total += 20
      } else {
        total += 10 + array[i + 1]
      }
    } else if(array[i + 1] === "/"){
      total += 0
    } else {
      total += array[i]
    }
    
  }
  document.querySelector(`.player${person}-total-score`).innerText = total
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

function determineRealCurrentPlayer(rcp){
  if(currentBowl === 2 || currentBowl === 3){
    rcp = currentPlayer
  } else if(currentPlayer === 1){
    rcp = Number(numOfPlayers)
  } else {
    rcp = currentPlayer - 1
  }
  return rcp
}
