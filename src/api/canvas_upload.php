<?php
	// requires php5
	define('UPLOAD_DIR', '../upload/');
	$gif = $_POST['gif'];
	$gif = str_replace('data:image/gif;base64,', '', $gif);
	$gif = str_replace(' ', '+', $gif);
	$data = base64_decode($gif);
	$name = uniqid() . '.gif';
	$file = UPLOAD_DIR . $name;
	$success = file_put_contents($file, $data);
	print $success ? '{"gif":"'.$name.'","error":0}' : '{"error":1}';
?>