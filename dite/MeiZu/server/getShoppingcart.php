<?php
$userphone = $_REQUEST["userphone"];


$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select goods_color_name,goods_color,goods_count,goods_id,goods_name,goods_price from shoppingcart where userphone = $userphone";

$res = mysqli_query($con,$sqlStr);

$arr = array();

while($data = mysqli_fetch_assoc($res)){
    array_push($arr,$data);
}

echo(json_encode($arr));