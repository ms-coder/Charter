const Settings = require('./settings').MainSettings;

exports.getRequestConfiguration = (name) => {
    
    let request = Settings.Requests.find(rqs => rqs.name == name);
    request.datasource = Settings.DataSources.find(dts => dts.name == request.source);
    return request;
};