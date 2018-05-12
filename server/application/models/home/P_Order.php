<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/30 0030
 * Time: 15:17
 */
class P_Order extends CI_Model
{
    public function get_openid_id($openid)
    {
        return $this->db->get_where('data_home_users', ['open_id'=>$openid])->result()[0]->id;
    }

    public function create_order($post,$order = [])
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

        if($post['order_number']){
            $order['order_number'] = $post['order_number'];
        }

        $order['user_id'] = $post['user_id'];

        $order['order_status'] = 1;

        if($post['order_remarks']){
            $order['order_remarks']  = $post['order_remarks'];
        }

        $order['order_time'] = date('Ymd H:i',time());

        $this->db->trans_start();

        $res = $this->db->insert('data_orders', $order);

        $ret = $this->db->insert_batch('data_order_details',$post['food_list']);

        $this->db->trans_complete();

        if($res && $ret){
            return $order['order_number'];
        }else{
            return false;
        }

    }
}