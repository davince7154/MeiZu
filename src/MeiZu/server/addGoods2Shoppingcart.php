<?php

$goodsid = $_REQUEST["goodsId"];
$userphone = $_REQUEST["userphone"];
$goodscount = $_REQUEST["goodsCount"];
$colorName = $_REQUEST["goodsColorName"];
$goodsColor = $_REQUEST["goodsColor"];



$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "select goods_id,goods_color_name,userphone from shoppingcart where goods_id = $goodsid and goods_color_name = '$colorName' and userphone = $userphone";

$res = mysqli_query($con,$sqlStr);

if(mysqli_num_rows($res)>0){
    $sqlStr = "update shoppingcart set goods_count = goods_count + 1 where goods_id = '$goodsid' and userphone = $userphone and goods_color_name = '$colorName'" ;
}else{
    $sqlStr = "insert into shoppingcart (userphone,goods_id,goods_count,goods_color_name,goods_color) value ($userphone,'$goodsid',$goodscount,'$colorName','$goodsColor')";
}

$res = mysqli_query($con,$sqlStr);


if($res == 1){
    echo '{"status":"success","msg":"添加成功"}';
}else{
    echo '{"status":"error","msg":"添加失败"}';
}