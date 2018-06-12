<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loginclass {

	protected $code;
    protected $wxAppID;
    protected $wxAPPSecret;
    protected $wxLoginUrl;
    protected $CI;

    public function __construct($request)
    {
        $this->CI =& get_instance();
        $this->CI->load->library('configclass');
        $this->code=$request['code'];
        $this->wxAppID=$this->CI->configclass->wxAppID;
        $this->wxAPPSecret=$this->CI->configclass->wxAPPSecret;
        $this->wxLoginUrl=sprintf($this->CI->configclass->wxLoginUrl,$this->wxAppID,$this->wxAPPSecret,$this->code);
    }

    public function get(){

        if(empty($this->code)){
            return [
                "errNum" => 1,
                "errMsg" => "没有发送code凭证,请求失败"
            ];
        }

        $this->CI->load->helper('curl');
        $result = curl_get($this->wxLoginUrl);
        $wxResult = json_decode($result,true);

        if(empty($wxResult)){
            return [
                "errNum" => 1,
                "errMsg" => "请求服务器未响应,可能是Code失效"
            ];
        }else{
            $loginFile = array_key_exists('errcode',$wxResult);
            if($loginFile){
                return [
                    "errNum" => 1,
                    "errMsg" => "腾讯云服务器返回信息错误"
                ];
            }else{
                return $this->grantToken($wxResult);
            }
        }
    }

    private function grantToken($wxResult){
        // 拿到openid
        $openid = $wxResult['openid'];
        //数据里看一下这个openID是不是已经存在
        //如果存在不处理,如果不存在那么新增一条user记录
        $this->CI->load->model('home/user');
        $user_id = $this->CI->user->set_user_exist($openid);
        $wxResult['user_id'] = $user_id;
        //生成令牌,准备缓存数据 写入缓存
        //把key:令牌返回到客户端
        $this->CI->load->driver('cache');
        $this->CI->load->helper('token');
        $token = token();
        $this->CI->cache->file->save($token,$wxResult,7200);
        return [
            "errNum"  => 0,
            "retMsg"  => "请求成功,成功返回用户Token令牌",
            "retData" => [
                "token"  => $token,
                'userId' => $user_id
            ]
        ];
    }
}