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

    public function set_role_exist($roleName)
    {
        // 查看数据库中是否有这个角色
        $role = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
        if(!$role->result()){
            $res = $this->CI->db->insert('data_admin_roles',['role_name'=> $roleName]);
            if($res){
                return [
                    "errNum"  => 0,
                    "retMsg"  => "添加成功",
                    "retData" => []
                ];
            }
        }else{
            return [
                "errNum" => 1,
                "errMsg" => "职位已存在"
            ];
        }
    }
}