<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/30 0030
 * Time: 15:17
 */
class P_Order extends CI_Model
{
    public function create_order($post,$order = [],$order_detail = [])
    {
        if($post['order_type']){
            $order['order_type'] = $post['order_type'];
        }

        if($post['order_type'] == 'take'){
            $order['take_time'] = $post['take_time'];
        }

        if($post['order_type'] == 'eat'){
            $order['table_id'] = $post['table_id'];
        }

        if($post['order_type'] == 'out'){
            $order['order_addr'] = $post['order_addr'];
        }

        $number = mt_rand(1000,9999);
        $date = date(time());

        $order['order_number'] = $date.$number;

        $order['user_id'] = $post['user_id'];

        $order['order_status'] = 1;

        if($post['order_remarks']){
            $order['order_remarks']  = $post['order_remarks'];
        }

        $order['order_time'] = date('Ymd H:i',time());

        $this->db->trans_start();

        $res = $this->db->insert('data_orders', $order);

        $num = 1;
        foreach($post['food_list'] as $k=>$v){
            $order_detail[$num] = array_merge(['order_number'=>$order['order_number']],$v);
            $num++;
        }

        $ret = $this->db->insert_batch('data_order_details',$order_detail);

        $this->db->trans_complete();

        if($res && $ret){
            return true;
        }else{
            return false;
        }

    }
}