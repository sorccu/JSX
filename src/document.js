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

	constructor: function () {
		this._prepqredDoc = null;
	},

	_trim: function (s) {
		return s.replace(/^\s+/, "").replace(/\s+$/, "");
	},

	parse: function (comment) {
		comment = comment.replace(/^\/\*/, "").replace(/\*\/$/, "").replace(/^\s*\*/mg, "");
		var tag = {};
		var description = comment.replace(/^\s*\@\s*(\w+)([^\n]+)/gm, function (_, name, desc) {

			if (! tag.hasOwnProperty(name)) {
				tag[name] = [];
			}
			tag[name].push(this._trim(desc));
			return "";
		}.bind(this))

		var doc = new Document();
		doc.setDescription(this._trim(description));
		doc.setTag(tag);

		this._preparedDoc = doc;
	},

	getDocument: function () {
		var doc = this._preparedDoc; // null if there's no document
		this._preparedDoc = null;
		return doc;
	},
});

var Document = exports.Document = Class.extend({
	getDescription: function () {
		return this._description;
	},
	setDescription: function (description) {
		this._description = description;
	},
	getTag: function () {
		return this._tag;
	},
	setTag: function (tag) {
		this._tag = tag;
	}
});
