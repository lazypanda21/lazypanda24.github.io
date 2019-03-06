var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "19961218",
  database: "Bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


customer();

//Displays products in database table
function customer() {
  connection.query('SELECT * FROM Products', function (err, res) {

    inquirer.prompt([{

      name: "choice",
      type: "list",
      message: "What would you like to buy?",

      choices: function (value) {
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].product_name);
        }
        return choiceArray;
      }
    }, {

      name: "quantity",
      type: "input",
      message: "How many would you like to buy?",
      validate: function (value) {
        if (isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }]).then(function (answer) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name == answer.choice) {
          var chosenItem = res[i];
        }
      }

      var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);

      if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
        console.log( "Insufficient quantity! ");
        repeat();
      }
      else {
        var Total = (parseFloat(answer.quantity) * chosenItem.price).toFixed(2);

        var query = connection.query("UPDATE Products SET ? WHERE ?",
        [{ stock_quantity: updateStock }, { item_id: chosenItem.item_id }], function (err, res) {
          if (err) throw err;

          console.log("Your total is $ " + Total);
          repeat();
        });
      }

    });

  });

}

function repeat() {
  inquirer.prompt({
    name: "repurchase",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase == "Yes") {
      customer();
    }
    else {
      console.log( "Thanks for shopping with us. Have a great day!" )
      connection.end();
    }
  });
}
