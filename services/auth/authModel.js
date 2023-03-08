var Action = require('../../config/Action');
var encryptData = require('../../config/crypto');

module.exports={

    getUser: function getUser(post, callback) {
		encryptPass = encryptData.encrypt(post.pwd);
		var sql = "SELECT `email`,`password`, `actype` FROM `medicare_users` WHERE `email` = ? and `password` = ? ";
		var params = [post.email, encryptPass];

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

