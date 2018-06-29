<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  header('Content-Type: application/json');

  require('build-tree-from-directory.php');
  require('utils.php');

  // config
  $dirBase = '../data';

  $query = json_decode($_POST["query"]);
  $result = new stdClass();
  $result->action = $query->action;


  switch ($query->action) {
    case 'folder_add':
      $dirBase = $dirBase .= "/".$query->path;
      $result->folder_name = $query->name;
      $result->folder_path = $dirBase.$query->name;
      $result->folder_created = @mkdir($dirBase.$query->name, 0755);
      break;
    case 'folder_delete':
      $result->folder_path = $query->path;
      $result->folder_deleted = delTree($dirBase."/".$query->path);
      break;
    case 'folder_rename':
      $dirOld = $dirBase."/".$query->path;
      $dirNew = $dirBase."/". @dirname($query->path) . "/" . $query->name;
      $result->folder_name = $query->name;
      $result->folder_renamed = @rename($dirOld , $dirNew);
      break;
    case 'file_tree':
      $result->folder_path = $query->path;
      $tree = new buildTreeFromDirectory($dirBase."/".$query->path);
      $result->file_tree = $tree->buildTree();
      break;
    default:
    $result->info = "action is undefined";
      break;
  }

  echo json_encode($result);
