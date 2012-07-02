/*
 * Copyright (c) 2012 DeNA Co., Ltd.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

var Class = require("./Class");
eval(Class.$import("./util"));

"use strict";

var DocumentRequest = exports.DocumentRequest = Class.extend({

	constructor: function (parser, startLineNumber, startColumnOffset, endLineNumber, endColumnOffset) {
		this._parser = parser;
		this._startLineNumber   = startLineNumber;
		this._startColumnOffset = startColumnOffset;
		this._endLineNumber     = endLineNumber;
		this._endColumnOffset   = endColumnOffset;
	},

	_trim: function (s) {
		return s.replace(/^\s+/, "").replace(/\s+$/, "");
	},

	_parse: function (comment) {
		comment = comment.replace(/^\/\*/, "").replace(/\*\/$/, "").replace(/^\s*\*/mg, "");
		var tag = {};
		var description = comment.replace(/^\s*\@\s*(\w+)([^\n]+)/gm, function (_, name, desc) {

			if (! tag.hasOwnProperty(name)) {
				tag[name] = [];
			}
			tag[name].push(this._trim(desc));
			return "";
		}.bind(this))

		this._description = this._trim(description);
		this._tag         = tag;
	},

	// lazy initialize
	_initializeFromParser: function () {
		this._parse(this._parser.getInputByRange(this._startLineNumber, this._startColumnOffset, this._endLineNumber, this._endColumnOffset));
		this._parser = null;
	},

	getDescription: function () {
		if (this._parser) {
			this._initializeFromParser();
		}
		return this._description;
	},
	getTag: function () {
		if (this._parser) {
			this._initializeFromParser();
		}
		return this._tag;
	},
});
