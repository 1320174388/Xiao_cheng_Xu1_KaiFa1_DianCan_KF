<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configclass {

    // AppID(小程序ID)
    public $wxAppID = 'wx432a86107ed3814a';

    // AppSecret(小程序密钥) 
    public $wxAPPSecret = '24d2f33bf8bebfdbe4ae9f9966f27ccc';

    // 微信支付商户号
    public $mch_id = '1502775551';

    // 微信支付秘钥
    public $wxZhiFuMiYao = 'weqoiHJLDK46291werpvmdklsDPOS389';

    // 用户登录接口地址
    public $wxLoginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';

    // 系统最高管理员管理模块路由
    public $Modular_Route = [
        [
            'id'          => 'X',
            'right_name'  => '职位管理',
            'right_route' => '/pages/Admin/Authority/updatePower/index'
        ],
        [
            'id'          => 'A',
            'right_name'  => '管理列表',
            'right_route' => '/pages/Admin/Management/updateManage/index'
        ]
    ];

}