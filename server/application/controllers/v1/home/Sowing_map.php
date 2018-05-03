<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/3 0003
 * Time: 10:44
 */
class Sowing_map extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home/M_Sowing_Map');
    }

    public function git_sowing_map()
    {
        $res = $this->M_Sowing_Map->select_sowing_list();

        if(res){
            return return_response(0,'请求成功',$res);
        }else{
            return return_response(1,'请求失败');
        }
    }
}