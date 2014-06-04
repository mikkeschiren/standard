class phpmyadmin () {
  package { 'phpmyadmin':
    ensure => installed,
  }

  file { "/etc/phpmyadmin/apache.conf":
    owner => root,
    group => root,
    mode  => 0444,
    source => 'puppet:///modules/phpmyadmin/apache.conf',
  }
  file { "/etc/apache/conf.d/apache.conf":
    owner => root,
    group => root,
    mode  => 0444,
    source => 'puppet:///modules/phpmyadmin/apache.conf',
  }
}
