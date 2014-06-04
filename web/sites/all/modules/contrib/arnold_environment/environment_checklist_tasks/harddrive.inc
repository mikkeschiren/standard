<?php

$plugin = array(
  'check_free_space' => '_arnold_environment_harddrive_check_free_space',
);

function _arnold_environment_harddrive_check_free_space(){

  $file_dir_path = drupal_realpath('public://');
  drush_shell_exec("df $file_dir_path |tr -s '('   ' '  | awk  '{print $1}' | sed -n '1!p'");
  $filesystem_shell_output = drush_shell_exec_output();

  if(isset($filesystem_shell_output[0]) && count($filesystem_shell_output) == 1){
    $filesystem = $filesystem_shell_output[0];
    drush_shell_exec("df $filesystem | sed -n '1!p'");
    $filesystem_shell_output = drush_shell_exec_output();
    drush_print($filesystem_shell_output[0]);
  }else{
    drush_set_error('', dt("Filesystem of files folder not found. Can't determince free space available"));
  }

}