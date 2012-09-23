#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;

use t::util::Util;

my @files = glob 't/run/*.jsx';

plan tests => 2 * scalar @files;

foreach my $file(@files) {
    my $json = jsx("--mode", "parse", $file);
    is $?, 0, "jsx --mode parse $file";
    ok $json;
}

