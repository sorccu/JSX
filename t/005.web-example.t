#!/usr/bin/perl
use strict;
use warnings;
use Test::More;

use t::util::Util;

my @files = <web/example/*.jsx>;
plan tests => 2 * scalar @files;

for my $file(@files) {
    {
        jsx($file);
        is $?, 0, "jsx $file";
    }
    {
        jsx("--mode", "parse", $file);
        is $?, 0, "jsx -- mode parse";
    }
}

