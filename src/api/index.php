<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
header("Content-Type: application/json");
// header('Access-Control-Allow-Origin: *');
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
	// header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	// 	cache for 1 day
	// 	header('Access-Control-Max-Age: 86400');
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}
// Start SLim API
$app = new \Slim\App;




// API CALL: test call
// TODO: Make DOC
$app->get('/testcall', function (Request $request, Response $response) {
	$data = array('Jsonresponse' => 'item1', 'type' => '40X');
	$response = json_encode($data);
	return $response;
});

// LOGIN WITH KEY, give back group ID.
// TODO: Make DOC
$app->get('/login/{keyy}', function (Request $request, Response $response) {
	// what key
	$keyy = $request->getAttribute('keyy');

	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

	// SQL QUERY FOR getting group id with key
	$sqlgetkey = "SELECT * FROM groups WHERE paskey = '$keyy'";
	$stmtgetkey = $dbh->prepare($sqlgetkey);
	$stmtgetkey->execute();
	$resultgetkey = $stmtgetkey->fetchAll(PDO::FETCH_ASSOC);

	// $data = array('query' => $sqlgetkey, 'back' => $resultgetkey);
	$response = json_encode($resultgetkey);
	return $response;
});


// LOGIN WITH KEY, give back group ID.
// TODO: Make DOC
$app->get('/admnlogin/{keyy}', function (Request $request, Response $response) {
	// what key
	$keyy = $request->getAttribute('keyy');

	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

	// SQL QUERY FOR getting group id with key
	$sqlgetkey = "SELECT * FROM cfg WHERE pwd = '$keyy'";
	$stmtgetkey = $dbh->prepare($sqlgetkey);
	$stmtgetkey->execute();
	$resultgetkey = $stmtgetkey->fetchAll(PDO::FETCH_ASSOC);

	// $data = array('query' => $sqlgetkey, 'back' => $resultgetkey);
	$response = json_encode($resultgetkey);
	return $response;
});








// API CALL: the GET specific LESSON
// TODO: Make DOC
// Get a lesson item here (for the object tree)
$app->get('/getlesson/{lessonid}', function (Request $request, Response $response) {
	$lessonid = $request->getAttribute('lessonid');
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	// 	NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
	// 	a query get all the correct records from the gemeenten table
	$sqllessons = "SELECT * FROM lessons WHERE id = '$lessonid'";
	$stmtlessons = $dbh->prepare($sqllessons);
	$stmtlessons->execute();
	$resultlessons = $stmtlessons->fetchAll(PDO::FETCH_ASSOC);
	
	// 	NOTE colleting everything for converting
	$result = array();
	array_push($result, $resultlessons);
	
	// 	convert it all to jSON TODO change result
	$response = json_encode($result);
	return $response;
}
);




// run the app
$app->run();