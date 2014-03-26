// Global Variables

var player = {
	bet: 0,
	roll: [],
	rank: 0,
	chips: 100
};

var banker = {
	bet: 0,
	roll: [],
	rank: 0,
	chips: 100
};

var pot = 0;

// Global DOM Elements

var input = document.getElementById("input");
var output = document.getElementById("output");
var el_bet = document.getElementById("place-bet");
var el_roll = document.getElementById("roll-button");
var el_playerChips = document.getElementById("current-player-chips");
var el_pot = document.getElementById("current-pot");
var el_bankerChips = document.getElementById("current-banker-chips");
var el_status = document.getElementById("status");
var el_playerDisplay = document.getElementById("player-result-display");
var el_bankerDisplay = document.getElementById("banker-result-display");
var el_die1 = document.getElementById("die-1");
var el_die2 = document.getElementById("die-2");
var el_die3 = document.getElementById("die-3");

// Global Functions

function bet(){
	player.bet = parseInt(input.value);
	pot += player.bet;
	player.chips -= player.bet;

	input.max = player.chips;
	input.value = 5;
	output.innerHTML = input.value;

	if(player.bet <= banker.chips){
		banker.bet = player.bet;
		pot += banker.bet;
		banker.chips -= player.bet;
	} else {
		banker.bet = banker.chips;
		pot += banker.chips;
		banker.chips = 0;
	}

	el_pot.innerHTML = pot;
	el_playerChips.innerHTML = player.chips;
	el_bankerChips.innerHTML = banker.chips;

	el_status.innerHTML = "The player has bet " + player.bet + " chips.\nThe banker has bet " + banker.bet + " chips.";
}

function roll(){

	var counter = 0;

	var timer = setInterval(function(){

		var randNum1 = Math.floor(Math.random() * 6) + 1;
		var randNum2 = Math.floor(Math.random() * 6) + 1;
		var randNum3 = Math.floor(Math.random() * 6) + 1;

		switch(randNum1){
			case 1:
				el_die1.style.backgroundPosition = "0 0";
				break;
			case 2:
				el_die1.style.backgroundPosition = "-100px 0";
				break;
			case 3:
				el_die1.style.backgroundPosition = "-200px 0";
				break;
			case 4:
				el_die1.style.backgroundPosition = "-300px 0";
				break;
			case 5:
				el_die1.style.backgroundPosition = "-400px 0";
				break;
			case 6:
				el_die1.style.backgroundPosition = "-500px 0";
				break;
		}

		switch(randNum2){
			case 1:
				el_die2.style.backgroundPosition = "0 0";
				break;
			case 2:
				el_die2.style.backgroundPosition = "-100px 0";
				break;
			case 3:
				el_die2.style.backgroundPosition = "-200px 0";
				break;
			case 4:
				el_die2.style.backgroundPosition = "-300px 0";
				break;
			case 5:
				el_die2.style.backgroundPosition = "-400px 0";
				break;
			case 6:
				el_die2.style.backgroundPosition = "-500px 0";
				break;
		}

		switch(randNum3){
			case 1:
				el_die3.style.backgroundPosition = "0 0";
				break;
			case 2:
				el_die3.style.backgroundPosition = "-100px 0";
				break;
			case 3:
				el_die3.style.backgroundPosition = "-200px 0";
				break;
			case 4:
				el_die3.style.backgroundPosition = "-300px 0";
				break;
			case 5:
				el_die3.style.backgroundPosition = "-400px 0";
				break;
			case 6:
				el_die3.style.backgroundPosition = "-500px 0";
				break;
		}

		counter++;

		if(counter === 12){
			clearInterval(timer);
			player.roll = [randNum1, randNum2, randNum3];
			banker.roll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
			el_status.innerHTML = "The player rolled: " + player.roll[0] + "-" + player.roll[1] + "-" + player.roll[2] + 
								  "\nThe banker rolled: " + banker.roll[0] + "-" + banker.roll[1] + "-" + banker.roll[2];
			compare(rank(player, player.roll.sort()), rank(banker, banker.roll.sort());
		}

	}, 150);
}

function rank(playerOrBanker, roll){
	if(roll[0] === 4 && roll[1] === 5 && roll[2] === 6){
		playerOrBanker.rank = 14;
	}
	return playerOrBanker.rank;
}

function compare(playerRank, bankerRank){

}

function payout(){

}

// Event Listeners

el_bet.addEventListener("click", bet, false);
el_roll.addEventListener("click", roll, false);

// Initialize

alert(rank(player, [4, 5, 6]));
