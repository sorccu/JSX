#!perl
# The JSX compiler must not crash with any options!
use strict;
use warnings;

use Test::More;

use t::util::Util;

my @files = @ARGV;

sub not_crash {
    local $Test::Builder::Level = $Test::Builder::Level + 1;

    unlike(jsx(@_), qr/^\s+ \b at \b \s+ \b Module \b/xms, dumper("jsx", @_));
}

not_crash "no such file";
not_crash "--complete", "1:1", "no such file";

for my $file(@files) {
    open my($fh), "<", $file or die $!;

    while (defined(my $line = <$fh>)) {
        for (my $c = 0; $c < length $line; ++$c) {
            not_crash "--complete", "$.:$c", $file;
        }
    }
}

done_testing;
