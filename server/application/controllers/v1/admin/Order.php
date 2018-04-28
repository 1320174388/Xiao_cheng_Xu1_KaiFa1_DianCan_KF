<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/20
 * Time: 23:33
 */
class Order extends LoginController {

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/M_Order');
        $this->load->library('validateclass');
        if( !(is_admin_user() || is_system_admin()) ){
            return return_response( 1, '对不起,您不是管理员身份');
        }
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
        $order_status = $this->input->post( 'order_status' );

        $result = $this->M_Order->find_all( $order_type , $order_status);

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
            return return_response( 1, '参数错误', [] );
        }

        if($post['table_id']){
            $var = $this->validateclass->validator($post['table_id'],'int');
            if(!$var){
                return return_response( 2, '请正确填写座号');
            }
        }

        $result = $this->M_Order->update( $post );

        if( $result ){
            return return_response( 0, '修改成功', [] );
        }else{
            return return_response( 3, '修改失败', [] );
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
        $num   = 0;
        $print = 0;
        foreach($result as $k=>$v){
            $num   += $v->food_number;
            $print += $v->order_price;
        }
        return_response( '1', '请求成功', [
            'order_info'  => $result,
            'order_num'   => $num,
            'order_print' => $print
        ] );
    }

}