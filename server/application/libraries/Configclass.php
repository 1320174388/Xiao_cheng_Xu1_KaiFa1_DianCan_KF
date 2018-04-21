<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configclass {

    // AppID(小程序ID)
    public $wxAppID = 'wxccc5a444059f1b68';

    // AppSecret(小程序密钥) 
    public $wxAPPSecret = '2aaf9762149d8c8b5a4bc2ca13045514';

    // 接口地址
    public $wxLoginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';

    // OpenId (最高管理员 openid)
    public $wxOpenId = 'ocEd35JmegGO90zFLoblR3p26B9Q';

    // 系统最高管理员管理模块路由
    public $Modular_Route = [
        [
            'id'          => 'X',
            'right_name'  => '权限管理',
            'right_route' => '/pages/Admin/Authority/updatePower/index'
        ],
        [
            'id'          => 'A',
            'right_name'  => '管理列表',
            'right_route' => '/pages/Admin/Management/updateManage/index'
        ]
    ];

}