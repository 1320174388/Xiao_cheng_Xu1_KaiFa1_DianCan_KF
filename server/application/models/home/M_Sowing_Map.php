<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/3 0003
 * Time: 10:45
 */
class M_Sowing_Map extends CI_Model
{
    public function select_sowing_list()
    {
        $query_sql = 'select * from data_shop_imgs';

        return $this->db->query($query_sql)->result();
    }
}