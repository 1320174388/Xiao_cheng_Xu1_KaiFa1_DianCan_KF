<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/14 0013
 * Time: 20:10
 */
class Role extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function set_role_exist($roleName,$right)
    {
        // 查看数据库中是否有这个角色
        $role = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
        if(!$role->result()){
            $res = $this->CI->db->insert('data_admin_roles',['role_name'=> $roleName]);
            if($res){
                $role = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
                $role_id = $role->result()[0]->id;
                $data = [];
                foreach($right as $k=>$v){
                    $data[] = ["role_id"=>$role_id,"right_id"=>$v];
                }
                $ret = $this->CI->db->insert_batch('index_role_rights',$data);
                if($ret){
                    return [
                        "errNum"  => 0,
                        "retMsg"  => "添加成功",
                        "retData" => []
                    ];
                }
            }
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "职位已存在"
            ];
        }
    }

    public function get_role_list()
    {
        // 查看数据库中是否有角色
        $role = $this->CI->db->get('data_admin_roles');
        if($role->result()){
            return [
                "errNum"  => 0,
                "retMsg"  => "请求成功",
                "retData" => [
                    "list" => $role->result()
                ]
            ];
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "当前没有添加职位"
            ];
        }
    }


    public function get_role_delete($id)
    {
        // 如果职位已经被管理员使用,不可删除
        $user_roles = $this->CI->db->get_where('index_user_roles',['role_id' => $id]);
        if($user_roles->result()){
            return [
                "errNum" => 2,
                "errMsg" => "当前职位已被管理员使用,不可删除"
            ];
        }
        // 删除对应id的角色,同时删除职位对应权限
        $role_rights = $this->CI->db->get_where('index_role_rights',['role_id' => $id]);
        if($role_rights->result()){
            $index_row = $this->CI->db->delete('index_role_rights',['role_id' => $id]);
        }
        $role_row = $this->CI->db->delete('data_admin_roles',['id' => $id]);
        if(($role_rights && $index_row) || $role_row){
            return [
                "errNum"  => 0,
                "retMsg"  => "删除成功",
                "retData" => []
            ];
        }else{
            return [
                "errNum" => 3,
                "errMsg" => "删除失败"
            ];
        }
    }

    public function get_right(){
        // 查看数据库中是否有权限
        $right = $this->CI->db->get('data_admin_rights');
        if($right->result()){
            return [
                "errNum"  => 0,
                "retMsg"  => "请求成功",
                "retData" => [
                    "list" => $right->result()
                ]
            ];
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "权限还未注册"
            ];
        }
    }

    public function get_role_update($id,$roleName,$right)
    {
        // 查看数据库中是否有这个角色
        $role = $this->CI->db->get_where('data_admin_roles',['id'=>$id]);
        if($role->result()){
            // 查看数据库中是否有这个角色
            $role_data = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
            if(!$role_data->result()){
                // 修改角色名称
                $this->CI->db->where('id', $id);
                $res = $this->CI->db->update('data_admin_roles',['role_name'=>$roleName]);
                $index_row = $this->CI->db->delete('index_role_rights',['role_id' => $id]);
                if(($res && $index_row)||$res){
                    $data = [];
                    foreach($right as $k=>$v){
                        $data[] = ["role_id"=>$id,"right_id"=>$v];
                    }
                    $ret = $this->CI->db->insert_batch('index_role_rights',$data);
                    if($ret){
                        return [
                            "errNum"  => 0,
                            "retMsg"  => "修改成功",
                            "retData" => []
                        ];
                    }
                }else{
                    return [
                        "errNum" => 4,
                        "errMsg" => "修改失败"
                    ];
                }
            }else{
                return [
                    "errNum" => 3,
                    "errMsg" => "职位已存在"
                ];
            }
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "要删除角色不存在"
            ];
        }
    }
}