<?php

$plugin = array(
  'ask_for_backup' => '_arnold_environment_backup_ask_for_backup',
);

function _arnold_environment_backup_ask_for_backup(){

  if(drush_confirm('Create database backup file?')){
    drush_set_option('result-file', TRUE);
    drush_set_option('gzip', TRUE);
    drush_sql_dump_execute();
  };

}