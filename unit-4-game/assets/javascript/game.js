// global variables.
		var attack;
		var defend;
		var attackcharacter;
		var attackerHP;
    var attackerAP;
    var attackerCAP;
    var defendcharacter;
    var defenderHP;
    var defenderAP;
    var defenderCAP;
    var name;
    var YourCharacter;
    var YourDefender;
    var myChar = "";
    var myDef = "";

		var characters = {

			Leia: {
					name: "Leia",
					visual: 'assets/images/leia.jpg',
					healthPoints: 120,
					attackPower: 8,
					fullName: "Princess Leia",
					counterAttackPower: 24
					},

			Maul:{
					name: "Maul",
					visual: 'assets/images/maul.jpg',
					healthPoints: 100,
					attackPower: 10,
					fullName: "Darth Maul",
					counterAttackPower: 5
					},

			Yoda:{
					name: "Yoda",
					visual: 'assets/images/yoda.jpg',
					healthPoints: 150,
					attackPower: 10,
					fullName: "Master Yoda",
					counterAttackPower: 20
					},

			Darthvader:{
					name: "Darthvader",
					visual: 'assets/images/vader.jpg',
					healthPoints: 180,
					attackPower: 12,
					fullName: "Darth Vader",
					counterAttackPower: 25
					}
		};

function reset() {

	$("#picRow").show();

	$(".restart").hide();

	$(".attackButton").show();

	var myChar = "";
	var myDef = "";

	characters.Leia.healthPoints = 120;
	characters.Maul.healthPoints = 100;
	characters.Yoda.healthPoints = 150;
	characters.Darthvader.healthPoints = 180;

	characters.Leia.attackPower = 8;
	characters.Maul.attackPower = 10;
	characters.Yoda.attackPower = 10;
	characters.Darthvader.attackPower = 12;

	$(".youAttacked").empty();
	$(".attackedBack").empty();
	$(".youDefeated").empty();
	$(".youWon").empty();
	$(".youLose").empty();
	$(".noEnemy").empty();


	$(".nameo").html(characters.Leia.fullName);
	$(".namel").html(characters.Maul.fullName);
	$(".nameds").html(characters.Yoda.fullName);
	$(".namedm").html(characters.Darthvader.fullName);

	$("#darthS").appendTo("#picRow");
	$("#darthM").appendTo("#picRow");
	$("#luke").appendTo("#picRow");
	$("#obi").appendTo("#picRow");

	$(".leiahp").html(characters.Leia.healthPoints);
	$(".maulhp").html(characters.Maul.healthPoints);
	$(".yodahp").html(characters.Yoda.healthPoints);
	$(".darthmhp").html(characters.Darthvader.healthPoints);

	$(".firstRow").css({"background-color": "white", "outline-color": "limegreen",
	"border-width": "3px", "outline-style": "solid", "border-color": "white", "outline-width": "3px"});

};



	$(document).ready(function(){
		reset();
	$(".firstRow").click(function(){

  if (myChar == "") {
   console.log(this);
   $(this).appendTo("#yourChar");
   myChar = $(this);
   YourCharacter = $(myChar).attr("value");
 	   }

	 if (YourCharacter == characters.Leia.name) {
			 attackerHP = characters.Leia.healthPoints;
			 attackerAP = characters.Leia.attackPower;
			 attackerCAP = characters.Leia.counterAttackPower;
			 attackerFN = characters.Leia.fullName;
			 attack = characters.Leia;
		}
		else if (YourCharacter == characters.Maul.name){
			 attackerHP = characters.Maul.healthPoints;
			 attackerAP = characters.Maul.attackPower;
			 attackerCAP = characters.Maul.counterAttackPower;
			 attackerFN = characters.Maul.fullName;
			 attack = characters.Maul;
		}
		else if (YourCharacter == characters.Yoda.name){
			 attackerHP = characters.Yoda.healthPoints;
			 attackerAP = characters.Yoda.attackPower;
			 attackerCAP = characters.Yoda.counterAttackPower;
			 attackerFN = characters.Yoda.fullName;
			 attack = characters.Yoda;
		}
		else if (YourCharacter == characters.Darthvader.name){
			 attackerHP = characters.Darthvader.healthPoints;
			 attackerAP = characters.Darthvader.attackPower;
			 attackerCAP = characters.Darthvader.counterAttackPower;
			 attackerFN = characters.Darthvader.fullName;
			 attack = characters.Darthvader;
		}

   for (var i = 0; i < 4; i++) {
   	$("._" + [i]).not(myChar).appendTo("#enemies" + [i]);

   	$("._" + [i]).not(myChar).css({"background-color": "red", "outline-color": "black",
   		"border-width": "3px", "outline-style": "solid", "border-color": "black", "outline-width": "1px"});
   }
   $("#picRow").hide();

    });


 $(".enemy").click(function(){
   	$(this).appendTo("#defender");
   	myDef = $(this);
   	YourDefender = $(myDef).children().attr("value");
   	$(".youDefeated").empty();


		 if (YourDefender == characters.Leia.name) {
				defenderHP = characters.Leia.healthPoints;
				defenderAP = characters.Leia.attackPower;
				defenderCAP = characters.Leia.counterAttackPower;
				defenderFN = characters.Leia.fullName;
				defend = characters.Leia;

			}
			else if (YourDefender == characters.Maul.name){
				defenderHP = characters.Maul.healthPoints;
				defenderAP = characters.Maul.attackPower;
				defenderCAP = characters.Maul.counterAttackPower;
				defenderFN = characters.Maul.fullName;
				defend = characters.Maul;

		 }
		 else if (YourDefender == characters.Yoda.name){
				defenderHP = characters.Yoda.healthPoints;
				defenderAP = characters.Yoda.attackPower;
				defenderCAP = characters.Yoda.counterAttackPower;
				defenderFN = characters.Yoda.fullName;
				defend = characters.Yoda;

		 }
		 else if (YourDefender == characters.Darthvader.name){
				defenderHP = characters.Darthvader.healthPoints;
				defenderAP = characters.Darthvader.attackPower;
				defenderCAP = characters.Darthvader.counterAttackPower;
				defenderFN = characters.Darthvader.fullName;
				defend = characters.Darthvader;

		 }
console.log(defenderFN);

 });



 $(".attackButton").click(function(){

 		if ($("#defender").children().length == 0) {
 			$(".noEnemy").html("No enemy here.");
 		}

 		if (!(attackerHP < 1) || !(defenderHP < 1)) {
 		attackerHP = (attackerHP - defenderCAP);
 		$("." + YourCharacter).html(attackerHP);
 		$(".youAttacked").html("You attacked " + defenderFN + " for " + attackerAP + " damage.");
 		defenderHP = (defenderHP - attackerAP);
 		$(".attackedBack").html(defenderFN + " attacked you back for " + defenderCAP + " damage.");
		$("." + YourDefender).html(defenderHP);

 	}

 		if (defenderHP <= 0) {
 			$(".youAttacked").empty();
 			$(".attackedBack").empty();
 			$(".youDefeated").html("You have defeated " + defenderFN + ", you can choose to fight another enemy.");
 			$("#defender").empty();
 			console.log(attackerAP);
 			attackerAP = (attackerAP + 10);
 			attack.attackPower = attackerAP;
 			console.log(attackerAP);

 		}


 		if ($(".enemy").children().length == 0){
 		 $(".youAttacked").empty();
 		 $(".attackedBack").empty();
 		 $(".youDefeated").empty();
 		 $(".noEnemy").empty();
 		 $(".youWon").html("You Won!!!! ");
 		 $(".restart").show();

 		 $(".restart").click(function(){
 		 	location.reload(true);
 		 })

 		}

 		if (attackerHP <= 0) {
 			$(".restart").show();
 			$(".attackButton").hide();
 			$(".youAttacked").empty();
 		 	$(".attackedBack").empty();
 			$(".youDefeated").empty();
 			$(".youLose").html("You lose...GAME OVER!!!")

   		 $(".restart").click(function(){
   		 	location.reload(true);
   		 });

 		}

 });
});
