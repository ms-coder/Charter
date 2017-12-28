const Hjson = require('hjson');
require("hjson/lib/require-config");
const config = require("./../settings/config.hjson");
const widgets = require("./../settings/widgets.hjson");

exports.MainSettings = config;
exports.Widgets = widgets;