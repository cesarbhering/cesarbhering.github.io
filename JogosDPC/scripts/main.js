const myJSON = JSON.parse(upcoming);
const divGames =  document.getElementById('listAllGames');


//FALTA VER COMO ATUALIZAR O JSON SERVER SIDE - BUSCAR MAIS INFOS.
//DEPOIS DE TERMINAR O DA SG TENTAR FAZER O DO RDO DEPOIS DUNHA1-DEPOIS NOPING - DEPOIS CREWMATES - DEPOIS BINOMISTAS
// Adicionar as transmissoes (em PT BR CLARO)

// Cria os cartões dos jogos
function createGamesCard() {
	for (let games in myJSON) {
		let game = document.createElement('div');
		game.setAttribute('class', 'gameCard');
		game.classList += ' container-fluid'
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
		let gameDate = document.createElement('span');
		let gameCountDown = document.createElement('p');
		let dateBrasilia = Date.parse(myJSON[index].begin_at);
		let serieName = document.createElement('span');
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
	for (let index = 0; index < myJSON.length; index += 1) {
		if (myJSON[index].opponents[0].opponent.id === 126294 && myJSON[index].opponents[1].opponent.id === 1735) {
			allGamesCards[index].classList += ' classicoBR';
	  } else if (myJSON[index].opponents[0].opponent.id === 1735 || myJSON[index].opponents[1].opponent.id === 1735) {
			allGamesCards[index].classList += ' sg'; //SG
		} else if (myJSON[index].opponents[0].opponent.id === 126294 || myJSON[index].opponents[1].opponent.id === 126294) {
		allGamesCards[index].classList += ' noping bg-success text-dark';
		} else if (myJSON[index].opponents[0].opponent.id === 127941 || myJSON[index].opponents[1].opponent.id === 127941) {
			allGamesCards[index].classList += ' crewmates bg-secondary text-white';
		}
	}
}

addTeamClass();
