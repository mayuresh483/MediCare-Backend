var mysql = require('mysql')

var db_config = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE_Name,
    connectionLimit: 10
}

var connection = mysql.createConnection(db_config);

//- Establish a new connection
connection.connect(function (err) {
    if (err) {
        console.log("\n\t *** Cannot establish a connection with the database. ***");

        connection = reconnect(connection);
    } else {
        console.log("\n\t *** New connection established with the database. ***")
    }
});

//- Reconnection function
function reconnect(connection) {
    console.log("\n New connection tentative...");

    //- Destroy the current connection variable
    if (connection) connection.destroy();

    //- Create a new one
    connection = mysql.createConnection(db_config);

    //- Try to reconnect
    connection.connect(function (err) {
        if (err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect, 2000);
        } else {
            console.log("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}

//- Error listener
connection.on('error', function (err) {

    //- The server close the connection.
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        connection = reconnect(connection);
    }

    //- Connection in closing
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        connection = reconnect(connection);
    }

    //- Fatal error : connection variable must be recreated
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        connection = reconnect(connection);
    }

    //- Error because a connection is already being established
    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    }

    //- Anything else
    else {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        connection = reconnect(connection);
    }

});

module.exports = connection