
var Class = require("./Class");
eval(Class.$import("./util"));

"use strict";

var SourceMapGeneratorBase = exports.SourceMapGeneratorBase = Class.extend({
	initialize: function (file, sourceRoot) {
		// nothing
	},

	add: function (generatedPos, originalPos, source, name) {
		// nothing
	},

	generate: function () {
		return null;
	},

	magicToken: function () {
		return "";
	},

	toString: function () {
		return "SourceMap(" + file + ", " + sourceRoot + ")";
	}
});

// interface
var Platform = exports.Platform = Class.extend({
	// load a content by name
	// e.g. node.js reads it from files
	//      browsers read it from DOM
	// load(name :String) :String

	createSourceMapGenerator: function (file, sourceRoot) {
		return new SourceMapGeneratorBase(file, sourceRoot);
	},

	log: function (s) {
		console.log(s);
	},
	warn: function (s) {
		console.warn(s);
	},
	error: function (s) {
		console.error(s);
	}
});
// vim: set noexpandtab
