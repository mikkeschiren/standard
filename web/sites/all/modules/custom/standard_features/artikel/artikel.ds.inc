<?php
/**
 * @file
 * artikel.ds.inc
 */

/**
 * Implements hook_ds_field_settings_info().
 */
function artikel_ds_field_settings_info() {
  $export = array();

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|artikel|artikel';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'artikel';
  $ds_fieldsetting->view_mode = 'artikel';
  $ds_fieldsetting->settings = array(
    'author' => array(
      'weight' => '3',
      'label' => 'hidden',
      'format' => 'author',
    ),
    'post_date' => array(
      'weight' => '2',
      'label' => 'hidden',
      'format' => 'ds_post_date_long',
    ),
  );
  $export['node|artikel|artikel'] = $ds_fieldsetting;

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|artikel|default';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'artikel';
  $ds_fieldsetting->view_mode = 'default';
  $ds_fieldsetting->settings = array(
    'service_links_displays_twitter' => array(
      'weight' => '3',
      'label' => 'hidden',
      'format' => 'sld_single_image',
    ),
    'service_links_displays_reddit' => array(
      'weight' => '2',
      'label' => 'hidden',
      'format' => 'sld_single_image',
    ),
    'service_links_displays_facebook' => array(
      'weight' => '4',
      'label' => 'hidden',
      'format' => 'sld_single_image',
    ),
    'service_links_displays_google_plus' => array(
      'weight' => '5',
      'label' => 'hidden',
      'format' => 'sld_single_image',
    ),
    'service_links_displays_linkedin' => array(
      'weight' => '6',
      'label' => 'hidden',
      'format' => 'sld_single_image',
    ),
  );
  $export['node|artikel|default'] = $ds_fieldsetting;

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|artikel|teaser';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'artikel';
  $ds_fieldsetting->view_mode = 'teaser';
  $ds_fieldsetting->settings = array(
    'links' => array(
      'weight' => '3',
      'label' => 'hidden',
      'format' => 'default',
    ),
    'node_link' => array(
      'weight' => '2',
      'label' => 'hidden',
      'format' => 'default',
    ),
  );
  $export['node|artikel|teaser'] = $ds_fieldsetting;

  return $export;
}

/**
 * Implements hook_ds_layout_settings_info().
 */
function artikel_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|artikel|artikel';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'artikel';
  $ds_layout->view_mode = 'artikel';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'field_bild',
        1 => 'body',
        2 => 'post_date',
        3 => 'author',
      ),
    ),
    'fields' => array(
      'field_bild' => 'ds_content',
      'body' => 'ds_content',
      'post_date' => 'ds_content',
      'author' => 'ds_content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'ds_content' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['node|artikel|artikel'] = $ds_layout;

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|artikel|default';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'artikel';
  $ds_layout->view_mode = 'default';
  $ds_layout->layout = 'ds_1col_wrapper';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'body',
        1 => 'field_bild',
        2 => 'service_links_displays_reddit',
        3 => 'service_links_displays_twitter',
        4 => 'service_links_displays_facebook',
        5 => 'service_links_displays_google_plus',
        6 => 'service_links_displays_linkedin',
      ),
    ),
    'fields' => array(
      'body' => 'ds_content',
      'field_bild' => 'ds_content',
      'service_links_displays_reddit' => 'ds_content',
      'service_links_displays_twitter' => 'ds_content',
      'service_links_displays_facebook' => 'ds_content',
      'service_links_displays_google_plus' => 'ds_content',
      'service_links_displays_linkedin' => 'ds_content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'ds_content' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['node|artikel|default'] = $ds_layout;

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|artikel|teaser';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'artikel';
  $ds_layout->view_mode = 'teaser';
  $ds_layout->layout = 'ds_1col_wrapper';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'field_bild',
        1 => 'body',
        2 => 'node_link',
        3 => 'links',
      ),
    ),
    'fields' => array(
      'field_bild' => 'ds_content',
      'body' => 'ds_content',
      'node_link' => 'ds_content',
      'links' => 'ds_content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'ds_content' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['node|artikel|teaser'] = $ds_layout;

  return $export;
}

/**
 * Implements hook_ds_view_modes_info().
 */
function artikel_ds_view_modes_info() {
  $export = array();

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'artikel';
  $ds_view_mode->label = 'Artikel';
  $ds_view_mode->entities = array(
    'node' => 'node',
  );
  $export['artikel'] = $ds_view_mode;

  return $export;
}
