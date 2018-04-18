<?php

class Token extends CI_Controller {

    public function index()
    {
        $token = get_token_values();
        if($token){
            return return_response( 0, '请求成功,成功返回Token令牌信息',['token' => $token]);
        }else{
            return return_response( 1, '身份令牌已经过期');
        }

    }

}