<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/1 0001
 * Time: 10:39
 */
class Food_list extends CI_Model
{
    public function select_food_class_list()
    {
        $sql = 'select id,class_name from data_food_class order by class_sort asc';

        return $this->db->query($sql)->result();
    }

    public function select_class_food_list($class_id)
    {
        $sql = 'select id,food_name,class_id,food_img,food_price,food_info from data_admin_foods where class_id = '.$class_id;

        return $this->db->query($sql)->result();
    }
}