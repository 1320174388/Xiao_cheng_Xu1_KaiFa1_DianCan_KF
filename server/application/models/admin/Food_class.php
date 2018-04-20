<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 14:23
 */
class Food_class extends CI_Model{

    /**
     *  获取所有食品分类信息
     */
    public function get_food_class()
    {
        $res = $this->db->query('SELECT id,class_name,class_sort FROM data_food_class ORDER BY class_sort');
        return $res->result();
    }
    /**
     *  添加食品分类
     */
    public function set_food_class($class_name,$class_sort)
    {
        return $this->db->insert('data_food_class',[
            'class_name'  => $class_name,
            'class_sort'  => $class_sort,
            'create_time' => date('Y-m-d H:i:s',time())
        ]);
    }
    /**
     *  查找食品分类名称
     */
    public function get_class_name($class_name)
    {
        return $this->db->get_where('data_food_class',[
            'class_name'  => $class_name
        ])->result()[0];
    }
    /**
     *  修改分类名很排序
     */
    public function set_class_update($class_id,$class_name,$class_sort)
    {
        $this->db->where('id', $class_id);
        return $this->db->update('data_food_class',[
            'class_name'  => $class_name,
            'class_sort'  => $class_sort
        ]);
    }
    /**
     *  修改分类名很排序
     */
    public function delete_food_class($class_id)
    {
        return $this->db->delete('data_food_class',['id' => $class_id ]);
    }
}