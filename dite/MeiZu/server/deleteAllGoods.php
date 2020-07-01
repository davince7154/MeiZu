<?php

$goodsColorName = $_REQUEST["goodsColorName"];
$userphone = $_REQUEST["userphone"];
$goodsId = $_REQUEST["goodsId"];

for ($i = 0; $i < count($goodsId); $i++) {
    $goodsColorNameStr .= "'$goodsColorName[$i]',";
    $goodsIdStr .= "'$goodsId[$i]',";
}

$goodsColorNameStr = substr($goodsColorNameStr, 0, strlen($goodsColorNameStr) - 1);
$goodsIdStr = substr($goodsIdStr, 0, strlen($goodsIdStr) - 1);

$con = mysqli_connect("localhost", "root", "123456", "meizu");

$sqlStr = "delete from shoppingcart where goods_id in($goodsIdStr) and goods_color_name in($goodsColorNameStr) and userphone = $userphone";

$res = mysqli_query($con, $sqlStr);

if ($res == 1) {
    echo '{"status":"success","msg":"结算成功！"}';
} else {
    echo '{"status":"error","msg":"结算失败！"}';
}
