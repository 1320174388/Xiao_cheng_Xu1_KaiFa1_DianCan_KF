<?php

class Position extends CI_Controller {

    // 添加角色权限
    public function create()
    {
        // 获取角色名称
        $roleName = $this->input->post('roleName');
        // 写入数据库
        $this->load->model('admin/Role');
        $res = $this->Role->set_role_exist($roleName);
        // 返回结果
        $this->json($res);
    }
}