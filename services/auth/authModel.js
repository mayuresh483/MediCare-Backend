var Action = require('../../config/Action');
var encryptData = require('../../config/crypto');

module.exports={

    getUser: function getUser(post, callback) {
		encryptPass = encryptData.encrypt(post.pwd);
		var sql = "SELECT `email`,`password`, `actype` FROM `medicare_users` WHERE `email` = ? and `password` = ? ";
		var params = [post.email, encryptPass];

		Action.exeSEL(sql, params, function (err, result) {
			if (!err && result && result.data && result.status == "0") {
				console.log(result.data);
			}
			return callback(err, result);
		});
	},

	registerUser : function registerUser(post,callback){
		encryptPass = encryptData.encrypt(post.pwd);
		var sql = "INSERT INTO `medicare_users` (`fname`,`lname`,`email`,`password`, `actype`) VALUE(?,?,?,?,?) ";
		var params = [post.fname,post.lname,post.email, encryptPass, 0];

		Action.exeInsert(sql, params, function (err, result) {
			if (!err && result && result.data && result.status == "0") {
                console.log(result.data);
			}
			return callback(err, result);
		});
	}
}

