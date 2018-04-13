<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loginclass {

	protected $code;
    protected $wxAppID;
    protected $wxAPPSecret;
    protected $wxLoginUrl;

    public function __construct($request)
    {
        $CI =& get_instance();
        $CI->load->library('configclass');
        
        $this->code=$request['code'];
        $this->wxAppID=$CI->configclass->wxAppID;
        $this->wxAPPSecret=$CI->configclass->wxAPPSecret;
        $this->wxLoginUrl=sprintf($CI->configclass->wxLoginUrl,$this->wxAppID,$this->wxAPPSecret,$this->code);
    }

    public function get(){

        // 加载辅助函数
        $CI =& get_instance();
        $CI->load->helper('curl');

        $result = curl_get($this->wxLoginUrl);
        $wxResult = json_decode($result,true);

        if(empty($wxResult)){
            return ['请求失败','errMsg'=>'请求服务器未响应,可能是Code失效'];
        }else{
            $loginFile = array_key_exists('errcode',$wxResult);
            if($loginFile){
                return ['请求错误',$wxResult];
            }else{
                return $this->grantToken($wxResult);
            }
        }
    }

    private function grantToken($wxResult){
        // 拿到openid
        $openid = $wxResult['openid'];
        return $openid;
    }
}