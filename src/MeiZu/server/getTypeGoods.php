<?php
$goodsType = $_REQUEST["goods_type"];

$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select * from goods where  goods_type = '$goodsType'";

$res = mysqli_query($con,$sqlStr);

mysqli_close($con);

$arr = array();

while($data = mysqli_fetch_assoc($res)){
    array_push($arr,$data);
}

echo json_encode($arr[0]);
?>