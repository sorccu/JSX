class TestSuite {
	var _name :string;
	var _count  = 0;
	var _pass   = 0;
	var _start  = Date.now();
	var _status = 0; // exit code
	var _verbose = true /* TODO: check whether the process has TTY */;

	function initialize(name :string) {
		this._name = name;

		this.note("start testing " + this.toString());
	}

	override function toString() :string {
		return "TestSuite(" + this._name + ")";
	}

	function describe (name :string, block :function(:TestBlock) :void ) :void {
		this._doBlock(name, block);
	}

	function next(name :string, block :function(:TestBlock) :void) :void {
		// FIXME
	}

	function _doBlock(name :string, block :function(:TestBlock) :void) :void {
		var subtest = new TestBlock(name, this);
		this.note(name);
		//try {
			block(subtest);
		/*
		} catch(e) {
			this._status = 1;

			this.fail('subtest ' + name + "\n" + e.stack);

			subtest.done(null);
		}
		*/
	}

	/* function expect<T>()? */
	function expect(value :variant, message :string) :TestMatcher {
		return new TestMatcher(this, ++this._count, value, message);
	}

	function fail(message :string) :void {
		++this._count;
		this._ok(false, message);
	}

	function _ok(result :boolean, message :string, diagnostics :string) :void {
		this._ok(result, message);
		//FIXME:
		//this.diag(new Error(diagnostics)).stack);
	}

	function _ok(result :boolean, message :string) :void {
		var args = [] :string[];

		if(result) {
			++this._pass;
			args.push('ok');
		}
		else {
			args.push('not ok');
		}

		args.push(this._count.toString());

		args.push('-');
		args.push(message);

		this._puts( args.join("") );
	}

	function done() :void {
		this._puts('1..' + this._count.toString());

		if(this._count != this._pass) {
			this.diag('Looks like you failed '
					  + (this._count - this._pass).toString()
					  + ' test of ' + this._count.toString());
			this._status = 1;
		}
		this.note('elapsed ' + (Date.now() - this._start).toString() + ' ms.');

		//FIXME
		//process.exit(this._status);
	}

	function _makeMessage(message :string) :string {
		var s = message.split(/\n/);
		var first = s.shift();

		if(s.length == 0) {
			return first;
		}
		else {
			return first + "\n" + s.join("\n").replace(/^/mg, '# ');
		}
	}

	function note(message :string) :void {
		if(this._verbose) {
			this._puts('# ' + this._makeMessage(message));
		}
	}

	function diag(message :string) :void {
		this._puts('# ' + this._makeMessage(message));
	}

	function _puts(message :string) :void {
		log message;
	}
}

class TestBlock {
	// TODO
}

class TestMatcher {
	// TODO
}
