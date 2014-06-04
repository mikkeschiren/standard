<?php

$plugin = array(
  'list_cache_status' => '_arnold_environment_cache_list_cache_status',
);

function _arnold_environment_cache_list_cache_status(){

  $caches = array(
    array(
      'name' => dt('Cache pages for anonymous users.'),
      'variable_name' => 'cache'
    ),
    array(
      'name' => dt('Aggregate and compress CSS files.'),
      'variable_name' => 'preprocess_css'
    ),
    array(
      'name' => dt('Aggregate JavaScript files. '),
      'variable_name' => 'preprocess_js'
    )
  );

  $rows = array(array(dt('Name'), dt('Status')));

  foreach($caches as $cache_info){
    $status = variable_get($cache_info['variable_name']) ? _arnold_environment_colorize_message(dt('Enabled'), 'ok') : _arnold_environment_colorize_message(dt('Disabled'));

    $rows[] = array(
      $cache_info['name'],
      $status
    );
  }

  drush_print(dt('Cache statuses:'));
  drush_print_table($rows, TRUE);

}