$('#board').ready(function(){
	createBoard();
	const pos = orderPositions(); 
	const properties = getProperties(pos);//[{position, name, owned status}]
	styleBoard(pos);	
	//Players
	const players = setPlayers();
	//place player tokens on the go space
	for(i in players)
		$(pos[0]).append(players[i].Token);	
	$("#center").append('<div id="centerDecor"></div>');
	//create a stats field for each player
	setField(players);
	//Property sets
	const sets = getSets(pos);	
	//Chance and Community Chest Cards
	dealCards();
	$('#centerDecor').append(getHandlers(players));
	//dice for rolls
	$('#centerDecor').append(getDice());
	//label spaces to decorate with CSS
	labelSpaces(pos);
	//button to change handlers
	$('#centerDecor').append('<button id="changeHandler">Toggle Handlers</button>');
	//create a property handler
	$('#center').append('<div id="propHandler" class="hide"></div>');
	$('#centerDecor').append('<button id="toggleInfo">Toggle Info</button>');
	
	
	$('#toggleInfo').on('click', function(){//show information for all properties
		event.preventDefault();
		/*
		Create a save system using screenshots
		1) Display enough information to continue previous gameplay
			-property status, property owner
		*/
		const propertyList = $('.space > p');
		
		for(let i = 0; i < propertyList.length; i++){
			$(propertyList[i]).toggleClass('hide');
			$(propertyList[i]).siblings('.token').toggleClass('hide');
			$(propertyList[i]).siblings('.owner').toggleClass('hide');
			$(propertyList[i]).siblings('.status').toggleClass('hide');
		
		}
	});
	
	$('.space > p').on('dblclick', function(){//enter propHandler
		event.preventDefault();
		/*
		1) Display selected property's information
			-Name
			-Current owner
			-Price information (buy price, mortgage, rent)
			-house count / status
		*/
		//only trigger event while not in the handler
		if($('#propHandler').hasClass('hide')){//
			$('#centerDecor').toggleClass('hide');
			$('#propHandler').toggleClass('hide');
			const propertyList = $('.space > p');
			//reorder list by position
			const pos = $(propertyList).prev();
			const properties = getProperties2(propertyList, pos);
			let index = 28;
			//find out which property was selected
			for(let i = 0; i < 28; i++){
				if($(this).text() == $(properties[i]).text())
					index = i;
			}
			//insert property card
			let card = '<img src="properties/' + index + '.jpg" />';
			$('#propHandler').append(card);
			$('#propHandler').append('<p>Owner: <label id="owner"></label></p>');
			$('#propHandler').append('<p>Status: <label id="status"></label></p>');
			$('#owner').append($(this).siblings('.owner'));
			$('#status').append($(this).siblings('.status'));
			$('#owner > img').toggleClass('hide');
			$('#status > img').toggleClass('hide');
			//record index
			$('#propHandler').append('<label class="hide" id="index">' + index + '</label>');
			/*
			2) Allow user to edit property
				-Change owner
				-Add / remove houses
				mortgage / unmortgage
			*/
			$('#propHandler').append('<button id="propManager">Property Manager</button>');	
			// 3) Allow users to exit and save the changes
			$('#propHandler').append('<button id="return">Return</button>');
			
			$('#return').on('click', function(){//exit propHandler
				event.preventDefault();
				//collect info needed to save changes
				const propertyList = $('.space > p');
				//reorder list by position
				const pos = $(propertyList).prev();
				const properties = getProperties2(propertyList, pos);
				const owner = $('#owner > img');
				const stat = $('#status > img');
				const index = parseInt($('#index').text());
				const target = properties[index];
				//save the changes
				$(owner).toggleClass('hide');
				stat.toggleClass('hide');
				$(target).after(owner);
				$(target).after(stat);	
				//clear the property handler
				$('#propHandler').empty();
				//exit property handler
				$('#centerDecor').toggleClass('hide');
				$('#propHandler').toggleClass('hide');			
			});
			
			$('#propManager').on('click', function(){//make changes to property
			event.preventDefault();
			let messsage, input;
			const names = $('.names');
			const tokens = $('.token');
			while(1){
				message = 'Welcome to the property manager.\n\n';
				message += '1) Change owner';
				message += '\n2) Manage Assets';
				message += '\n3) Exit Property Manager';
				input = parseInt(prompt(message + '\n\nPlease enter a number: '));
				//exit subprogram
				if(input == 3)
					break;
				switch(input){
					case 1: //Owner
						message = '1) Banker';
						for(let i = 0; i < names.length; i++)
							message += '\n' + (i+2) + ') ' + $(names[i]).text();
						message += '\n\nPlease enter a number: '
						while(1){//validate user entry
							input = parseInt(prompt(message));
							if(input > 0 && input < names.length + 2)
								break;
						}
						if(input == 1){//Banker is chosen
							$('#owner').empty();
							$('#status').empty();
						}
						else{ //a player is chosen
							$('#owner').empty();
							$('#owner').append($(tokens[input - 2]).clone());
							$('#owner > img').addClass('owner');
							$('#owner > img').removeClass('token');
						}
						break;						
					
					case 2: //Assets
						if($('#owner').children().length == 0)//banker is owner
							alert('Property is currently owned by Banker.');
						else{//player is owner
							do{
								input = parseInt(prompt('Enter number of houses (-1 for mortgage, 5 for hotel): '));						
							} while(input < -1 || input > 5);
							//Change property Status
							$('#status').empty();
							$('#status').append('<img src="status/' + input + '.png" />');
							$('#status > img').addClass('status');
						}
						break;
						
				}
			
			}
		});		
		}
	});
	//toggle between handlers and dice
	$('#changeHandler').on('click', function(){//move token when submitted
		event.preventDefault();
		$('#handlers').toggleClass('hide');
		$('#diceArea').toggleClass('hide');			
	});
	$('#tokenHandler').on('submit', function(){
		event.preventDefault();
		const player = $('#player').val();
		const ref = $('#ref').val();
		const entry = $('#entryField').val().toLowerCase();
		const players = getPlayers();		
		const spaces = getProperties2($('.space'), $('.pos'));
		//refer to all with class of 'token'
		const tokens = $('.space > .token');
		let targetPlayer, playerNum;
		for(i in players){
			if(players[i].Name == player){
				targetPlayer = players[i];
				playerNum = i;
			}
		}
		if(ref == 'Space Name'){		
			let spaceNames = [];
			for(let i = 0; i < spaces.length; i++){
				spaceNames.push($(spaces[i]).children('p').text().toLowerCase());					
			}
			//search for a match
			let matchFound = 0;
			let newLocation;
			for(i in spaceNames){//find first match
				if(spaceNames[i] == entry && !matchFound){
					matchFound++;
					newLocation = i;
				}
			}
			if(!matchFound)
				alert('Please copy and paste the property name to the field.');
			else{
			for(let i = 0; i < tokens.length; i++){
				if($(tokens[i]).hasClass(targetPlayer.TokenName)){
					if($(tokens[i]).parent().hasClass('space'))
						$(tokens[i]).remove();
				}
			}
			//add token to new location
			$(spaces[newLocation]).append(targetPlayer.Token.clone());
			//update player's location
			$($('.locations')[playerNum]).text(newLocation);
			}					
		}
			
		else{//number of spaces 
			const amount = parseInt(entry);
			if(isNaN(amount) || amount < -3 || amount > 15 || amount == 0)
				alert('Enter a number between -3 or 15.');
			else{
				//remove token from previous location
				//refer to all with class of 'token'
				const tokens = $('.token');
				//delete the second match (not the first)
				for(let i = 0; i < tokens.length; i++){
					if($(tokens[i]).hasClass(targetPlayer.TokenName)){
						if($(tokens[i]).parent().hasClass('space'))
							$(tokens[i]).remove();
					}
				}
				//add token to new location
				let newLocation = parseInt(targetPlayer.Location) + amount;
				if(newLocation > 39)
					newLocation -= 40;
				$(spaces[newLocation]).append(targetPlayer.Token.clone());
				//update player's location
				$($('.locations')[playerNum]).text(newLocation);				
			}			
		}
	});
	//hide / show speed die when button is clicked
	$('#speedDie').on('click', function(){
		event.preventDefault();
		let dice = $('#speed');
		$(dice).toggleClass('hide');
	});	
	//roll dice when button is clicked
	$('#roll').on('click', function(){
		event.preventDefault();
		const results = [];
		const speedDie = $('#speed');
		for(let i = 0; i < 2; i++)
			results[i] = (Math.floor(Math.random() * 6) + 1);
		if(!$(speedDie).hasClass('hide'))
			results[2] = (Math.floor(Math.random() * 6) + 1);
		const dice = $('.dice');
		const diceArea = $('#diceArea');
		dice.remove();
		if(!$(speedDie).hasClass('hide'))
			speedDie.remove();
		for(let i = 0; i < 2; i++)
			diceArea.append('<img class="dice" src="dice/' + results[i] + '.png"/>	');
		if(results[2] != null)
			diceArea.append('<img id="speed"  src="dice/speed' + results[2] + '.png"/>	');
	});
	//Perform transaction when moneyHandler is submitted
	$('#moneyHandler').on('submit', function(){
		event.preventDefault();
		const from = $('#from').val();
		const to = $('#to').val();
		const amount = parseInt($('#amount').val());
		const names = $('.names');
		const money = $('.money');
		let receiver = names.length;
		let giver = names.length;
		
		for(let i = 0; i < names.length; i++){
			if(from == $(names[i]).text())
				giver = i;
			if(to == $(names[i]).text())
				receiver = i;
		}
		if(giver != names.length){
			let giverAmount = parseInt($(money[giver]).text());
			giverAmount -= amount;
			$(money[giver]).text(giverAmount);
		}
		if(receiver != names.length){
			let receiverAmount = parseInt($(money[receiver]).text());
			receiverAmount += amount;
			$(money[receiver]).text(receiverAmount);
		}
	});
	$("#chance").on("click", function(){//When clicking chance
		event.preventDefault();
		//retrieve cards from secret list
		const list = $(".chance");
		//draw top card
		alert($(list[0]).text());
		//remove top card
		$(list[0]).remove();
		//reset deck if no cards are left
		if(list.length <= 1){
			let chance = setChance();
			chance = shuffleCards(chance);
			storeCards(chance, "chance");
			$(".chance").addClass("hide");
		}
	});
	$("#communityChest").on("click", function(){//When clicking Community chest
		event.preventDefault();
		//retrieve cards from secret list
		const list = $(".communityChest");
		//draw top card
		alert($(list[0]).text());
		//remove top card
		$(list[0]).remove();
		//reset deck if no cards are left
		if(list.length <= 1){
			let communityChest = setChest();
			chance = shuffleCards(communityChest);
			storeCards(communityChest, "communityChest");
			$(".communityChest").addClass("hide");
		}
	});	
});

function labelSpaces(pos){//label and style non-property spaces
	$(pos[2]).addClass('chestSpace');
	$(pos[17]).addClass('chestSpace');
	$(pos[33]).addClass('chestSpace');
	$(pos[7]).addClass('chanceSpace');
	$(pos[22]).addClass('chanceSpace');
	$(pos[36]).addClass('chanceSpace');
	$(pos[0]).prop('id', 'goSpace');
	$(pos[4]).prop('id', 'incomeTax');
	$(pos[38]).prop('id', 'luxTax');
	$(pos[10]).prop('id', 'jailSpace');
	$(pos[20]).prop('id', 'freePark');
	$(pos[30]).prop('id', 'goJail');
	$($('.chanceSpace > p')).remove();
	$($('.chestSpace > p')).remove();
	$($('#goSpace > p')).remove();
	$($('#jailSpace > p')).remove();
	$($('#freePark > p')).remove();
	$($('#goJail > p')).remove();
	$($('#incomeTax > p')).remove();
	$($('#luxTax > p')).remove();
}
function getHandlers(players){//Money handler and Token handler
	let handlerArea = '<table id="handlers" class="hide"><tr>';
	handlerArea += '<td>' + getHandler(players) + '<td>';
	handlerArea += '<td>' + getHandler2(players) + '<td>';
	handlerArea += '</tr></table>';
	return handlerArea;
}
function getPlayers(){//collect player information from stats field
	const players = [];
	const names = $('.names');
	const tokens = $('.tokens > .token');
	const tokenNames = $('.tokenNames');
	const locations = $('.locations');
	const money = $('.money');

	for(let i = 0; i < names.length; i++){
		players.push({
			'Name': $(names[i]).text(),
			'Token': $(tokens[i]),
			'TokenName': $(tokenNames[i]).text(),
			'Location': $(locations[i]).text()				
		});
	}
	return players;	
}
function getProperties2(spaces, position){//collect property information for specific functions
	let properties = [];
	for(let i = 0; i < spaces.length; i++){
		properties.push({
			'Position': parseInt($(position[i]).text()),
			'Space': spaces[i]				
		});			
	}
	properties.sort((a, b) => {
		return a.Position - b.Position
	});
	let zones = [];
	for(i = 0; i < spaces.length; i++)
		zones.push(properties[i].Space);
	return zones;			
}
function getHandler2(players){//Token Handler
	let tokenHandler = '<form id="tokenHandler" >';
	tokenHandler += '<fieldset><h3>Token Handler</h3>';
	tokenHandler += '<label>Player: <select id="player">';
	for(i in players)
		tokenHandler += '<option>' + players[i].Name + '</option>';
	tokenHandler += '</select> Reference: <select id="ref">';
	tokenHandler += '<option>Space Name</option>';
	tokenHandler += '<option>Number of Spaces</option>';
	tokenHandler += '</select></label>';
	tokenHandler += '<p><input id="entryField" type="text" /></p>'
	tokenHandler += '<p><input type="reset" /><input type="submit" /></p></fieldset></form>';
	return tokenHandler;
}
function getDice(){//area for rolling dice
	let diceArea = '<fieldset id="diceArea">';
	for(let i = 0; i < 2; i++)
		diceArea += '<img class="dice" src="dice/0.png" />	'
	diceArea += '<img id="speed" class="hide" src="dice/speed.png" />'
	diceArea += '</fieldset><button id="roll">Roll Dice</button>';
	diceArea += '<button id="speedDie">Speed Die</button>';

	return diceArea;
}
function getProperties(pos){//collect property information
	const properties = []; //[{position, name, owned status}, ...]
	const propertyNames = getSpaces();
	for(let i = 0; i < pos.length; i++){
		properties.push({
			'Position': i,
			'Name': propertyNames[i],
			'Owned' : 0
		});
		$(pos[i]).append('<p>' + properties[i].Name + '</p>');
	}	
	return properties;
}
function dealCards(){//Set up community chest and chance
	let chance = setChance();
	let communityChest = setChest();
	addCards();
	chance = shuffleCards(chance);
	communityChest = shuffleCards(communityChest);
	//secretly store cards in HTML
	storeCards(chance, "chance");
	storeCards(communityChest, "communityChest");
	$(".chance").addClass("hide");
	$(".communityChest").addClass("hide");
}
function getHandler(players){//Money Handler
	let moneyHandler = '<form id="moneyHandler">';
	moneyHandler += '<fieldset><h3>Money Handler</h3>';
	moneyHandler += 'From: <select id="from">';
	moneyHandler += '<option value="Bank">Bank</option>';
	for(i in players)
		moneyHandler += '<option>' + players[i].Name + '</option>';
	moneyHandler += '</select>	<input id="amount" type="number" min="0" />'
	moneyHandler += ' To: <select id="to">';
	moneyHandler += '<option>Bank</option>';
	for(i in players)
		moneyHandler += '<option>' + players[i].Name + '</option>';
	moneyHandler += '</select>'
	moneyHandler += '<p><input type="submit" /></p></fieldset></form>';
	return moneyHandler;
}
function getSets(pos){//identify Monopoly sets
	//style the property sets
	const brownSet = [1, 3];
	const lightBlueSet = [6, 8, 9];
	const purpleSet = [11, 13, 14];
	const orangeSet = [16, 18, 19];
	const redSet = [21, 23, 24];
	const yellowSet = [26, 27, 29];
	const greenSet = [31, 32, 34];
	const darkBlueSet = [37, 39];
	const companySet = [12, 28];
	const railroadSet = [5, 15, 25, 35];
	const sets = {
	'tan' : brownSet,
	'lightblue' : lightBlueSet,
	'purple' : purpleSet,
	'orange' : orangeSet,
	'red' : redSet,
	'yellow' : yellowSet,
	'green' : greenSet,
	'darkblue' : darkBlueSet,
	'gray' : companySet,
	'black' : railroadSet
	};
	
	for(i in sets)
		colorSet(pos, sets[i], i);
	return sets;
}
function styleBoard(pos){//make the board game presentable
	//style the board
	$($(".pos")).addClass('hide');
	$("#map").css("text-align", "center");
	$("#center").empty();
}
function setField(players){//area of information for players
	let field = '<table id="field" border="1px solid black"><tr>';
	let count = 1;
	for(i in players){
		if(count == 5)
			field += '<tr>'
		field += '<td>';
		field += '<p class="tokens">' + players[i].Token + '</p>';
		field += '<p class="hide tokenNames">' + players[i].TokenName + '</p>';
		field += '<p class="names">' + players[i].Name + '</p>';
		field += '<p class="hide locations">' + players[i].Location + '</p>';
		field += '<p>$<label class="money">' + players[i].Money + '</label></p>';
		field += '</td>';
		count++;
	}
	if(count >= 5)
		field += '</tr>';
	field += '</tr></table>'
	$('#centerDecor').prepend(field);
}
function setPlayers(){//get player information from user
	let playerCount = 0;
	while(playerCount < 2 || playerCount > 4 || Number.isNaN(playerCount)){
		playerCount = parseInt(prompt("Enter the number of players."));
	}
	
	const players = [];
	let tokens = ['dog', 'hat', 'shoe', 'ship'];
	let reply;
	for(let i = 0; i < playerCount; i++){
		players.push({	
			'Name' : prompt('Enter name for player ' + (i + 1)),
			'Money' : 1500,
			'Location' : 0,
			'Owned' : [],
			});
		//Player token
		let message = tokens.join(', ');
		message += '\n\n' + players[i].Name + ', please select a token.';
		let matchFound = 0;
		while(!matchFound){
			reply = prompt(message).toLowerCase();
			for(x in tokens){
				if(tokens[x] == reply){
					matchFound = 1;
					tokens[x] = tokens[tokens.length - 1];
					tokens.pop();					
				}
			}
		}
		players[i].Token = '<img class="' + reply + ' token" src="tokens/' + reply + '.png" />';
		players[i].TokenName = reply;
	}
	return players;
}
function storeCards(cards, type){
	let list = '<ol>';
	for(let i = 0; i < cards.length; i++)
		list += '<li class="' + type + '">' + cards[i] + '</li>';
	list += '</ol>';
	$("body").append(list);	
}
function shuffleCards(cards){//shuffle deck
	let target = cards.length;
	let temp = "";
	for(let i = 0; i < cards.length; i++){ 
		target = Math.floor(Math.random() * cards.length);
		temp = cards[i];
		cards[i] = cards[target];
		cards[target] = temp;
	}
	return cards;	
}
function addCards(){//place community chest and chance decks
	let list = '<table><tr><td><button id="communityChest"></button></td>';
	list += '<td><h1>MONOPOLY</h1></td>';
	list += '<td><button id="chance"></button></td></tr></table>';
	$("#centerDecor").append(list);
}
function setChest(){//community chest cards
	return [
		"Advance to Go (Collect $200)",
		"Bank error in your favor. Collect $200",
		"Doctor’s fee. Pay $50",
		"From sale of stock you get $50",
		"Get Out of Jail Free",
		"Go to Jail. Go directly to jail, do not pass Go, do not collect $200",
		"Holiday fund matures. Receive $100",
		"Income tax refund. Collect $20",
		"It is your birthday. Collect $10 from every player",
		"Life insurance matures. Collect $100",
		"Pay hospital fees of $100",
		"Pay school fees of $50",
		"Receive $25 consultancy fee",
		"You are assessed for street repair. $40 per house. $115 per hotel",
		"You have won second prize in a beauty contest. Collect $10",
		"You inherit $100"	
	];
}
function setChance(){
	return [//chance cards
		"Advance to Boardwalk",
		"Advance to Go (Collect $200)",
		"Advance to Illinois Avenue. If you pass Go, collect $200",
		"Advance to St. Charles Place. If you pass Go, collect $200",
		"Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
		"Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
		"Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.",
		"Bank pays you dividend of $50",
		"Get Out of Jail Free",
		"Go Back 3 Spaces",
		"Go to Jail. Go directly to Jail, do not pass Go, do not collect $200",
		"Make general repairs on all your property. For each house pay $25. For each hotel pay $100",
		"Speeding fine $15",
		"Take a trip to Reading Railroad. If you pass Go, collect $200",
		"You have been elected Chairman of the Board. Pay each player $50",
		"Your building loan matures. Collect $150"	
	];
}
function colorSet(pos, set, color){//coloring for spaces
	for(let i = 0; i < set.length; i++){
		$(pos[set[i]]).css("backgroundColor", color);
		if(color == "black" || color == "purple" || color == "darkblue" || color == "red")
			$(pos[set[i]]).css("color", "white");
	}
}
function getSpaces(){//space names
	return [
		"Go",
		"Mediterranian Ave",
		"Community Chest",
		"Baltic Ave",
		"Income Tax",
		"Reading Railroad",
		"Oriental Ave",
		"Chance",
		"Vermont Ave",
		"Conneticut Ave",
		"In Jail / Just Visiting",
		"St. Charles Place",
		"Electric Company",
		"States Ave",
		"Virginia Ave",
		"Pennsylvannia Railroad",
		"St. James Place",
		"Community Chest",
		"Tennessee Ave",
		"New York Ave",
		"Free Parking",
		"Kentucky Ave",
		"Chance",
		"Indiana Ave",
		"Illinoise Ave",
		"B & O Railroad",
		"Atlantic Ave",
		"Ventor Ave",
		"Water Works",
		"Marvin Gardins",
		"Go To Jail",
		"Pacific Ave",
		"North Carolina Ave",
		"Community Chest",
		"Pennsylvannia Ave",
		"Short Line",
		"Chance",
		"Park Place",
		"Luxury Tax",
		"Boardwalk"	
	];
}
function orderPositions(){
	//reorder positions
	const pos = $(".pos");
	const space = $(".space");
	const len = pos.length;
	let count = 0;
	const spots = [];
	for(let i = len - 1; i > len - 12; i--){
		$(pos[i]).text(count);
		spots[count] = space[i];
		count++;
	}
	let target = 0;
	for(let i = len - 12; i > 10; i--){
		target = parseInt($(pos[i]).text());
		if(target % 2 != 0 || target == 12){
			$(pos[i]).text(count);
			spots[count] = space[i];
			count++;			
		}
		else
			$(pos[i]).text(-1);
	}
	
	for(let i = 0; i < 11; i++){
		$(pos[i]).text(count);
		spots[count] = space[i];
		count++;
	}
	
	for(let i = 11; i <= len - 12; i++){
		target = parseInt($(pos[i]).text()); 
		if(target == -1){
			$(pos[i]).text(count);
			spots[count] = space[i];
			count++;
		}
	}
	return spots;
}
function createBoard(){
	//create the board
	let board = '<table id="map" border="1px black">';
	let count = 1;
	for(let i = 0; i < 11; i++){
		board += '<tr>'
		for(let j = 0; j < 11; j++){
			if(count == 13){
				board += '<td id="center" rowspan="9" colspan="9">' + count + '</td>';
				j += 8;
			}
			
			else{
				if(count >= 15 && count % 2 != 0 && count < 31)
					j += 9;
				board += '<td class="space"><label class="pos">' + count + '</label></td>';
			}
			count++;
		}
		board += '</tr>';
	}
	board += '</table>';	
	
	$("#board").append(board);
};