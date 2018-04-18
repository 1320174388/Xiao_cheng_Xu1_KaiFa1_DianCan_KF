<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/16
 * Time: 21:53
 */

class Shop extends CI_Controller{

    public function __construct(){
        parent::__construct();

        $this->load->model('admin/M_Shop');
    }

    /**
     * 获取店铺详细信息
     *
     * @access public
     * @param mixed NULL
     * @return array 返回店铺信息数组
     */
    public function get_shop_info(){
        $res = $this->M_Shop->get_shop_info();

        return_response( '1', '请求成功', $res );
    }

    /**
     * 添加店铺信息
     *
     * @access public
     * @param string $shop_name 店铺名称
     * @param string $shop_img 店铺图片
     * @param string $shop_info 店铺信息
     * @param string $shop_addr 店铺地址
     * @param int $shop_status 店铺状态
     * @param int $ordering_status 店铺接单状态
     * @return array 中返回是否修改成功
     */
    public function add_info(){
        $post = $this->input->post();
        if( count( $post ) < 0 ){
            return_response( '0', '参数错误', NULL );
        }

        $result = $this->M_Shop->create( $post );

        if( $result ){
            return_response( '1', '修改成功', $result );
        }else{
            return_response( '0', '修改失败', $result );
        }
    }

    /**
     * 更新店铺信息
     *
     * @access public
     * @param int $id 店铺ID
     * @param string $shop_name 店铺名称
     * @param string $shop_img 店铺图片
     * @param string $shop_info 店铺信息
     * @param string $shop_addr 店铺地址
     * @param int $shop_status 店铺状态
     * @param int $ordering_status 店铺接单状态
     * @return array 中返回是否修改成功
     */
    public function update_info(){
        $post = $this->input->post();
        if( count( $post ) < 0 ){
            return_response( '0', '缺少参数', NULL );
        }

        $result = $this->M_Shop->update( $post );

        if( $result ){
            return_response( '1', '修改成功', $result );
        }else{
            return_response( '0', '修改失败', $result );
        }
    }

    /**
     * 添加桌号
     *
     * @access public
     * @param int table_number 桌号
     * @return array 中返回是否修改成功
     */
    public function add_table(){
        $post = $this->input->post();
        if( count( $post ) < 0 ){
            return_response( '0', '缺少参数', NULL );
        }

        $result = $this->M_Shop->create_table( $post );

        if( $result ){
            return_response( '1', '添加成功', $result );
        }else{
            return_response( '0', '添加失败', $result );
        }
    }


}