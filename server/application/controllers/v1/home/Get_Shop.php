<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/5 0005
 * Time: 14:12
 */
class Get_Shop extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home/Shop_info');
    }

    /**
     * 获取店铺地址信息
     */
    public function get_shop_addr()
    {
        $res = $this->Shop_info->select_shop_addr();
        if($res){
            return return_response(0,'请求成功',$res);
        }else{
            return return_response(1,'请求失败');
        }
    }
}