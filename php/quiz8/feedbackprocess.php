<?php
$target_file = basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$uploadFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
echo $target_file;



// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  // print_r($_POST["submit"]);

  echo ($_POST["submit"]);

    $checkFileSize = filesize($_FILES["fileToUpload"]["tmp_name"]);
    echo "file size is : ". $checkFileSize;
    $uploadOk = 1;
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  print_r($check);
//   if($check !== false) {
//     echo "File is an image - " . $check["mime"] . ".";
//     $uploadOk = 1;
//   } else {
//     echo "File is not an image.";
//     $uploadOk = 0;
//   }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// 
// Allow certain file formats
if($uploadFileType != "zip" && $uploadFileType != "rar"  ) {
  echo "Sorry, only zip,rar are allowed.";
  $uploadOk = 0;
}

// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//   echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//   $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    // echo "Hello" .$_POST["submit"]["firstName"] .$_POST["submit"]["firstName"] . "\n";
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.\n";
  } else {
    echo " </br> Sorry, there was an error uploading your file.";
  }
}
?>








<!-- <form action="post">
        <p>
            <input type="submit" name="dopost" value="Submit"/>
            <input type="button" onclick="location.href='canvas.unl.edu/'; return false;"
            value="Escape">
        </p>
    </form> -->
