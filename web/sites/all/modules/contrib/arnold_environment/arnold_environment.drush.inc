<?php

/**
 * Implements hook_drush_command().
 */
function arnold_environment_drush_command() {
  $items = array();

  // @todo We do not need this high of a bootstrap. Only requires drupal codebase
  // without database.
  $items['environment_checklist'] = array(
    'description' => 'Make sure that the site is ready for deployment',
    'aliases' => array('ec'),
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 */
function arnold_environment_drush_help($section) {
  switch ($section) {
    case 'drush:deploy-checklist':
      return dt("Runs through checks to make sure that the site is ready for deployment");
  }
}

function drush_arnold_environment_environment_checklist() {

  if(module_exists('environment')){
    $current_env = environment_current();
  }else{
    return drupal_set_message(dt('Environment module is not enabled, please enabled it before running this command'), 'error');
  }

  if(!$current_env){
    return drupal_set_message(dt('Environment is not set, please set it before running this command'), 'error');
  }

  _arnold_environment_execute_plugin_tasks($current_env, 'environment_checklist_tasks');

}

/**
 * Inspired VERY much by _drush_print_log
 */
function _arnold_environment_colorize_message($message, $type = 'error') {
  if (drush_get_context('DRUSH_NOCOLOR')) {
    $red = "[%s]";
    $yellow = "[%s]";
    $green = "[%s]";
  }
  else {
    $red = "\033[31;40m\033[1m[%s]\033[0m";
    $yellow = "\033[1;33;40m\033[1m[%s]\033[0m";
    $green = "\033[1;32;40m\033[1m[%s]\033[0m";
  }

  $verbose = drush_get_context('DRUSH_VERBOSE');
  $debug = drush_get_context('DRUSH_DEBUG');

  $return = TRUE;
  switch ($type) {
    case 'warning' :
    case 'cancel' :
      $message = sprintf($yellow, $message);
      break;
    case 'failed' :
    case 'error' :
      $message = sprintf($red, $message);
      break;
    case 'ok' :
    case 'completed' :
    case 'success' :
    case 'status':
      $message = sprintf($green, $message);
      break;
    case 'notice' :
    case 'message' :
    case 'info' :
      if (!$verbose) {
        // print nothing. exit cleanly.
        return TRUE;
      }
      $message = sprintf("[%s]", $message);
      break;
    default :
      if (!$debug) {
        // print nothing. exit cleanly.
        return TRUE;
      }
      $message = sprintf("[%s]", $message);
      break;
  }

  return $message;
}