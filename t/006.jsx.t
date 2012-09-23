#!/usr/bin/perl
use strict;
use warnings;
use Test::More tests => 22;

use t::util::Util;

ok jsx("--version"), "jsx --version shows something";
is $?, 0, "... exits with 0";

ok jsx("--help"), "jsx --help shows something";
is $?, 0, "... exits with 0";

ok jsx("--no-such-option", "example/hello.jsx");
isnt $?, 0, "jsx --no-such-option exits with non-zero";

ok jsx("--executable");
isnt $?, 0, "jsx --executable (with no arg) exits with non-zero";
ok jsx("--add-search-path");
isnt $?, 0, "jsx --add-search-path (with no arg) exits with non-zero";
ok jsx("--mode");
isnt $?, 0, "jsx --mode (with no arg) exits with non-zero";
ok jsx("--complete");
isnt $?, 0, "jsx --complete (with no arg) exits with non-zero";
ok jsx("--target");
isnt $?, 0, "jsx --target (with no arg) exits with non-zero";

is jsx("--run", "t/006.jsx/hello.jsx"), "Hello, world!\n", "jsx --run";
is $?, 0, "... exits with 0";

is scalar(`bin/jsx --run -- - < t/006.jsx/hello.jsx`), "Hello, world!\n", "jsx --run -- -";
is $?, 0, "... exits with 0";

is jsx("--run", "t/006.jsx/dump-args.jsx", "foo",  "bar"),
    qq{["foo","bar"]\n}, "jsx --run with args";
is $?, 0, "... exits with 0";

