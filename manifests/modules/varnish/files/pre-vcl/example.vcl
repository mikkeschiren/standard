/**
 * Just a basic sample for how it could look
 */
sub vcl_recv {
  if (req.url == "/example") {
    error 200 "Yay it works.";
  }
}