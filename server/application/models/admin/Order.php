<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/20
 * Time: 23:33
 */

class Order extends CI_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('admin/M_Order');
    }

    /**
     * 订单列表
     *
     * @access public
     * @param string $order_type 订单类型
     * @return array 返回订单列表数组
     */
        public function get_order_list_by_type(){
        $order_type = $this->input->post( 'order_type' );
        if( !isset( $order_type )){
            $this->json( [ "errNum" => 0, "retMsg"  => '参数错误', "retData" => [] ] );
            return ;
        }

        $result = $this->M_Order->find_all( $order_type );

        return_response( '1', '请求成功', $result );
    }

    /**
     *  订单修改
     *
     * @access public
     * @param string $id 订单号
     * @param string $order_addr 地址
     * @param int $table_id 桌号
     * @return array 返回修改结果
     */
    public function update_order_info(){
        $post = $this->input->post();
        if( count( $post ) < 1 || !isset( $post['id'] ) ){
            return return_response( '0', '参数错误', [] );
        }

        $result = $this->M_Order->update( $post );

        if( $result ){
            return return_response( '1', '修改成功', [] );
        }else{
            return return_response( '0', '修改失败', [] );
        }

    }

    /**
     * 订单详情
     *
     * @access public
     * @param string $order_number 订单号
     * @return array 返回订单详情数组
     */
    public function get_order_info_by_id(){
        $order_number = $this->input->post( 'order_number' );
        if( !isset( $order_number )){
            $this->json( [ "errNum" => 0, "retMsg"  => '参数错误', "retData" => [] ] );
            return ;
        }

        $result = $this->M_Order->find_order( $order_number );

        return_response( '1', '请求成功', $result );
    }

}