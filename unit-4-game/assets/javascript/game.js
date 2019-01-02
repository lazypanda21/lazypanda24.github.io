// name
// healthPoints
// attackPower
// fullName
// counterAttackPower


var attack;
var defend;
var attackcharacter;
var attackerFN;
var attackerHP;
var attackerAP;
var attackerCAP;
var defendcharacter;
var defenderFN;
var defenderHP;
var defenderAP;
var defenderCAP;
var name;
var YourCharacter;
var YourDefender;
var myChar = "";
var myDef = "";



// array of all characters
var characters = {

	Leia: {
			name: "Princess Leia",
			img: 'assets/images/leia.jpg',
			healthPoints: 100,
			attackPower: 5,
			fullName: "Princess Leia",
			counterAttackPower: 25
			},

	Maul:{
			name: "Darth Maul",
			img: 'assets/images/maul.jpg',
			healthPoints: 150,
			attackPower: 20,
			fullName: "Darth Maul",
			counterAttackPower: 5
			},

	Yoda:{
			name: "Master Yoda",
			img: 'assets/images/yoda.jpg',
			healthPoints: 190,
			attackPower: 30,
			fullName: "Master Yoda",
			counterAttackPower: 20
			},

	Darthvader:{
			name: "Darth Vader",
			img: 'assets/images/vader.jpg',
			healthPoints: 180,
			attackPower: 15,
			fullName: "Darth Vader",
			counterAttackPower: 20
			}
};


$(document).ready(function(){
	reset();

	$(".firstRow").click(function(){

    if (myChar == "") {

     $(this).appendTo("#yourChar");
      console.log(this);
     myChar = $(this);
     YourCharacter = $(myChar).attr("value");

   	 }
    switch (YourCharacter){
			case characters.Leia.name:
				attackerHP = characters.Leia.healthPoints;
				attackerAP = characters.Leia.attackPower;
				attackerCAP = characters.Leia.counterAttackPower;
				attackerFN = characters.Leia.fullName;
				attack = characters.Leia;
				break;
			case characters.Maul.name:
				attackerHP = characters.Maul.healthPoints;
				attackerAP = characters.Maul.attackPower;
				attackerCAP = characters.Maul.counterAttackPower;
				attackerFN = characters.Maul.fullName;
				attack = characters.Maul;
				break;
			case characters.Yoda.name:
				attackerHP = characters.Yoda.healthPoints;
				attackerAP = characters.Yoda.attackPower;
				attackerCAP = characters.Yoda.counterAttackPower;
				attackerFN = characters.Yoda.fullName;
				attack = characters.Yoda;
				break;
			case characters.Darthvader.name:
				attackerHP = characters.Darthvader.healthPoints;
				attackerAP = characters.Darthvader.attackPower;
				attackerCAP = characters.Darthvader.counterAttackPower;
				attackerFN = characters.Darthvader.fullName;
				attack = characters.Darthvader;
				break;
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
  switch(YourDefender){
    case characters.Leia.name:
      defenderHP = characters.Leia.healthPoints;
      defenderAP = characters.Leia.attackPower;
      defenderCAP = characters.Leia.counterAttackPower;
      defenderFN = characters.Leia.fullName;
      defend = characters.Leia;
      break;
    case characters.Maul.name:
      defenderHP = characters.Maul.healthPoints;
      defenderAP = characters.Maul.attackPower;
      defenderCAP = characters.Maul.counterAttackPower;
      defenderFN = characters.Maul.fullName;
      defend = characters.Maul;
      break;
    case characters.Yoda.name:
      defenderHP = characters.Yoda.healthPoints;
      defenderAP = characters.Yoda.attackPower;
      defenderCAP = characters.Yoda.counterAttackPower;
      defenderFN = characters.Yoda.fullName;
      defend = characters.Yoda;
      break;
    case characters.Darthvader.name:
      defenderHP = characters.Darthvader.healthPoints;
      defenderAP = characters.Darthvader.attackPower;
      defenderCAP = characters.Darthvader.counterAttackPower;
      defenderFN = characters.Darthvader.fullName;
      defend = characters.Darthvader;
      break;

}
});


 $(".attackButton").click(function(){
 		if ($("#defender").children().length == 0) {
 			$(".noEnemy").html("No enemy here.");
 		}

 		if ((attackerHP > 0) || (defenderHP > 0)) {
   //attacker
 		attackerHP = (attackerHP - defenderCAP);
 		$("." + YourCharacter).html(attackerHP);
 		$(".youAttacked").html("You attacked " + defenderFN + " for " + attackerAP + " damage.");
  //defender
 		defenderHP = (defenderHP - attackerAP);
 		$(".attackedBack").html(defenderFN + " attacked you back for " + defenderCAP + " damage.");

	  $("." + YourDefender).html(defenderHP);

 	}


 		if (defenderHP <= 0) {
 			$(".youAttacked").empty();
 			$(".attackedBack").empty();
 			$(".youDefeated").html("You have defeated " + defenderFN + " ");
 			$("#defender").empty();
 			attackerAP = (attackerAP + 10);
 			attack.attackPower = attackerAP;
      $(".youWon").html("You Won!");
      $(".restart").show();
 		}

   //lose case
 		if (attackerHP <= 0) {
 			$(".restart").show();
 			$(".attackButton").hide();
 			$(".youAttacked").empty();
 		 	$(".attackedBack").empty();
 			$(".youDefeated").empty();
 			$(".youLose").html("You've been defeated...GAME OVER!!!")
 		}
 });

});
function reset() {

	$("#picRow").show();

	$(".restart").hide();
 // dont forget to hide the restart when its not in the attack
	$(".attackButton").show();

	var myChar = "";
	var myDef = "";

 // reset everything
	characters.Leia.healthPoints = 100;
  // console.log(characters.Leia.healthPoints );
	characters.Maul.healthPoints = 150;
	characters.Yoda.healthPoints = 190;
	characters.Darthvader.healthPoints = 180;


	characters.Leia.attackPower = 5;
	characters.Maul.attackPower = 20;
	characters.Yoda.attackPower = 30;
	characters.Darthvader.attackPower = 15;


	$(".youAttacked").empty();
	$(".attackedBack").empty();
	$(".youDefeated").empty();
	$(".youWon").empty();
	$(".youLose").empty();
	$(".noEnemy").empty();

	$(".name0").html(characters.Leia.fullName);
	$(".name1").html(characters.Maul.fullName);
	$(".name2").html(characters.Yoda.fullName);
	$(".name3").html(characters.Darthvader.fullName);

	$("#leia").appendTo("#picRow");
	$("#maul").appendTo("#picRow");
	$("#yoda").appendTo("#picRow");
	$("#vader").appendTo("#picRow");

	$(".leiahp").html(characters.Leia.healthPoints);
	$(".maulhp").html(characters.Maul.healthPoints);
	$(".yodahp").html(characters.Yoda.healthPoints);
	$(".vaderhp").html(characters.Darthvader.healthPoints);

}
