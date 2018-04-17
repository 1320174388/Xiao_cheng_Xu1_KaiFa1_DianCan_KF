<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function is_system_admin() {
    // 引入CI类
    $CI =& get_instance();
    // 引入配置类
    $CI->load->library('configclass');
    // 获取最高管理员openid
    $wxOpenId = $CI->configclass->wxOpenId;
    // 获取当前访问用户的 openid
    $openid = get_token_values('openid');
    if(empty($openid)){
        return false;
    }
    // 如果是最高管理员返回 true 不是 返回 false
    if($wxOpenId === $openid){
        return true;
    }else{
        return false;
    }
}

function is_admin_user() {
    $id = get_token_values('user_id');
    // 引入CI类
    $CI =& get_instance();
    // 获取权限信息
    $CI->load->model('admin/Admin');
    $res = $CI->Admin->is_admin_users($id);
    // 返回结果
    return $res;
}