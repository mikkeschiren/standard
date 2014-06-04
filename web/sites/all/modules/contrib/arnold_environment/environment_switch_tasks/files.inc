<?php

$plugin = array(
  'set_files_folder_permissions' => '_arnold_environment_set_files_folder_permissions',
);

function _arnold_environment_set_files_folder_permissions($target_env, $env_settings){

  if(!empty($env_settings['commands'])){
    foreach($env_settings['commands'] as $command_settings){

      $files_folder_location = drupal_realpath(file_default_scheme() . '://');;

      if(drush_shell_cd_and_exec($files_folder_location, $command_settings['command'])){
        drupal_set_message($command_settings['Success message']);
      }else{
        drupal_set_message(dt('Failed to execute @command', array('@command' => $command_settings['command'])), 'error');
      };
    }

  }

}