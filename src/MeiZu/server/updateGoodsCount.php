<?php

$goodsId = $_REQUEST["goodsId"];
$goodsCount = $_REQUEST["goodsCount"];
$goodsColorName  = $_REQUEST["goodsColorName"];
$userphone = $_REQUEST["userphone"];



$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "update shoppingcart set goods_count = $goodsCount where goods_id = '$goodsId' and goods_color_name = '$goodsColorName' and userphone = $userphone";

$res = mysqli_query($con,$sqlStr);


echo $res;
