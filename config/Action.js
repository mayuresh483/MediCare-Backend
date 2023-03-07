var connection = require('./db_connect');

var Action = {
    exeSEL: function exeSELMulti(sql, params, callback) {
        var sql = sql;
        var params = params;

        connection.query(sql, params, function (err, results) {
            var resp;
            var error = null;
            if (results && results.length > 0) {
                resp = {
                    status: "0",
                    status_msg: "success",
                    data: results
                };
            } else {
                if (err) {
                    error = err;
                    resp = {
                        status: "1",
                        status_msg: error["sqlMessage"],
                        data: []
                    };
                } else {
                    resp = {
                        status: "1",
                        status_msg: "invalid user name or password",
                        data: []
                    };
                }
            }
            var response = JSON.parse(JSON.stringify(resp));
            return callback(error, response);
        });
    },

}
module.exports = Action;