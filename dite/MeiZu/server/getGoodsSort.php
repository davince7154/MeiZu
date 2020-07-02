<?php

$goodsType = $_REQUEST["goodsType"];
$sort = $_REQUEST["sort"];

$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select * from goods where goods_type = '$goodsType'";

if($sort != "normal"){
    $sqlStr .= " order by goods_price $sort";
}

$res = mysqli_query($con,$sqlStr);
mysqli_close($con);

$arr = array();

while($data = mysqli_fetch_assoc($res)){
    array_push($arr,$data);
}

echo json_encode($arr);


?>