package t::util::Util;
use 5.10.0;
use strict;
use warnings;

use File::Basename ();
use lib File::Basename::dirname(__FILE__) . "/extlib/lib/perl5";
use base qw(Exporter);

our @EXPORT = qw(slurp get_section dumper jsx);
our %EXPORT_TAGS = (
    all => \@EXPORT,
);

use IPC::Open3 qw(open3);
use Symbol qw(gensym);
use Data::Dumper ();

my $jsx_server = $ENV{JSX_COMPILATION_SERVER};

sub dumper {
    local $Data::Dumper::Terse  = 1;
    local $Data::Dumper::Indent = 0;

    return Data::Dumper->new([\@_], ['*argv'])->Dump();
}

sub jsx {
    my @cmd = ("bin/jsx", @_);

    if (! $jsx_server) {
        my($wtr, $rdr) = (gensym(), gensym());
        my $pid = open3($wtr, $rdr, undef, @cmd);
        close $wtr;
        my $out = do {
            local $/;
            <$rdr>;
        };
        waitpid($pid, 0);

        return $out;
    }
    else {
        require LWP::UserAgent;
        require JSON;

        state $ua = LWP::UserAgent->new();
        my $res = $ua->post($jsx_server,
            'Content-Type' => 'application/json',,
            'Content'      => JSON::encode_json(\@_),
        );
        if ($res->is_success) {
            my $result = JSON::decode_json($res->content);
            $? = $result->{statusCode};
            return $result->{stdout} . $result->{stderr};
        }
        else {
            $? = 1;
            return undef;
        }
    }
}
sub slurp {
    my($file) = @_;
    open my $fh, "<", $file
        or die "failed to open $file:$!";
    local $/;
    return <$fh>;
}


sub get_section {
    my ($file, $name) = @_;
    my $content = slurp($file);
    my($expected) = $content =~ m{/\*$name\n(|.*?\n)\*/}s;
    return $expected;
}

1;
