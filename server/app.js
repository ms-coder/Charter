const connector = require("./controllers/connector")
connector.getJsonFor('getAllCustomers', function(err, rows, data) {
    if (err) {
        console.log('err: ' + err);
    }
    else {
        console.log('debug: ' + rows + " | " + JSON.stringify(data));
    }
});
