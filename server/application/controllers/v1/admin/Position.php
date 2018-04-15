<?php

class Position extends CI_Controller {

    // 添加角色权限
    public function create()
    {
        // 判断用户是不是系统最高管理员
        if(is_system_admin()){
            // 获取角色名称
            $roleName = $this->input->post('roleName');
            // 写入数据库
            $this->load->model('admin/Role');
            $res = $this->Role->set_role_exist($roleName);
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