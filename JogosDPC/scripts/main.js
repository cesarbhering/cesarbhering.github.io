const myJSON = JSON.parse(upcoming);
const divGames =  document.getElementById('listAllGames');


//FALTA VER COMO ATUALIZAR O JSON SERVER SIDE - BUSCAR MAIS INFOS.
//PEGAR UNS LAYOUTS MANEIROS PARA OS CARDS
//DEPOIS DE TERMINAR O DA SG TENTAR FAZER O DO RDO DEPOIS DUNHA1-DEPOIS NOPING - DEPOIS CREWMATES - DEPOIS BINOMISTAS
// PALETA: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
// Adicionar as transmissoes (em PT BR CLARO)

// Cria os cartões dos jogos
function createGamesCard() {
	for (let games in myJSON) {
		let game = document.createElement('div');
		game.setAttribute('class', 'gameCard');
		divGames.appendChild(game);
	}
}
createGamesCard();

// Função que calcula dias,horas,minutos,segundos para os jogos.
function countDownClock(gameDate) {
	let countDownDate = new Date(gameDate).getTime()
	let dateTimeNow = new Date().getTime();
	let dateDiff = (countDownDate - dateTimeNow);
	let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
	let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
	if (days > 0) {
		return `Faltam ${days} dias ${hours}hrs ${minutes}mins ${seconds}segs`;
	} else if (days === 0 && hours > 0) {
		return `Faltam ${hours}hrs ${minutes}mins ${seconds}segs`
	} else if (days === 0 && hours === 0) {
		return `Faltam ${minutes}mins ${seconds}segs`
	}
};

// Coloca as infos nos cartões dos jogos
function populateGameCard() {
	let allGamesCards = document.querySelectorAll('.gameCard');
	for (let index = 0; index < myJSON.length; index += 1) {
		let gameName = document.createElement('p');
		let gameDate = document.createElement('p');
		let gameCountDown = document.createElement('p');
		gameName.innerText = myJSON[index].name;
		gameDate.innerText = 'Agendado Para: ' + myJSON[index].begin_at.slice(0,10) + ' às ' + myJSON[index].begin_at.slice(11,16);
		gameCountDown.innerText = countDownClock(myJSON[index].begin_at);
		gameCountDown.setAttribute('id', 'countdown');
		allGamesCards[index].appendChild(gameName);
		allGamesCards[index].appendChild(gameCountDown);
	  allGamesCards[index].appendChild(gameDate);
	}
}

populateGameCard();

// Atualiza o quanto falta para os jogos a cada 1 segundo.
function refreshCountDown() {
	let allGamesCountDown = document.querySelectorAll('#countdown');
	for (let index = 0; index < allGamesCountDown.length; index += 1) {
		allGamesCountDown[index].innerText = countDownClock(myJSON[index].begin_at);
	}
}

setInterval(refreshCountDown, 1000)
