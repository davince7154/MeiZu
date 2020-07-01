<?php
$goodsColorName = $_REQUEST["goodsColorName"];
$userphone = $_REQUEST["userphone"];
$goodsId = $_REQUEST["goodsId"];

$con = mysqli_connect("localhost","root","123456","meizu");

$sqlStr = "delete from shoppingcart where goods_id = '$goodsId' and userphone = $userphone and  goods_color_name = '$goodsColorName'";


$res = mysqli_query($con,$sqlStr);

if($res == 1){
    echo '{"status":"success","msg":"删除成功！"}';
}else{
    echo '{"status":"error","msg":"删除失败！"}';
}