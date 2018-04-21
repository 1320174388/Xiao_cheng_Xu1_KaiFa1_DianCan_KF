<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 17:52
 */
class Foods extends CI_Model{
    /**
     * 获取分类下食品
     */
    public function get_class_foods($class_id)
    {
        return $this->db->get_where('data_admin_foods',['class_id'=>$class_id])->result()[0];
    }
    /**
     * 获取食品列表信息
     */
    public function get_food_lists($food_name = '')
    {
        $select = 'select id,food_name,class_id,food_img,food_price,food_sort,food_info ';
        $from   = 'from data_admin_foods ';
        $where  = 'like "%'.$food_name.'%" ';
        $order  = 'order by food_sort';
        if($food_name){
            return $this->db->query($select.$from.$where.$order)->result();
        }else{
            return $this->db->query($select.$from.$order)->result();
        }
    }
    /**
     * 执行添加菜品
     */
    public function set_food_create($foods)
    {
        return $this->db->insert('data_admin_foods',$foods);
    }
    /**
     * 执行修改菜品操作
     */
    public function set_food_update($foods)
    {
        $this->db->where('id', $foods['id']);
        unset($foods['id']);
        return $this->db->update('data_admin_foods', $foods);
    }
    /**
     * 查找食品
     */
    public function get_food_name($foods_name)
    {
        $res = $this->db->get_where('data_admin_foods',['food_name'=>$foods_name]);
        if($res->result()){ return $res->result()[0]; }else{ return false; }
    }
    /**
     * ID查找菜品
     */
    public function get_food_data($id)
    {
        $res = $this->db->get_where('data_admin_foods',['id'=>$id]);
        if($res->result()){ return $res->result()[0]; }else{ return false; }
    }
    /**
     * 删除菜品
     */
    public function get_food_delete($id)
    {
        return $this->db->delete('data_admin_foods',['id'=>$id]);
    }
}