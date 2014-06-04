/**
 * This should enable the crop functionality.
 */
sub vcl_recv {
  # Do not cache these paths.
  if (req.url ~ "^/status\.php$" ||
      req.url ~ "^/node/add/.*$" ||
      req.url ~ "^/node/edit/.*$" ||
      req.url ~ "^/media/.*$" ||
      req.url ~ "^/update\.php$" ||
      req.url ~ "^/ooyala/ping$" ||
      req.url ~ "^/admin" ||
      req.url ~ "^/admin/.*$" ||
      req.url ~ "^/user" ||
      req.url ~ "^/user/.*$" ||
      req.url ~ "^/users/.*$" ||
      req.url ~ "^/info/.*$" ||
      req.url ~ "^/flag/.*$" ||
      req.url ~ "^.*/ajax/.*$" ||
      req.url ~ "^.*/ahah/.*$" ) {
    return (pass);
  }

  # Pipe these paths directly to Apache for streaming.
  if (req.url ~ "^/admin/content/backup_migrate/export" ||
      req.url ~ "^/printpdf/.*$") {
    return (pipe);
  }
}
