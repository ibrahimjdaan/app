<?php require '../reqs/db.req.php'; ?>
<?php require '../reqs/login.req.php'; ?>
<?php
error_reporting(E_ERROR | E_PARSE);
$token = new CheckToken();
if(!$token->check()){
  header('location: ../');
  die("Can't be loaded");
}
function decrypt($data, $key) {
    // Remove the base64 encoding from our key
    $encryption_key = base64_decode($key);
    // To decrypt, split the encrypted data from our IV - our unique separator used was "::"
    list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $encryption_key, 0, $iv);
}
function modal($file){
  $file_size = filesize($file);
  $file_pointer = fopen($file, "rb");
  $data = fread($file_pointer, $file_size);
  $user = (b'user:'.$_COOKIE['id']);
  return $data.$user;
}
if (isset($_GET['id'])) {
  $key = base64_encode($token->get_token());
  $path= "../1bf2e6613bff56651bf2e6613bffdd812c2fa61bf2e6613bff5665dd812c2fa65b5b6b1bf2e6613bff5665dd812c2fa65b6b5252/images/";
  $file_name = decrypt($_GET['id'], $key);
  $file = $path.$file_name;
  if (!empty($file_name)) {
    if(file_exists($file)) {
      header("Content-type: image/jpeg");
      echo modal($file);
    }
    else {
      echo "Error: File Does not exists";
    }
  }
}
 ?>
