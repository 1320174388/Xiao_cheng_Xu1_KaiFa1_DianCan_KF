<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/16
 * Time: 22:14
 */



class M_Shop extends CI_Model{
    const UNIQUE_VALUE = 1;
    private $connection;

    public function __construct() {
        parent::__construct();

        $this->connection = $this->load->database('default',true);
    }

    public function get_shop_info(){
        $sql = 'select id, shop_name, shop_img, shop_info, shop_addr, shop_phone, shop_status, ordering_status from data_admin_shop limit 1';
        $result = $this->connection->query( $sql );
        return $result->result();
    }

    public function create( $data ){

        $insert_clause = 'insert into data_admin_shop( ';
        $value_clause = ' ) values( ';
        $end_clause = ' )';

        $insert_list = [];
        $vaue_list = [];
        if( isset( $data['shop_name'] ) ){
            $insert_list[] = ' shop_name ';
            $vaue_list[] = $data['shop_name'];
        }
        if( isset( $data['shop_img'] ) ){
            $insert_list[] = ' shop_img ';
            $vaue_list[] = $data['shop_img'];
        }
        if( isset( $data['shop_info'] ) ){
            $insert_list[] = ' shop_info ';
            $vaue_list[] = $data['shop_info'];
        }
        if( isset( $data['shop_addr'] ) ){
            $insert_list[] = ' shop_addr ';
            $vaue_list[] = $data['shop_addr'];
        }
        if( isset( $data['shop_phone'] ) ){
            $insert_list[] = ' shop_phone ';
            $vaue_list[] = (int) $data['shop_phone'];
        }
        if( isset( $data['shop_status'] ) ){
            $insert_list[] = ' shop_status ';
            $vaue_list[] = (int) $data['shop_status'];
        }
        if( isset( $data['ordering_status'] ) ){
            $insert_list[] = ' ordering_status ';
            $vaue_list[] = (int) $data['ordering_status'];
        }

        if( count( $insert_list ) < 0 ){
            return false;
        }

        $insert_str = implode( ',', $insert_list );
        $vaue_str = implode( ',', $vaue_list );
        $query_sql = $insert_clause . $insert_str . $value_clause . $vaue_str . $end_clause;

        $result = $this->connection->query( $query_sql );

        return $result;
    }

    public function update( $data ){

        $sql = 'update data_admin_shop set ';

        $update_clause = [];
//        if( isset( $data['id'] ) || !is_numeric( $data['id'] ) ){
        if( isset( $data['id'] ) ){
            $end_sql = ' where id =  '. (int) $data['id'];
        }else{
            $end_sql = ' where id =  '. (int) self::UNIQUE_VALUE;
        }
        if( isset( $data['shop_name'] ) ){
            $update_clause[] = ' shop_name = "'. $data['shop_name'] .'"';
        }
        if( isset( $data['shop_img'] ) ){
            $update_clause[] = ' shop_img = "'. $data['shop_img'] .'"';
        }
        if( isset( $data['shop_info'] ) ){
            $update_clause[] = ' shop_info = "'. $data['shop_info'] .'"';
        }
        if( isset( $data['shop_addr'] ) ){
            $update_clause[] = ' shop_addr = "'. $data['shop_addr'] .'"';
        }
        if( isset( $data['shop_phone'] ) ){
            $update_clause[] = ' shop_phone = '. (int) $data['shop_phone'];
        }
        if( isset( $data['shop_status'] ) ){
            $update_clause[] = ' shop_status = '. (int) $data['shop_status'];
        }
        if( isset( $data['ordering_status'] ) ){
            $update_clause[] = ' ordering_status = '. (int) $data['ordering_status'];
        }

        if( count( $update_clause ) < 0 ){
            return false;
        }

        $set_sql = implode( ',', $update_clause );
        $query_sql = $sql . $set_sql . $end_sql;

        $result = $this->connection->query( $query_sql );

        return $result;
    }

    public function create_table($data){

        $insert_clause = 'insert into data_admin_tables( ';
        $value_clause = ' ) values( ';
        $end_clause = ' )';

        if( isset( $data['table_number'] ) ){
            $insert_clause .= ' table_number ';
            $value_clause .= $data['table_number'];
        }else{
            return false;
        }

        $query_sql = $insert_clause . $value_clause . $end_clause;

        $result = $this->connection->query( $query_sql );

        return $result;
    }

    public function get_table_list(){

        $query_sql = 'select id,table_number from data_admin_tables ';

        $result = $this->connection->query( $query_sql );

        return $result->result();
    }

    public function find_table($table_number){

        $query_sql = 'select id,table_number from data_admin_tables where table_number = '.$table_number;

        $result = $this->connection->query( $query_sql );

        return $result->result()[0];
    }

}