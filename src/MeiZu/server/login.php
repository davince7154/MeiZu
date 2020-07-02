<?php

$userphone = $_REQUEST["userphone"];

$userpass = $_REQUEST["userpass"];



$con = mysqli_connect("localhost", "root", "123456", "meizu");

$sqlStr = "select * from vip where userphone = $userphone";

$res = mysqli_query($con, $sqlStr);

if (mysqli_num_rows($res) === 0) {
    echo '{"status":"error","msg":"此电话号码还未注册，请再次填写！"}';
    mysqli_close($con);
    return;
}

// print_r(f);
$arr = array();

while ($data = mysqli_fetch_assoc($res)) {
    array_push($arr, $data);
}
mysqli_close($con);

if($arr[0]["userpass"] === $userpass){
    echo '{"status":"success","msg":"登录成功！！！"}';
}else{
    echo '{"status":"error","msg":"登录失败，请再次填写！"}';
}
