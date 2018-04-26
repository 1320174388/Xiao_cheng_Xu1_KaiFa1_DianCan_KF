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
        $this->load->helper('uploads');
        if(!(is_admin_user() || is_system_admin())){
            return return_response( 1, '对不起,您不是管理员身份');
        }
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
        if( count( $post ) <= 0 ){
            return return_response( '0', '参数错误', [] );
        }

        $result = $this->M_Shop->create( $post );

        if( $result ){
            return return_response( '1', '添加成功', $result );
        }else{
            return return_response( '0', '添加失败', $result );
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

        if( count( $post ) <= 1 ){
            return return_response( '1', '参数错误', [] );
        }

        // 处理上传图片,获取图片url地址信息
        if($post['food_img_true']){
            $food_img_url = upload_create('shops','shop_img');
            if($food_img_url) {
                $post['shop_img'] = $food_img_url;
            }
        }
        // 处理菜品数据
        unset($post['token']);
        $result = $this->M_Shop->update( $post );

        if( $result ){
            return return_response( '0', '修改成功', $result );
        }else{
            return return_response( '2', '修改失败', $result );
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
            return return_response( '0', '参数错误', [] );
        }
        $result = $this->M_Shop->create_table( $post );

        if( $result ){
            return return_response( '1', '添加成功', $result );
        }else{
            return return_response( '0', '添加失败', $result );
        }
    }

    /**
     * 获取座号
     *
     * @access public
     * @return array 中返回是否请求成功
     */
    public function get_tables(){

        $result = $this->M_Shop->get_table_list();
        if( $result ){
            return return_response( 0, '请求成功', $result );
        }else{
            return return_response( 2, '请求失败', $result );
        }
    }


}