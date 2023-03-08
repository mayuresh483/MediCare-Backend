const authModel = require('../auth/authModel')

exports.getUser = (req, res) => {
    post = req.body;
    if (!req.headers["authorization"]) {
        res.status(401).send({ "error": "An authorization header was not sent" });
    } else if (req.headers["authorization"] != process.env._API_KEY) {
        res.status(401).send({ "error": "invalid api key" });
    } else {
        authModel.getUser(post, (err, result)=>{
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(500).send({
                    error: 'internal server error'
                });
            }
        });
    }
};