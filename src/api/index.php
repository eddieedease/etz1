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

// TODO: API edit CONTENT item
//
//
//


// TODO: API edit LESSON item
//
//
//


// TODO: SAVE TREE of LESSON
//
//
//


 
// GET specific CONTENT item
// TODO: Make DOC
$app->get('/getcontent/{contentid}', function (Request $request, Response $response) {
	$contentid = $request->getAttribute('contentid');
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

	$sqllessons = "SELECT * FROM content WHERE id = '$contentid'";
	$stmtlessons = $dbh->prepare($sqllessons);
	$stmtlessons->execute();
	$resultlessons = $stmtlessons->fetchAll(PDO::FETCH_ASSOC);
	
	// 	convert it all to jSON TODO change result
	$response = json_encode($resultlessons);
	return $response;
}
);

// NOTE: the getAll API CALL
// TODO: Make DOC
$app->get('/getcourses', function (Request $request, Response $response) {
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	// 	NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
	// 	a query get all the correct records from the gemeenten table
	$sqllessons = 'SELECT * FROM courses';
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


// TODO: Make DOC, GET SPECIFIC COURSEitem
$app->get('/getcourse/{courseid}', function (Request $request, Response $response) {
	$courseid = $request->getAttribute('courseid');
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

	$sqllessons = "SELECT * FROM courses WHERE id = '$courseid'";
	$stmtlessons = $dbh->prepare($sqllessons);
	$stmtlessons->execute();
	$resultlessons = $stmtlessons->fetchAll(PDO::FETCH_ASSOC);
	
	// 	convert it all to jSON TODO change result
	$response = json_encode($resultlessons);
	return $response;
}
);

// TODO: get lessons info of course
// TODO: Make DOC, GET SPECIFIC COURSEitem
$app->get('/getcourseinfo/{courseid}', function (Request $request, Response $response) {
	$courseid = $request->getAttribute('courseid');
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

	$sqllessons = "SELECT options FROM courses WHERE id = '$courseid'";
	$stmtlessons = $dbh->prepare($sqllessons);
	$stmtlessons->execute();
	$resultlessons = $stmtlessons->fetchAll(PDO::FETCH_ASSOC);
	$aioptions = $resultlessons[0]['options'];

	$aioptionsform = json_encode($aioptions);
	$cleanString = filter_var($aioptionsform, FILTER_SANITIZE_STRING);

	// get lesson names
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql2= "SELECT id,name FROM lessons WHERE id IN ($aioptions)";
	$stmtaddfailed = $dbh->prepare($sql2);
	$stmtaddfailed->execute();
	$resultaddfailed = $stmtaddfailed->fetchAll(PDO::FETCH_ASSOC);

	// debugger
	//$data = array('Jsonresponse' => $resultaddfailed, 'debug' => $sql2);
	//$response = json_encode($data);
	//return $response;

	// give titles names back
	$response = json_encode($resultaddfailed);
	return $response;
}
);





$app->run();