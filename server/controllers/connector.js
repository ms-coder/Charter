const Request = require("./request")

// TODO: check for errors / config problems

exports.getJsonFor = (name, callback) => {

    var requestConfiguration = Request.getRequestConfiguration(name);
    var specificConnector = getSpecificConnector(requestConfiguration.datasource.type);
    
    return specificConnector.getJsonFor(requestConfiguration, callback);
}

function getSpecificConnector(type)
{
    return require(`./${type}-connector`);
}