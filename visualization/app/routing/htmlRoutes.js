var path = require('path');

module.exports = function(app) {
	app.get("/question", function(req,res) {
		res.sendFile(path.join(__dirname, "../public/question.html"));
	})

	app.get("*",function (req, res){
		res.sendFile(path.join(__dirname, "../public/home.html"));
	})
}
