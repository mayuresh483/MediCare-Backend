var Action = require('../../config/Action');

module.exports={

    getUser: function getUser(post, callback) {
		var sql = "SELECT `email`, `actype` FROM `medicare_users` WHERE `email` = ? and `password` = ? ";
		var params = [post.email, post.pwd];
				console.log("1234-->");

		Action.exeSEL(sql, params, function (err, result) {
			console.log(err);
            console.log(result);
			if (!err && result && result.data && result.status == "0") {
				console.log("1234-->",result.data);
                // result.data = JSON.parse(result.data);
			}
			return callback(err, result);
		});
	},
}

