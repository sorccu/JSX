#!/usr/bin/perl
use strict;
use warnings;
use Test::More;
use File::Temp qw(tempdir);

use t::util::Util;

my @files = <example/*.jsx>;
plan tests => 2 * scalar @files;

my $workdir = tempdir(CLEANUP => 1);

for my $file(@files) {
    {
        my $got = jsx("--run", $file);
        is $?, 0, $file or diag($got);
    }

    {
        my $got = jsx("--executable", "node", "--output", "$workdir/compiled", $file);
        is $?, 0, $file or diag($got);
    }
}

