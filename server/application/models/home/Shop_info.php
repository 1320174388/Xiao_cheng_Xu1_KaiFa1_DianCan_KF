<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/5 0005
 * Time: 14:13
 */
class Shop_info extends CI_Model
{
    public function select_shop_addr()
    {
        $sql = 'select shop_addr from data_admin_shop where id = 1';
        return $this->db->query($sql)->result()[0];
    }
}