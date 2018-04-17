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
        if(!is_system_admin()) return $this->json([
            "errNum" => 1,
            "errMsg" => "你没有权限进行此操作"
        ]);
        // 获取权限信息
        $this->load->model('admin/Admin');
        $res = $this->Admin->get_admin_user();
        // 返回结果
        if($res) return $this->json([
            "errNum"  => 0,
            "retMsg"  => "请求成功",
            "retData" => [
                "list" => $res
            ]
        ]);
        else return $this->json([
            "errNum" => 2,
            "errMsg" => "当前没有添加管理员"
        ]);
    }
    // 获取管理员列表信息
    public function roles()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()) return $this->json([
            "errNum" => 1,
            "errMsg" => "你没有权限进行此操作"
        ]);
        // 获取权限信息
        $this->load->model('admin/Admin');
        $res = $this->Admin->get_admin_roles();
        // 返回结果
        if($res) $this->json([
            "errNum"  => 0,
            "retMsg"  => "请求成功",
            "retData" => [
                "list" => $res
            ]
        ]);
        else $this->json([
            "errNum" => 2,
            "errMsg" => "当前还没有管理职位"
        ]);
    }
    // 添加管理员
    public function create()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()) return $this->json([
            "errNum" => 1,
            "errMsg" => "你没有权限进行此操作"
        ]);
        // 判断是否传值了role_id
        $role_id = $this->input->post('role_id');
        if(!$role_id) return $this->json([
            "errNum" => 2,
            "errMsg" => "没有选择管理员职位"
        ]);
        // 获取要添加的管理员名称
        $admin_name = $this->input->post('admin_name');
        if(!$admin_name) return $this->json([
            "errNum" => 3,
            "errMsg" => "没有输入管理员名称"
        ]);
        // 获取要添加成为管理员的用户ID
        $user_id = $this->input->post('user_id');
        // 添加管理员
        $this->load->model('admin/Admin');
        $res = $this->Admin->set_admin_user($user_id,$admin_name,$role_id);
        // 返回结果
        if($res === 4) return $this->json([
            "errNum" => 4,
            "errMsg" => "用户不存在"
        ]);
        if($res === 5) return $this->json([
            "errNum" => 5,
            "errMsg" => "此用户已经是管理员"
        ]);
        if($res === 6) return $this->json([
            "errNum" => 6,
            "errMsg" => "管理员名称已存在"
        ]);
        if($res === 7) return $this->json([
            "errNum" => 7,
            "errMsg" => "管理员添加失败"
        ]);
        if($res === 8) return $this->json([
            "errNum" => 8,
            "errMsg" => "管理员职位绑定失败"
        ]);
        if($res === 0) return $this->json([
            "errNum"  => 0,
            "retMsg"  => "添加成功",
            "retData" => []
        ]);
    }

    public function update()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()) return $this->json([
            "errNum" => 1,
            "errMsg" => "你没有权限进行此操作"
        ]);
        // 判断是否传值了role_id
        $role_id = $this->input->post('role_id');
        if(!$role_id){
            return $this->json([
                "errNum" => 2,
                "errMsg" => "没有选择管理员职位"
            ]);
        }
        // 获取要添加的管理员名称
        $admin_name = $this->input->post('admin_name');
        if(!$admin_name) return $this->json([
            "errNum" => 3,
            "errMsg" => "没有输入管理员名称"
        ]);
        // 判断是否输入管理员ID
        $admin_id = $this->input->post('admin_id');
        if(!$admin_id) return $this->json([
            "errNum" => 4,
            "errMsg" => "没有输入要修改管理员的ID"
        ]);
        // 修改管理员数据
        $this->load->model('admin/Admin');
        $res = $this->Admin->admin_user_update($admin_id,$admin_name,$role_id);
        // 返回结果
        if($res === 5) return $this->json([
            "errNum" => 5,
            "errMsg" => "管理员名称已存在"
        ]);
        if($res === 6) return $this->json([
            "errNum" => 6,
            "errMsg" => "修改失败"
        ]);
        if($res === 0) return $this->json([
            "errNum"  => 0,
            "retMsg"  => "修改成功",
            "retData" => []
        ]);
    }

    public function delete()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()) return $this->json([
            "errNum" => 1,
            "errMsg" => "你没有权限进行此操作"
        ]);
        // 判断是否输入管理员ID
        $admin_id = $this->input->post('admin_id');
        if(!$admin_id) return $this->json([
            "errNum" => 2,
            "errMsg" => "没有输入要删除的管理员ID"
        ]);
        // 修改管理员数据
        $this->load->model('admin/Admin');
        $res = $this->Admin->admin_user_delete($admin_id);
        if($res) return $this->json([
            "errNum"  => 0,
            "retMsg"  => "删除成功",
            "retData" => []
        ]);
        else return $this->json([
            "errNum" => 3,
            "errMsg" => "删除失败"
        ]);
    }
}