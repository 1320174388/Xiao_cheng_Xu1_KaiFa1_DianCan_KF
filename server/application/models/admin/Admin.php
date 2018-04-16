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

    public function get_admin_roles()
    {
        // 获取所有管理职位信息
        $role_data = $this->CI->db->get('data_admin_roles');
        if($role_data->result()){
            return [
                "errNum"  => 0,
                "retMsg"  => "请求成功",
                "retData" => [
                    "list" => $role_data->result()
                ]
            ];
        }else{
            return [
                "errNum" => 2,
                "errMsg" => "当前还没有管理职位"
            ];
        }
    }

    public function set_admin_user($user_id,$admin_name,$role_id)
    {
        // 判断user_id对应用户是否存在
        $home_user = $this->CI->db->get_where('data_home_users',['id'=>$user_id]);
        if($home_user->result()){
            // 判断管理员名称是否已经存在
            $admin_user = $this->CI->db->get_where('data_admin_users',['admin_name'=>$admin_name]);
            if(!$admin_user->result()){
                // 添加数据库
                $date = date('Y-m-d H:i:s',time());
                $res = $this->CI->db->insert('data_admin_users',[
                    'user_id'     => $user_id,
                    'admin_name'  => $admin_name,
                    'create_time' => $date,
                    'update_time' => $date
                ]);
                if($res){
                    $admin_user1 = $this->CI->db->get_where('data_admin_users',['admin_name'=>$admin_name]);
                    $ret = $this->CI->db->insert('index_user_roles',[
                        'admin_id'     => $admin_user1->result()[0]->id,
                        'role_id'  => $admin_name,
                    ]);
                    if($ret){
                        return [
                            "errNum"  => 0,
                            "retMsg"  => "添加成功",
                            "retData" => []
                        ];
                    }else{
                        return [
                            "errNum" => 7,
                            "errMsg" => "管理员职位绑定失败"
                        ];
                    }
                }else{
                    return [
                        "errNum" => 6,
                        "errMsg" => "管理员添加失败"
                    ];
                }
            }else{
                return [
                    "errNum" => 5,
                    "errMsg" => "管理员名称已存在"
                ];
            }
        }else{
            return [
                "errNum" => 4,
                "errMsg" => "用户不存在"
            ];
        }
    }
}