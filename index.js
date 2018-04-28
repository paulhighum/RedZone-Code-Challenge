document.querySelector("#player-num-form").addEventListener("submit", saveNumOfPlayers)

function saveNumOfPlayers(e){
  let numOfPlayers = e.target.childNodes[3].value
  for(var i = 0; i < numOfPlayers; i++){
    let playerCard = document.createElement("div")
    playerCard.setAttribute("id", i + 1)
    let player = document.createElement("h1")
    player.innerText = `Player ${i + 1}`
    playerCard.appendChild(player)
    document.querySelector("main").appendChild(playerCard)
  }
}

function createRoundCards(div){
  for(var j = 0; j < 10; j++){
    let roundCard = document.createElement("div")
    roundCard.setAttribute("class", j)  
  }
}