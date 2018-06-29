$(document).ready(function() {

  // adds a folder
  var queryFolderAdd = {
    action: "folder_add",
    name: "folder23",
    path: "folder1/folder1_renamed/" // (optional must end with '/')
  }

  // deletes recursively
  var queryFolderDelete = {
    action: "folder_delete",
    path: "folder1/folder3"
  }

  var queryFiletree = {
    action: "file_tree",
    path: "/folder1/folder1" //startingpoint inside 'data'
  }

  var queryFolderRename = {
    action: "folder_rename",
    name: "folder1_renamed",
    path: "folder1/folder1" // folder1 will be folder_renamed
  }

  $.post( "api/index.php", { query: JSON.stringify(queryFolderAdd) })
  //$.post( "api/index.php", { query: JSON.stringify(queryFolderDelete) })
  //$.post( "api/index.php", { query: JSON.stringify(queryFiletree) })
  //$.post( "api/index.php", { query: JSON.stringify(queryFolderRename) })
  .done(function( data ) {
    console.log( "Data Loaded: " );
    console.log( data );
  });

});
