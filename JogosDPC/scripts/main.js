const myJSON = JSON.parse(upcoming);
const divGames =  document.getElementById('listAllGames');


//FALTA VER COMO ATUALIZAR O JSON SERVER SIDE - BUSCAR MAIS INFOS.
//INSERIR GORLIZ PRIDE
// Adicionar as transmissoes (em PT BR CLARO)
// VERIFICAR COMO FAZER QUANDO FOR CONFRONTO ENTRE BRS

// Cria os cartões dos jogos
function createGamesCard() {
	for (let games in myJSON) {
		let game = document.createElement('div');
		game.setAttribute('class', 'gameCard');
		let gameInfo = document.createElement('div');
		gameInfo.setAttribute('class', 'gameInfo');
		let logoSpace = document.createElement('div');
		logoSpace.setAttribute('class', 'logoSpace');
		divGames.appendChild(game);
		game.appendChild(gameInfo);
		game.appendChild(logoSpace);
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
	let allGamesCards = document.querySelectorAll('.gameInfo');
	for (let index = 0; index < myJSON.length; index += 1) {
		let gameName = document.createElement('p');
		let gameDate = document.createElement('p');
		let gameCountDown = document.createElement('p');
		let dateBrasilia = Date.parse(myJSON[index].begin_at);
		let serieName = document.createElement('p');
		dateBrasilia = new Date(dateBrasilia);
		gameName.innerText = myJSON[index].name;
		gameDate.innerText = 'Agendado Para: ' + dateBrasilia.getDate() + '/' + (dateBrasilia.getMonth() + 1) + '/' + dateBrasilia.getFullYear() + ' - '  + (dateBrasilia.toString().slice(16,21));
		gameCountDown.innerText = countDownClock(myJSON[index].begin_at);
		gameCountDown.setAttribute('id', 'countdown');
		serieName.innerText = myJSON[index].serie.name;
		allGamesCards[index].appendChild(gameName);
		allGamesCards[index].appendChild(serieName);
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

setInterval(refreshCountDown, 1000);

// Atribui classe a tag referente ao time que vai jogar.
function addTeamClass() {
	let allGamesCards = document.querySelectorAll('.gameCard');
	let logoSpaces = document.querySelectorAll('.logoSpace');
	for (let index = 0; index < myJSON.length; index += 1) {
		if (myJSON[index].opponents[0].opponent.id === 126294 && myJSON[index].opponents[1].opponent.id === 1735) {
			allGamesCards[index].classList += ' classicoBR';
	  } else if (myJSON[index].opponents[0].opponent.id === 1735 || myJSON[index].opponents[1].opponent.id === 1735) {
			allGamesCards[index].classList += ' bg-info text-white shadow-sm'; //SG
			logoSpaces[index].classList += ' sg'
		} else if (myJSON[index].opponents[0].opponent.id === 126294 || myJSON[index].opponents[1].opponent.id === 126294) {
		allGamesCards[index].classList += ' bg-success text0-dark shadow-sm'; //NoPing
		logoSpaces[index].classList += ' noping'
		} else if (myJSON[index].opponents[0].opponent.id === 127941 || myJSON[index].opponents[1].opponent.id === 127941) {
			allGamesCards[index].classList += ' bg-secondary text-white shadow-sm'; //crewmates
			logoSpaces[index].classList += ' crewmates'
		} else if (myJSON[index].opponents[0].opponent.id === 1948 || myJSON[index].opponents[1].opponent.id === 1948) {
			allGamesCards[index].classList += ' bg-primary text-white shadow-sm'; //LVLup
			logoSpaces[index].classList += ' lvlup'
		} else if (myJSON[index].opponents[0].opponent.id === 128774 || myJSON[index].opponents[1].opponent.id === 128774) {
			allGamesCards[index].classList += ' bg-warning text-dark shadow-sm'; //LVLup
			logoSpaces[index].classList += ' incubus'
		} else if (myJSON[index].opponents[0].opponent.id === 128849 || myJSON[index].opponents[1].opponent.id === 128849) {
			allGamesCards[index].classList += ' bg-white text-dark shadow-sm'; //binomistas
			logoSpaces[index].classList += '  binomistas'
	}
}
}


addTeamClass();
