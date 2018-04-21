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

    public function find_all( $order_type ){
        $sql = ' select id, order_number, order_type, order_status, order_remarks, order_time ';
        $end_sql = " from data_orders where order_type = '" . $order_type . "' order by order_time desc ";
        if( $order_type == self::EAT_ORDER_TYPE ){
            $sql .= ' ,table_id ';
        }
        if( $order_type == self::OUT_ORDER_TYPE || empty( $order_type ) ) ){
            $sql .= ' ,user_id ';
        }

        $sql .= $end_sql;

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

    public function find_order( $order_id ){
        $sql = 'select o.order_id, o.food_id, f.food_name, o. food_number, o.order_price 
                from data_order_details o LEFT JOIN data_admin_foods f ON f.id = o.food_id 
                where o.order_id = '. (int) $order_id;

        $result = $this->connection->query( $sql );

        return $result->result();
    }
}