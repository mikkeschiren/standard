<?php
/**
 * @file
 * artikel.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function artikel_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function artikel_node_info() {
  $items = array(
    'artikel' => array(
      'name' => t('Artikel'),
      'base' => 'node_content',
      'description' => t('Artikel'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
