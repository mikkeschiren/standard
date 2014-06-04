<?php

$plugin = array(
  'enable' => '_arnold_environment_module_enable',
  'disable' => '_arnold_environment_module_disable',
);

function _arnold_environment_module_disable($target_env, $modules){

  module_disable($modules);
  drupal_set_message(dt('Disabled these modules: @modules', array('@modules' => implode(', ', $modules))));

}

function _arnold_environment_module_enable($target_env, $modules){

  if(module_enable($modules)){
    drupal_set_message(dt('Enabled these modules: @modules', array('@modules' => implode(', ', $modules))));
  }else{
    drush_set_error('', dt('Failed to enable these modules: @modules. One or more dependencies are missing.', array('@modules' => implode(', ', $modules))));
  };

}