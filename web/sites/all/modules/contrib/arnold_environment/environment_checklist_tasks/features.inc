<?php

$plugin = array(
  'overriden_check' => '_arnold_environment_features_overriden_check',
);

function _arnold_environment_features_overriden_check(){

  drush_print(dt("Looking for enabled non default features..."));
  $non_default_features = _arnold_environment_features_list_non_default();
  $non_default_features_count = count($non_default_features)-1;
  drush_print(dt("Found @count enabled non default features:\n", array('@count' => $non_default_features_count)));

  if($non_default_features_count > 1){
    drush_print_table($non_default_features, TRUE);
  }

}


/**
 * Get a list of all feature modules.
 */
function _arnold_environment_features_list_non_default() {
  module_load_include('inc', 'features', 'features.export');
  $rows = array(array(dt('Name'), dt('Feature'), dt('State')));
  foreach (features_get_features(NULL, TRUE) as $k => $m) {
    if($m->status){
      switch (features_get_storage($m->name)) {
        case FEATURES_OVERRIDDEN:
          $storage = _arnold_environment_colorize_message(dt('Overridden'), 'error');
          break;
        case FEATURES_NEEDS_REVIEW:
          $storage = _arnold_environment_colorize_message(dt('Needs review'), 'error');
          break;
      }
      $rows[] = array(
        $m->info['name'],
        $m->name,
        $storage
      );
    }
  }
  return $rows;
}