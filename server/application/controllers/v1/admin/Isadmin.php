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
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', NULL );
        }
        // 获取权限信息
        $this->load->model('admin/Admin');
        $res = $this->Admin->get_admin_user();
        // 返回结果
        if($res){
            return return_response( 0, '请求成功', ["list"=>$res]);
        }else{
            return return_response( 2, '当前没有添加管理员',NULL);
        }
    }
    // 获取管理员职位信息
    public function roles()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', NULL );
        }
        // 获取权限信息
        $this->load->model('admin/Admin');
        $res = $this->Admin->get_admin_roles();
        // 返回结果
        if($res){
            return return_response( 0, '请求成功', ["list"=>$res]);
        }else{
            return return_response( 2, '当前还没有管理职位',NULL);
        }
    }
    // 添加管理员
    public function create()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作');
        }
        // 判断是否传值了role_id
        $role_id = $this->input->post('role_id');
        if(!$role_id){
            return return_response( 2, '没有选择管理员职位');
        }
        // 获取要添加的管理员名称
        $admin_name = $this->input->post('admin_name');
        if(!$admin_name){
            return return_response( 3, '没有输入管理员名称');
        }
        // 获取要添加成为管理员的用户ID
        $user_id = $this->input->post('user_id');
        // 添加管理员
        $this->load->model('admin/Admin');
        $res = $this->Admin->set_admin_user($user_id,$admin_name,$role_id);
        // 返回结果
        if($res === 4) return return_response( 4, '用户不存在');
        if($res === 5) return return_response( 5, '此用户已经是管理员');
        if($res === 6) return return_response( 6, '管理员名称已存在');
        if($res === 7) return return_response( 7, '管理员添加失败');
        if($res === 8) return return_response( 8, '管理员职位绑定失败');
        if($res === 0) return return_response( 0, '添加成功');
    }

    public function update()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作');
        }
        // 判断是否传值了role_id
        $role_id = $this->input->post('role_id');
        if(!$role_id){
            return return_response( 2, '没有选择管理员职位');
        }
        // 获取要添加的管理员名称
        $admin_name = $this->input->post('admin_name');
        if(!$admin_name){
            return return_response( 3, '没有输入管理员名称');
        }
        // 判断是否输入管理员ID
        $admin_id = $this->input->post('admin_id');
        if(!$admin_id){
            return return_response( 4, '没有输入要修改管理员的ID');
        }
        // 修改管理员数据
        $this->load->model('admin/Admin');
        $res = $this->Admin->admin_user_update($admin_id,$admin_name,$role_id);
        // 返回结果
        if($res === 5) return return_response( 5, '管理员名称已存在');
        if($res === 6) return return_response( 6, '修改失败');
        if($res === 0) return return_response( 0, '修改成功');
    }

    public function delete()
    {
        // 判断用户是不是系统最高管理员
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作');
        }
        // 判断是否输入管理员ID
        $admin_id = $this->input->post('admin_id');
        if(!$admin_id){
            return return_response( 2, '没有输入要删除的管理员ID');
        }
        // 修改管理员数据
        $this->load->model('admin/Admin');
        $res = $this->Admin->admin_user_delete($admin_id);
        if($res){
            return return_response( 0, '删除成功');
        }else{
            return return_response( 3, '删除失败');
        }
    }
}