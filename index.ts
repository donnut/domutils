var DomUtils = {};

import stringify = require("./lib/stringify");
import traversal = require("./lib/traversal");
import manipulation = require("./lib/manipulation");
import querying = require("./lib/querying");
import legacy = require("./lib/legacy");
import helpers = require("./lib/helpers");

[
	stringify,
	traversal,
	manipulation,
	querying,
	legacy,
	helpers
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});
export = DomUtils;
