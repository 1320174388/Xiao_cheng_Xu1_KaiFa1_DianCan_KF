<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16 0016
 * Time: 18:29
 */
class Admin extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function get_admin_user()
    {
        // 获取所有管理原信息
        $this->CI->db->select('data_admin_users.id,data_admin_users.admin_name,data_admin_roles.role_name');
        $this->CI->db->from('data_admin_users');
        $this->CI->db->join('index_user_roles', 'data_admin_users.id = index_user_roles.admin_id');
        $this->CI->db->join('data_admin_roles', 'index_user_roles.role_id = data_admin_roles.id');
        $admin_data = $this->CI->db->get();
        if($admin_data->result()){
            return [
                "errNum"  => 0,
                "retMsg"  => "请求成功",
                "retData" => [
                    "list" => $admin_data->result()
                ]
            ];
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "当前没有添加管理员"
            ];
        }
    }
}