class varnish(
 $host = '127.0.0.1',
 $varnish_port = '80',
 $varnish_memory = '256',
 $port = '8081',
 $connect_timeout = '1m',
 $first_byte_timeout = '1m',
 $between_bytes_timeout = '10s',
 $pre_vcl = false, # Use this to add functionallity from the top, subs are concatenated.
 $post_vcl = false, # -""-:ish
) {

  package { 'varnish':
    ensure => installed,
  }

  service { varnish:
    enable  => true,
    ensure  => running,
    require => [Package["varnish"], File["/etc/varnish/default.vcl"], File["/etc/default/varnish"]]
  }

  file { "/etc/varnish/default.vcl":
    owner  => root,
    group  => root,
    mode   => 0444,
    content => template("varnish/default.vcl.erb"),
    notify => Service['varnish'],
    require => Package["varnish"]
  }

  if $pre_vcl {
    file { '/etc/varnish/pre.vcl':
      owner => root,
      group   => root,
      mode    => 0444,
      source => "puppet:///modules/varnish/pre-vcl/${pre_vcl}",
      notify => Service['varnish'],
      require => [Package["varnish"], File["/etc/varnish/default.vcl"]]
    }
  }

  if $post_vcl {
  file { '/etc/varnish/post.vcl':
    owner => root,
    group   => root,
    mode    => 0444,
    source => "puppet:///modules/varnish/post-vcl/${post_vcl}",
    notify => Service['varnish'],
    require => [Package["varnish"], File["/etc/varnish/default.vcl"]]
  }
  }

  file { "/etc/default/varnish":
    owner   => root,
    group   => root,
    mode    => 0444,
    content => template("varnish/default.erb"),
    notify  => Service['varnish'],
    require => Package["varnish"]
  }
}
