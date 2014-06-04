<?php

$plugin = array(
  'create_role_users' => '_arnold_environment_user_create_role_users',
  'grant_permissions' => '_arnold_environment_user_grant_permissions',
);

function _arnold_environment_user_create_role_users($target_env, $env_settings){

  $roles = user_roles();
  $available_role_users = array();

  foreach($roles as $rid => $role_name){
    if($rid != DRUPAL_ANONYMOUS_RID){

      $role_name = ($rid == DRUPAL_AUTHENTICATED_RID) ? 'authenticated' : $role_name;
      $exising_role_user = user_load_by_name($role_name);

      if(empty($exising_role_user)){

        $mail = 'role_user_' . $role_name . '@nothing.com';

        $newUser = array(
          'name' => $role_name,
          'pass' => $role_name,
          'mail' => $mail,
          'status' => 1,
          'init' => $mail,
          'roles' => array($rid => $role_name)
        );
        if(user_save(null, $newUser)){
          $available_role_users[] = $role_name;
        };

      }else{
        $available_role_users[] = $role_name;
      }

    }
  }

  if(!empty($available_role_users)){
    drupal_set_message(dt('These role users are now available: @roles', array('@roles' => implode(', ', $available_role_users))));
  }

}

function _arnold_environment_user_grant_permissions($target_env, $env_settings){

  foreach($env_settings as $role_name => $permissions_array){
    $role = user_role_load_by_name($role_name);
    if(!empty($role->rid)){
      user_role_grant_permissions($role->rid, $permissions_array);
      drupal_set_message(dt('Granted the following permissions to "@role_name" role: @permissions', array('@role_name' => $role_name, '@permissions' => implode(', ', $permissions_array))));
    }
  }

}