<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16 0016
 * Time: 18:26
 */
class Isadmin extends CI_Controller {

    // 获取管理员列表信息
    public function show()
    {
        // 判断用户是不是系统最高管理员
        if(is_system_admin()){
            // 获取权限信息
            $this->load->model('admin/Admin');
            $res = $this->Admin->get_admin_user();
            // 返回结果
            $this->json($res);
        }else{
            $this->json([
                "errNum" => 1,
                "errMsg" => "你没有权限进行此操作"
            ]);
        }
    }
}