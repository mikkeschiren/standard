<?php

$plugin = array(
  'compile_compass' => '_arnold_environment_css_compile_compass',
);

function _arnold_environment_css_compile_compass($target_env, $env_settings){

  if(!empty($env_settings['compass_project_dir'])){

    if(!empty($env_settings['compile_parameters'])){
      $compile_parameters = implode(' ', $env_settings['compile_parameters']);
    }

    if(drush_shell_cd_and_exec($env_settings['compass_project_dir'], 'bundle exec compass compile ' . $compile_parameters)){
      drupal_set_message(dt('Successfully compiled css using compass'));
    }else{
      drupal_set_message(dt('Failed to compile css using compass'), 'error');
    };

  }

}