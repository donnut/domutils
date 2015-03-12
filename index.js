var DomUtils = {};
var stringify = require("./lib/stringify");
var traversal = require("./lib/traversal");
var manipulation = require("./lib/manipulation");
var querying = require("./lib/querying");
var legacy = require("./lib/legacy");
var helpers = require("./lib/helpers");
[
    stringify,
    traversal,
    manipulation,
    querying,
    legacy,
    helpers
].forEach(function (ext) {
    Object.keys(ext).forEach(function (key) {
        DomUtils[key] = ext[key].bind(DomUtils);
    });
});
module.exports = DomUtils;
