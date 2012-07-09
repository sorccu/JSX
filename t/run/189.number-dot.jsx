/*EXPECTED
42
2a
*/

class Test {
	static function run() : void {
		log 42.;
		log 42..toString(16);
	}
}

