<?php
$userphone = $_REQUEST["userphone"];
$userpass = $_REQUEST["userpass"];
$username = $_REQUEST["username"];

$con = mysqli_connect("localhost", "root", "123456", "meizu");

$sqlStr = "select * from vip where userphone = $userphone";

$res = mysqli_query($con, $sqlStr);

if (mysqli_num_rows($res) > 0) {
    echo '{"status":"error","msg":"此电话号码已被注册，请再次填写！"}';
    mysqli_close($con);
    return;
}

$sqlStr = "insert into vip (userphone,userpass,username) value($userphone,'$userpass','$username')";

$res = mysqli_query($con, $sqlStr);
mysqli_close($con);

if($res == 1){
    echo '{"status":"success","msg":"注册成功！！！"}';
}else{
    echo '{"status":"error","msg":"注册失败！"}';
}
