<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function token() {
    $number = mt_rand(1000,9999);
    $date = date(time());
    $str = "abcdefghizklmnopqrstuvwxyz123456789ABCDEFGHIZKLMNOPQRSTUVWXYZ";
    $newStr = '';
    $num = strlen($str) - 1;
    for($n=0;$n<$num;$n++){
        $newStr .= $str[rand(0,$num)];
    }
    return md5($number.$newStr.$date);
}