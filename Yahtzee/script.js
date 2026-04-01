$(function(){
	
	//Upon startup
	p1 = prompt("Enter name for player 1.");
	p2 = prompt("Enter name for player 2.");
	$(".name").text(p1);
	$(".name2").text(p2);
	$("#turnPlayer").text(p1);
	
	//Game
	$("#game").on("submit", function(){
		//get the grand totals
		let p1 = parseInt($("#grand").text());
		let p2 = parseInt($("#grand2").text());
		//compare the numbers
		if(p1 > p2)
			alert($($(".name")[0]).text() + " wins!");
		else if(p1 < p2)
			alert($($(".name2")[0]).text() + " wins!");
		else
			alert("It's a draw!");	
	});
	
	$(".p2").prop("disabled", true);	
	//Players
	$(".p1").on("click", function(){
		event.preventDefault();
		if($("#roll").hasClass("hide")){
			$(".p1").prop("disabled", true);
			$(".p2").prop("disabled", false);
		}
		$("#turnPlayer").text("p2");
	});
	
	$(".p2").on("click", function(){
		event.preventDefault();
		if($("#roll").hasClass("hide")){
			$(".p2").prop("disabled", true);
			$(".p1").prop("disabled", false);	
		}
		$("#turnPlayer").text("p1");
	});
	
	
	//Player 1
	//Lowers
	$("#3kind").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 3 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 2){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 2){
				for(let i = 0; i < 5; i++)
					total += list[i];				
			}
			$(this).after('<label id="3kind">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});
	
	$("#4kind").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 4 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 3){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 3){
				for(let i = 0; i < 5; i++)
					total += list[i];				
			}
			$(this).after('<label id="4kind">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});
	
	$("#fullHouse").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for full house - 1 1 1 2 2
			let matchesFound = 0;
			let threeKind = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 2){
					if(list[i] == list[i - 1]){
						matchesFound++;
						if(matchesFound == 2)
							threeKind = list[i];
					}
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 2){
				for(let i = 1; i < 5; i++){
					if(list[i] == list[i - 1] && list[i] != threeKind)
						total = 25;
				}					
			}
			$(this).after('<label id="fullHouse">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});
	
	$("#sStraight").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for small straight 1234, 2345, or 3456
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 3){
					if(list[i] == list[i - 1] + 1)
						matchesFound++;
					else{
						if(list[i] != list[i - 1])
							matchesFound = 0;
						
					}
				}				
			}
			let total = 0;
			if(matchesFound >= 3)
				total = 30;		
			$(this).after('<label id="sStraight">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});

	$("#lStraight").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for large straight 12345 or 23456
			let matchesFound = true;
			for(let i = 1; i < 5; i++){			
				if(list[i] != list[i - 1] + 1)
					matchesFound = false;							
			}
			let total = 0;
			if(matchesFound)
				total = 40;		
			$(this).after('<label id="lStraight">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});	
	
	$("#5kind").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 5 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 4){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 4)
				total = 50;
			$(this).after('<label id="5kind">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});	
	
	$("#chance").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);			
			let total = 0;			
			for(let i = 0; i < 5; i++)
				total += list[i];				
			
			$(this).after('<label id="chance">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower").text());
			lower += total;
			let grand = parseInt($("#grand").text());
			grand += total;				
			$("#lower").text(lower);
			$("#grand").text(grand);		
		}
	});
	//Uppers
	$("#ones").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let ones = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 1)
					ones++;
			}
			$(this).after('<label id="ones">' + ones + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += ones;
			let grand = parseInt($("#grand").text());
			grand += ones;		
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	$("#twos").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let twos = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 2)
					twos += 2;
			}
			$(this).after('<label id="twos">' + twos + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += twos;
			let grand = parseInt($("#grand").text());
			grand += twos;
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	$("#threes").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let threes = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 3)
					threes += 3;
			}
			$(this).after('<label id="threes">' + threes + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += threes;
			let grand = parseInt($("#grand").text());
			grand += threes;
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	$("#fours").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let fours = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 4)
					fours += 4;
			}
			$(this).after('<label id="fours">' + fours + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += fours;
			let grand = parseInt($("#grand").text());
			grand += fours;
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	$("#fives").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let fives = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 5)
					fives += 5;
			}
			$(this).after('<label id="fives">' + fives + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += fives;
			let grand = parseInt($("#grand").text());
			grand += fives;
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	$("#sixes").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let sixes = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 6)
					sixes += 6;
			}
			$(this).after('<label id="sixes">' + sixes + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper").text());
			upper += sixes;
			let grand = parseInt($("#grand").text());
			grand += sixes;
			if(upper > 62 && $("#bonus").text() != 35){
				$("#bonus").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper").text(upper);
			$("#grand").text(grand);
		}
	});
	
	//Player 2
	//Lowers
	$("#3kind2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 3 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 2){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 2){
				for(let i = 0; i < 5; i++)
					total += list[i];				
			}
			$(this).after('<label id="3kind">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});
	
	$("#4kind2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 4 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 3){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 3){
				for(let i = 0; i < 5; i++)
					total += list[i];				
			}
			$(this).after('<label id="4kind">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});
	
	$("#fullHouse2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for full house - 1 1 1 2 2
			let matchesFound = 0;
			let threeKind = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 2){
					if(list[i] == list[i - 1]){
						matchesFound++;
						if(matchesFound == 2)
							threeKind = list[i];
					}
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 2){
				for(let i = 1; i < 5; i++){
					if(list[i] == list[i - 1] && list[i] != threeKind)
						total = 25;
				}					
			}
			$(this).after('<label id="fullHouse">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});
	
	$("#sStraight2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for small straight 1234, 2345, or 3456
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 3){
					if(list[i] == list[i - 1] + 1)
						matchesFound++;
					else{
						if(list[i] != list[i - 1])
							matchesFound = 0;
						
					}
				}				
			}
			let total = 0;
			if(matchesFound >= 3)
				total = 30;		
			$(this).after('<label id="sStraight">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);	
		}
	});

	$("#lStraight2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for large straight 12345 or 23456
			let matchesFound = true;
			for(let i = 1; i < 5; i++){			
				if(list[i] != list[i - 1] + 1)
					matchesFound = false;							
			}
			let total = 0;
			if(matchesFound)
				total = 40;		
			$(this).after('<label id="lStraight">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});	
	
	$("#5kind2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);
			list.sort();
			//check for 5 of a kind
			let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 4){
					if(list[i] == list[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}
			let total = 0;
			if(matchesFound >= 4)
				total = 50;		
			$(this).after('<label id="5kind2">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});	
	
	$("#chance2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children().text();
			//put the numbers in order 4 1 6 1 1 -> 1 1 1 4 6
			let list = [0,0,0,0,0];
			for(let i = 0; i < 5; i++)
				list[i] = parseInt(rolls[i]);			
			let total = 0;			
			for(let i = 0; i < 5; i++)
				total += list[i];				
			
			$(this).after('<label id="chance">' + total + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let lower = parseInt($("#lower2").text());
			lower += total;
			let grand = parseInt($("#grand2").text());
			grand += total;				
			$("#lower2").text(lower);
			$("#grand2").text(grand);		
		}
	});
	//Uppers
	$("#ones2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let ones = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 1)
					ones++;
			}
			$(this).after('<label id="ones2">' + ones + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += ones;
			let grand = parseInt($("#grand2").text());
			grand += ones;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#twos2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let twos = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 2)
					twos += 2;
			}
			$(this).after('<label id="twos2">' + twos + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += twos;
			let grand = parseInt($("#grand2").text());
			grand += twos;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#threes2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let threes = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 3)
					threes += 3;
			}
			$(this).after('<label id="threes2">' + threes + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += threes;
			let grand = parseInt($("#grand2").text());
			grand += threes;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#fours2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let fours = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 4)
					fours += 4;
			}
			$(this).after('<label id="fours2">' + fours + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += fours;
			let grand = parseInt($("#grand2").text());
			grand += fours;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#fives2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let fives = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 5)
					fives += 5;
			}
			$(this).after('<label id="fives2">' + fives + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += fives;
			let grand = parseInt($("#grand2").text());
			grand += fives;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#sixes2").on("click", function(){
		event.preventDefault();
		$("input[name=dice]").prop("checked", false);
		if($("#roll").hasClass("hide")){
			if(!$("input[name=reroll]").hasClass("hide"))
				$("input[name=reroll]").addClass("hide");
			$("#roll").removeClass("hide");
			//get the previous dice rolls
			let rolls = $("#results").children();
			let sixes = 0;
			for(let i = 0; i < rolls.length; i++){
				if($(rolls[i]).text() == 6)
					sixes += 6;
			}
			$(this).after('<label id="sixes2">' + sixes + '</label>');
			$(this).remove();
			let results = $(".result");
			for(let i = 0; i < results.length; i++)
				$(results[i]).empty();
			$("#checkboxes").addClass("hide");
			$("#results").empty();
			//update uppers and grand total
			let upper = parseInt($("#upper2").text());
			upper += sixes;
			let grand = parseInt($("#grand2").text());
			grand += sixes;		
			if(upper > 62 && $("#bonus2").text() != 35){
				$("#bonus2").text(35);
				upper += 35;
				grand += 35;		
			}		
			$("#upper2").text(upper);
			$("#grand2").text(grand);
		}
	});
	
	$("#reroll").on("submit", function(){
		event.preventDefault();
		//adjust the turn number
		let turn = parseInt($("#turn").text());
		turn++;
		$("#turn").text(turn);
		if(turn >= 3)
			$("input[name=reroll]").addClass("hide");
		//get the previous dice rolls
		let rolls = $("#results").children();
		//get the checkboxes
		let boxes = $("input[name=dice]");	
		//get the images
		let pictures = $(".diceImage");
		//get the results
		let results = $(".result");
		//only reroll the unchecked dice
		for(let i = 0; i < boxes.length; i++){
			if(!$(boxes[i]).prop("checked")){
				//change number in hidden list
				let newRoll = rollDice(i);
				if(newRoll != rolls[i]){
					$(rolls[i]).text(newRoll);
					//remove current dice image
					$(results[i]).empty();
					//add new dice image
					switch(newRoll){
						case 1:
							$(results[i]).append('<img class="diceImage" src="dice/one.png" width="200"/>');
							break;
						case 2:
							$(results[i]).append('<img class="diceImage" src="dice/two.png" width="200"/>');
							break;
						case 3:
							$(results[i]).append('<img class="diceImage" src="dice/three.png" width="200"/>');
							break;
						case 4:
							$(results[i]).append('<img class="diceImage" src="dice/four.png" width="200"/>');
							break;
						case 5:
							$(results[i]).append('<img class="diceImage" src="dice/five.png" width="200"/>');
							break;
						case 6:
							$(results[i]).append('<img class="diceImage" src="dice/six.png" width="200" />');
					}			
				}
			}						
		}
		//if 5 of a kind happens more than once
		let name = $($(".name")[0]).text();
		let name2 = $($(".name2")[0]).text();
		let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 4){
					if(dice[i] == dice[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}			
			if(matchesFound >= 4){
				//for P1
				if($(".p2").prop("disabled") && $("#5kind").text() != 0){
					$("#5kind").text(parseInt($("#5kind").text()) + 100);
					$("#lower").text(parseInt($("#lower").text()) + 100);
					$("#grand").text(parseInt($("#grand").text()) + 100);
				}
				//for P2
				else if($(".p1").prop("disabled") && $("#5kind2").text() != 0){
					$("#5kind2").text(parseInt($("#5kind2").text()) + 100);
					$("#lower2").text(parseInt($("#lower2").text()) + 100);
					$("#grand2").text(parseInt($("#grand2").text()) + 100);
				}					
			}
	});

	$("#roll").on("click", function(){
		event.preventDefault();
		//adjust the turn number
		$("#turn").text(1);
		//show the checkboxes
		if(!$("#checkboxes").hasClass("hide"));
			$("#checkboxes").removeClass("hide");
		//show the reroll button
		$("input[name=reroll]").removeClass("hide");		
		//roll 5 dice - result of each: 1 - 6
		let dice = [0,0,0,0,0];
		let list = $("#results");
		for(i in dice){
			dice[i] = rollDice(i);	
			$(list).append("<li>" + dice[i] + "</li>");
		}
		let results = $(".result");		
		for(i in dice){
			switch(dice[i]){
				case 1:
					$(results[i]).append('<img class="diceImage" src="dice/one.png" width="200"/>');
					break;
				case 2:
					$(results[i]).append('<img class="diceImage" src="dice/two.png" width="200"/>');
					break;
				case 3:
					$(results[i]).append('<img class="diceImage" src="dice/three.png" width="200"/>');
					break;
				case 4:
					$(results[i]).append('<img class="diceImage" src="dice/four.png" width="200"/>');
					break;
				case 5:
					$(results[i]).append('<img class="diceImage" src="dice/five.png" width="200"/>');
					break;
				case 6:
					$(results[i]).append('<img class="diceImage" src="dice/six.png" width="200" />');
			}	
		}
		//if 5 of a kind happens more than once
		let name = $($(".name")[0]).text();
		let name2 = $($(".name2")[0]).text();
		let matchesFound = 0;
			for(let i = 1; i < 5; i++){
				if(matchesFound < 4){
					if(dice[i] == dice[i - 1])
						matchesFound++;
					else
						matchesFound = 0;
				}				
			}			
			if(matchesFound >= 4){
				//for P1
				if($(".p2").prop("disabled") && $("#5kind").text() != 0){
					$("#5kind").text(parseInt($("#5kind").text()) + 100);
					$("#lower").text(parseInt($("#lower").text()) + 100);
					$("#grand").text(parseInt($("#grand").text()) + 100);
				}
				//for P2
				else if($(".p1").prop("disabled") && $("#5kind2").text() != 0){
					$("#5kind2").text(parseInt($("#5kind2").text()) + 100);
					$("#lower2").text(parseInt($("#lower2").text()) + 100);
					$("#grand2").text(parseInt($("#grand2").text()) + 100);
				}					
			}
		$(this).addClass("hide");
	});	
});
function rollDice(dice){	
	return Math.floor(Math.random() * 6 + 1);
}
