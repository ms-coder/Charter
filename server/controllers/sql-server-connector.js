const Connection = require('tedious').Connection;
const ConnectionStringParser = require('connection-string');

exports.getJsonFor = (requestConfiguration, callback) => {

    let connection = {};
    try {
        connection = new Connection(getConfig());
    }
    catch (err) {
        console.log(err);
        callback(err);
        return;
    }

    connection.on('connect', (err) => executeStatement(err));

    function getConfig() {
        const connectionStringObject = ConnectionStringParser(requestConfiguration.datasource.connectionString);

        let options = connectionStringObject.params;
        options.rowCollectionOnRequestCompletion = true;

        return {
            userName: connectionStringObject.user,
            password: connectionStringObject.password,
            server: connectionStringObject.host,
            options: options
        };
    }

    function executeStatement(err) {

        // TODO: write errors handling function
        if (err) {
            console.log(err);
            callback(err);
        }

        const SqlServerRequestManager = require('tedious').Request;

        let sqlServerRequest = new SqlServerRequestManager(requestConfiguration.request, function(err, rowCount, rows) {
            if (err) {
                console.log(err);
                callback(err);
            }

            let jsonArray = [];
            rows.forEach(function(columns) {
                var rowObject = {};
                columns.forEach(function(column) {
                    rowObject[column.metadata.colName] = column.value;
                });
                jsonArray.push(rowObject);
            });
            return callback(null, rowCount, jsonArray);
        });

        connection.execSql(sqlServerRequest);
    }

};
