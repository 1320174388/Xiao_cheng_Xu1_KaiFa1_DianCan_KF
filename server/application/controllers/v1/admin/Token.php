<?php

class Token extends CI_Controller {

    public function index()
    {
        $token = get_token_values();
        if($token){
            $this->json([
                "errNum"  => 0,
                "retMsg"  => "请求成功,成功返回Token令牌信息",
                "retData" => [
                    'token' => $token
                ]
            ]);
        }else{
            $this->json([
                "errNum"  => 1,
                "errMsg"  => "身份令牌已经过期"
            ]);
        }

    }

}