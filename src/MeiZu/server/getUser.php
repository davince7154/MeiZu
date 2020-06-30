<?php

$userphone = $_REQUEST["userphone"];

$con = mysqli_connect("localhost", "root", "123456", "meizu");

$sqlStr = "select username from vip where userphone  = $userphone";

$res = mysqli_query($con, $sqlStr);

$arr = array();

while ($data = mysqli_fetch_assoc($res)) {
    array_push($arr, $data);
}

echo $arr[0]["username"];
