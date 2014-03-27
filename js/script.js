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
var gameEnd = false;

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

	el_bet.disabled = true;
	el_bet.style.backgroundColor = "rgba(255, 100, 100, 0.5)";
	el_roll.disabled = false;
	el_roll.style.backgroundColor = "rgba(100, 255, 100, 0.5)";
	update();
	el_status.innerHTML = "The player has bet " + player.bet + " chips.\nThe banker has bet " + banker.bet + " chips.";
}

function update(){
	el_pot.innerHTML = pot;
	el_playerChips.innerHTML = player.chips;
	el_bankerChips.innerHTML = banker.chips;
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
			bankerRoll();
			player.rank = rank(player.roll.sort());
			banker.rank = rank(banker.roll.sort());

			if(player.rank === 0){
				el_status.innerHTML = "Your roll is invalid. Please roll again.";
			} else {
				el_roll.disabled = true;
				el_status.innerHTML = "The player rolled: " + player.roll[0] + "-" + player.roll[1] + "-" + player.roll[2] + 
									"\nThe banker rolled: " + banker.roll[0] + "-" + banker.roll[1] + "-" + banker.roll[2];

				
			}
		}

	}, 150);
}

function bankerRoll(){
	banker.roll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
	while(rank(banker.roll) === 0){
		banker.roll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
	}
}

function rank(roll){
	var rank = 0;
	if(roll[0] === 4 && roll[1] === 5 && roll[2] === 6){
		rank = 14;
	} else if (roll[0] === roll[2]){
		rank = roll[0] + 7;
	} else if (roll[0] === roll[1] && roll[1] !== roll[2]){
		rank = roll[2] + 1;
	} else if (roll[0] !== roll[1] && roll[1] === roll[2]){
		rank = roll[0] + 1;
	} else if (roll[0] === 1 && roll[1] === 2 && roll[2] === 3){
		rank = 1;
	} else {
		rank = 0;
	}
	return rank;
}

function compare(playerRank, bankerRank){
	// 1 = win, 2 = tie, 3 = lose

	var roundResult = 0;

	if(player.rank === 14){
		roundResult = 1;
	} else if (player.rank === banker.rank){
		roundResult = 2;
	} else if (player.rank > banker.rank){
		roundResult = 1;
	} else {
		roundResult = 3;
	}
	return roundResult;
}

function payout(roundResult){
	if(roundResult === 1){
		player.chips += pot;
	} else if (roundResult === 2){
		player.chips += pot / 2;
		banker.chips += pot / 2;
	} else {
		banker.chips += pot;
	}
	update();
}

function reset(){
	el_bet.disabled = false;
	el_bet.style.backgroundColor = "rgba(100, 255, 100, 0.5)";

	el_roll.disabled = true;
}

// Event Listeners

el_bet.addEventListener("click", bet, false);
el_roll.addEventListener("click", roll, false);

// Initialize







