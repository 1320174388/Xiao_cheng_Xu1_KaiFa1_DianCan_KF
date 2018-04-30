<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/20
 * Time: 23:37
 */

class M_Order extends CI_Model{

    const EAT_ORDER_TYPE = 'eat';
    const OUT_ORDER_TYPE = 'out';
    const HISTORY_ORDER_TYPE = 'history';

    public function __construct()
    {
        parent::__construct();

        $this->connection = $this->load->database( 'default', true );
    }

    public function find_all( $order_type = '',$order_status){
        $sql = "select * from data_orders ";
        $where = " where ";
        $order_types = " order_type = '".$order_type."' and ";
        $order_statusss = " order_status = ".$order_status;
        $order_by = " order by order_time desc ";
        $sql .= $where;
        if($order_type) {
            $sql .= $order_types;
        }
        $sql .= $order_statusss;
        $sql .= $order_by;
        $result = $this->connection->query( $sql );

        return $result->result();
    }

    public function update( $data ){

        $sql = 'update data_orders set ';
        $end_sql = ' where order_number =  '. (int) $data['id'];
        $set_sql = '';

        if( isset( $data['table_id'] ) ){
            $set_sql = ' table_id = "'. $data['table_id'] .'"';
        }
        if( isset( $data['order_addr'] ) ){
            $set_sql = ' order_addr = "'. $data['order_addr'] .'"';
        }

        $query_sql = $sql . $set_sql . $end_sql;

        $result = $this->connection->query( $query_sql );

        return $result;
    }

    public function find_order( $order_number ){
        $sql = 'select o.order_number, o.food_id, f.food_name, f.food_img, o. food_number, o.order_price 
                from data_order_details o LEFT JOIN data_admin_foods f ON f.id = o.food_id 
                where o.order_number = '. $order_number;

        $result = $this->connection->query( $sql );

        return $result->result();
    }
}