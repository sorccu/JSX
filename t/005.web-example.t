#!/usr/bin/perl
use strict;
use warnings;
use Test::More;
use File::Find;

my $jsx = "bin/jsx";

my @files = @ARGV;
if (! @files) {
    find {
        wanted => sub {
            return unless /\.jsx$/;

            push @files, $_;
        },
        no_chdir => 1,
    }, 'web/example';
}
plan tests => 3 * scalar @files;

for my $file(@files) {
    {
        my $cmd = qq{bin/jsx "$file"};
        `$cmd`; # ensure it compiles

        is $?, 0, $cmd;
    }
    {
        my $cmd = qq{bin/jsx --mode parse "$file"};
        `$cmd`; # ensure it compiles

        is $?, 0, $cmd;
    }
    {
        my $cmd = qq{bin/jsx --release "$file"};
        `$cmd`; # ensure it compiles

        is $?, 0, $cmd;
    }
}

