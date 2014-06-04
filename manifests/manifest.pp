class { 'systools': }
class { 'varnish': }
class { 'apache':
    port => 8081
}
class { 'php':
  development => true
}

class { 'drush': }
class { 'postfix': }


class { 'mysql':
  local_only     => true,
  hostname => $fqdn
}

apache::vhost { "drupal":
    document_root => $drupal_root
}
class { 'phpmyadmin': }

