<?php
$userphone = $_REQUEST["userphone"];


$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select goods.*,shoppingcart.goods_count from shoppingcart,goods where shoppingcart.goods_id = goods.goods_id and userphone = $userphone";

$res = mysqli_query($con,$sqlStr);

$arr = array();

while($data = mysqli_fetch_assoc($res)){
    array_push($arr,$data);
}

echo(json_encode($arr));