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
    // 获取管理员列表信息
    public function roles()
    {
        // 判断用户是不是系统最高管理员
        if(is_system_admin()){
            // 获取权限信息
            $this->load->model('admin/Admin');
            $res = $this->Admin->get_admin_roles();
            // 返回结果
            $this->json($res);
        }else{
            $this->json([
                "errNum" => 1,
                "errMsg" => "你没有权限进行此操作"
            ]);
        }
    }
    // 添加管理员
    public function create()
    {
        // 判断是否传值了role_id
        $role_id = $this->input->post('role_id');
        if($role_id){
            // 获取要添加的管理员名称
            $admin_name = $this->input->post('admin_name');
            if($admin_name){
                // 判断用户是不是系统最高管理员
                if(is_system_admin()){
                    // 获取要添加成为管理员的用户ID
                    $user_id = $this->input->post('user_id');
                    // 添加管理员
                    $this->load->model('admin/Admin');
                    $res = $this->Admin->set_admin_user($user_id,$admin_name,$role_id);
                    // 返回结果
                    $this->json($res);
                }else{
                    $this->json([
                        "errNum" => 3,
                        "errMsg" => "你没有权限进行此操作"
                    ]);
                }
            }else{
                $this->json([
                    "errNum" => 2,
                    "errMsg" => "没有输入管理员名称"
                ]);
            }
        }else{
            $this->json([
                "errNum" => 1,
                "errMsg" => "没有选择管理员职位"
            ]);
        }
    }
}