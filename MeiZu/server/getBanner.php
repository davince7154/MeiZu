<?php
$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select * from banner ";

$res = mysqli_query($con,$sqlStr);

$arr = array();

while($data = mysqli_fetch_assoc($res)){
    array_push($arr,$data);
}

echo json_encode($arr);
