const myJSON = JSON.parse(upcoming);
const divGames =  document.getElementById('listAllGames');

//FALTA FAZER O COUNTDOWN SER EM TEMPO REAL.
//VER ERRO CHATO NA LINHA 42, PQP.
//FALTA ESTILIZAR MELHOR A DATA APRESENTADA
//FALTA ESTILIZAR MELHOR O COUNTDOWN.
//FALTA VER COMO ATUALIZAR O JSON SERVER SIDE - BUSCAR MAIS INFOS.
//PEGAR UNS LAYOUTS MANEIROS PARA OS CARDS
//DEPOIS DE TERMINAR O DA SG TENTAR FAZER O DO RDO DEPOIS DUNHA1-DEPOIS NOPING
// PALETA: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8


function createGamesCard() {
	for (let games in myJSON) {
		let game = document.createElement('div');
		game.setAttribute('class', 'gameCard');
		divGames.appendChild(game);
	}
}
createGamesCard();

function countDownClock(gameDate) {
	let countDownDate = new Date(gameDate).getTime()
	let dateTimeNow = new Date().getTime();
	let dateDiff = (countDownDate - dateTimeNow);
	let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
	let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
	return `Faltam Dias: ${days} - ${hours}:${minutes}:${seconds}`;
};


let novadata = myJSON[0].begin_at;
console.log(novadata)

function populateGameCard() {
	let allGamesCards = document.querySelectorAll('.gameCard');
	for (let card in allGamesCards) {
		let gameName = document.createElement('p');
		let gameDate = document.createElement('p');
		let gameCountDown = document.createElement('p');
		gameName.innerText = myJSON[card].name;
		gameDate.innerText = 'Agendado Para: ' + myJSON[card].begin_at.slice(0,10) + ' às ' + myJSON[card].begin_at.slice(11,16);
		gameCountDown.innerText = countDownClock(myJSON[card].begin_at);
		allGamesCards[card].appendChild(gameName);
		allGamesCards[card].appendChild(gameCountDown);
	  allGamesCards[card].appendChild(gameDate);
	}
}

populateGameCard();
