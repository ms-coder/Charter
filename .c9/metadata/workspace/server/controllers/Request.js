{"changed":true,"filter":false,"title":"Request.js","tooltip":"/server/controllers/Request.js","value":"const Settings = require('./settings').MainSettings;\n\nexports.getDataSource = (name) => {\n    return Settings.DataSources.find(dts => dts.name == name);\n};","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":4,"column":2},"action":"insert","lines":["const Settings = require('./settings').MainSettings;","","exports.getDataSource = (name) => {","    return Settings.DataSources.find(dts => dts.name == name);","};"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":4,"column":2},"end":{"row":4,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1514467736025}