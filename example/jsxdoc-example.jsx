/**
  * General Description of The Module
  */

/**
 * The Description of class Foo
 */
class Foo {
	var _x : int;
	var _y : int;

	/**
	  * The great new constructor
	  *
	  * @param x the value of x
	  * @param y the value of y
	  */
	function constructor(x : int, y : int) {
		this._x = x;
		this._y = y;
	}

	/**
	  * The great new method
	  *
	  * @return x + y
	  */

	function bar() : int {
		return this._x + this._y;
	}
}

/**
  * The entry point of this application
  */
class _Main {
	static function main(args : string[]) : void {
		var foo = new Foo(10, 20);
		log foo.bar();
	}
}

