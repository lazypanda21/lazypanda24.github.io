var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
  head: ['Item ID', 'Item', 'Department', 'Price', 'Qnty'],
  colWidths: [5, 20, 15, 10, 10]
});

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


manager();

function manager() {
  inquirer.prompt([{
    name: "mainMenu",
    type: "list",
    message: "Welcome to Bamazon! What would like to do today?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"]

  }]).then(function (choice) {

    switch (choice.mainMenu) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        viewLow();
        break;

      case "Add to Inventory":
        addInv();
        break;

      case "Add New Product":
        addProd();
        break;
    }
  })
}


function viewProducts() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
    }
    console.log(table.toString());
    repeat();
  })
};

function viewLow() {
  connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
         table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
       }
       console.log(table.toString());
    repeat();
  })
};

function addInv() {
  inquirer.prompt([{
    name: "item_id",
    type: "input",
    message: "Enter the product_id you want to add.",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    name: "updateStock",
    type: "input",
    message: "Enter the amount that you want to update.",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function (answer) {
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: answer.updateStock
        },
        {
          item_id: answer.item_id
        }

      ]
    )
    console.log("Inventory has been updated!\n");
    repeat();
  })
};

function addProd() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "Enter the name of the product to add to the inventory.",
      validate: function (value) {
        if (value == null || value == "") {
          return false;
        } else {
          return true;
        }
      }
    },
    {
      name: "department",
      type: "list",
      choices: ["Beauty","Clothing","Electronics","Kitchen"],
      message: "Select appropriate department for the new product."
    },
    {
      name: "price",
      type: "input",
      message: "Enter an appropriate price for a single new product.",
      validate: function (value) {
        if (value == null || value == "") {
          return false;
        } else {
          return true;
        }
      }
    },
    {
      name: "qnty",
      type: "input",
      message: "Enter the amount of products to stock in our inventory.",
      validate: function (value) {
        if (value == null || value == "") {
          return false;
        } else {
          return true;
        }
      }
    }
  ]).then(function (answers) {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answers.item,
        department_name: answers.department,
        price: answers.price,
        stock_quantity: answers.qnty,
      },
      function (err, res) {
        if (err) throw err;
        console.log(" NEW row affected. Product inserted!\n");

        repeat();
      }
    );

  });

}


function repeat() {
  inquirer.prompt({
    name: "manage",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to continue managing the store?"
  }).then(function (answer) {
    if (answer.manage == "Yes") {
      manager();
    }
    else {
      connection.end();
    }
  });
}
