<?php

// @TODO: Set vars (and other exportables) with default config instead?

$plugin = array(
  'set_drupal_variable' => '_arnold_environment_variable_set_drupal_variable',
);

function _arnold_environment_variable_set_drupal_variable($target_env, $env_settings){

  if(!empty($env_settings['variables'])){
    foreach ($env_settings['variables'] as $param => $value) {
      variable_set($param, $value);
      $value = $value === '' ? '[an empty string]' : $value;
      drupal_set_message(dt('Set Drupal variable @param to @value.', array('@param' => $param, '@value' => $value)));
    }
  }

}