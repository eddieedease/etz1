<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
require 'vendor/autoload.php';
header("Content-Type: application/json");
// header('Access-Control-Allow-Origin: *');
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    //     cache for 1 day
    //     header('Access-Control-Max-Age: 86400');
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

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

// a API CALL TO LOG THE FORM Result
// TODO not tested
$app->get('/formsubmit/{groupid}/{res1}/{res2}/{res3}/{res4}/{res5}', function (Request $request, Response $response) {
    // what key
    $groupid = $request->getAttribute('groupid');
    $res1 = $request->getAttribute('res1');
    $res2 = $request->getAttribute('res2');
    $res3 = $request->getAttribute('res3');
    $res4 = $request->getAttribute('res4');
    $res5 = $request->getAttribute('res5');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlinsertresult = "INSERT INTO results (grouplink, result1, result2, result3, result4, result5) VALUES ('$groupid','$res1','$res2','$res3','$res4','$res5')";
    $stmtinsertresult = $dbh->prepare($sqlinsertresult);
    $stmtinsertresult->execute();
    // $resultinsertresult = $stmtinsertresult->fetchAll(PDO::FETCH_ASSOC);

    $data = array('query' => $sqlinsertresult, 'back' => "some");
    $response = json_encode($data);
    return $response;
});

// API CALL: Make an groupkey
// TODO: Make DOC
// Get a lesson item here (for the object tree)
$app->get('/makegroup/{groupname}/{groupkey}', function (Request $request, Response $response) {
    $groupname = $request->getAttribute('groupname');
    $groupkey = $request->getAttribute('groupkey');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // TODO: CHECK IF EXISTS implementing
	$sql_u = "SELECT * FROM groups WHERE name = '$groupname'";
	$stmt_u = $dbh->prepare($sql_u);
    $stmt_u->execute();
    $result_u = $stmt_u->fetchAll(PDO::FETCH_ASSOC);

    $sql_e = "SELECT * FROM groups WHERE paskey = '$groupkey'";
    $stmt_e = $dbh->prepare($sql_e);
    $stmt_e->execute();
    $result_e = $stmt_e->fetchAll(PDO::FETCH_ASSOC);

    if (count($result_u)  > 0) {
        $name_error = "Sorry... username already taken";
        //     NOTE colleting everything for converting
        //     NOTE colleting everything for converting
        $data = array('query' => $sqlinsertgroup, 'status' => "error", 'reason' => 'groupname');
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
    } else if (count($result_e) > 0) {
        $email_error = "Sorry... email already taken";
        //     NOTE colleting everything for converting
        $data = array('query' => $sqlinsertgroup, 'status' => "error", 'reason' => 'paskey');
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
    } else {
        //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
        //     a query get all the correct records from the gemeenten table
        $sqlinsertgroup = "INSERT INTO groups (name, status, paskey) VALUES ('$groupname', 1, '$groupkey')";
        $stmtinsertgroup = $dbh->prepare($sqlinsertgroup);
        $stmtinsertgroup->execute();
        $resultinsertgroup = $stmtinsertgroup->fetchAll(PDO::FETCH_ASSOC);

        //     NOTE colleting everything for converting
        $data = array('query' => $sqlinsertgroup, 'status' => "success", 'check' => $result_u);
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
    }

}
);

// API: Test status
$app->get('/changestatus/{groupid}/{status}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $status = $request->getAttribute('status');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlupdatestatus = "UPDATE groups SET status = '$status' WHERE id = '$groupid'";
    $stmtupdatestatus = $dbh->prepare($sqlupdatestatus);
    $stmtupdatestatus->execute();
    $resultupdatestatus = $stmtupdatestatus->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulupdatestatus);

    //     convert it all to jSON TODO change result
    $response = json_encode($resultupdatestatus);
    return $response;
}
);

// API: Edit Group
//
$app->get('/editgroup/{groupid}/{groupname}/{groupkey}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupname = $request->getAttribute('groupname');
    $groupkey = $request->getAttribute('groupkey');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqleditgroup = "UPDATE groups SET name = '$groupname', paskey = '$groupkey' WHERE id = '$groupid'";
    $stmteditgroup = $dbh->prepare($sqleditgroup);
    $stmteditgroup->execute();
    $resulteditgroup = $stmteditgroup->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resuleditgroup);

    //     convert it all to jSON TODO change result
    $response = json_encode($resulteditgroup);
    return $response;
}
);

// API CALLS GROUP MANAGEMENT
// API CALL
// GET GROUPS
$app->get('/getgroups', function (Request $request, Response $response) {

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlgetgroups = "SELECT * FROM groups";
    $stmtgetgroups = $dbh->prepare($sqlgetgroups);
    $stmtgetgroups->execute();
    $resultgetgroups = $stmtgetgroups->fetchAll(PDO::FETCH_ASSOC);

    // $data = array('query' => $sqlgetkey, 'back' => $resultgetkey);
    $response = json_encode($resultgetgroups);
    return $response;
});

// API CALL
// GET SCORES OF CERTAIN GROUP
// Note: just get the rows, the front end does the calculating
$app->get('/getresults/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlgetresults = "SELECT * FROM results WHERE grouplink = '$groupid'";
    $stmtgetresults = $dbh->prepare($sqlgetresults);
    $stmtgetresults->execute();
    $resultgetresults = $stmtgetresults->fetchAll(PDO::FETCH_ASSOC);

    // $data = array('query' => $sqlgetkey, 'back' => $resultgetkey);
    $response = json_encode($resultgetresults);
    return $response;
});

// run the app
$app->run();
