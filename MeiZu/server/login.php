<?php
$username = 13232567923;
$userpass = "1234165";

$con = mysqli_connect("localhost", "root", "123456", "meizu");
$sqlStr = "insert into vip (userphone,userpass) value($username,$userpass)";

$res = mysqli_query($con, $sqlStr);

print_r($res);
