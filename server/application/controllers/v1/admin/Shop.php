<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/4/16
 * Time: 21:53
 */
class Shop extends LoginController{

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/M_Shop');
        $this->load->helper('uploads');
        $this->load->helper('deletedir');
        $this->load->helper('phpqrcode');
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
        $ret = $this->M_Shop->get_shop_img();
        return return_response( '1', '请求成功',['shop'=>$res,'img_url'=>$ret] );
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

        unset($post['token']);

        $result = $this->M_Shop->update( $post );

        if( $result ){
            return return_response( '0', '修改成功', $result );
        }else{
            return return_response( '2', '修改失败', $result );
        }
    }

    /**
     * 更新店铺信息
     *
     * @access public
     * @param string $shop_img 店铺图片
     * @return array 中返回是否修改成功
     */
    public function create_img(){

        $img_num = $this->input->post('img_num');

        if($img_num == 1){

            deldir('./uploads/shops');

            $this->M_Shop->delete_img();

        }

        $food_img_url = upload_create('shops','shop_img');

        if($food_img_url){

            $res = $this->M_Shop->create_img( $food_img_url );

            if($res){
                return return_response( 0, '上传成功');
            }else{
                return return_response( 2, '上传失败');
            }

        }else{
            return return_response( 1, '请正确上传图片');
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
            return return_response( 1, '参数错误', [] );
        }

        $res  =  $this->M_Shop->find_table( $post['table_number'] );

        if($res){
            return return_response( 2, '座号已存在' );
        }

        $result = $this->M_Shop->create_table( $post );

        if( $result ){
            return return_response( 0, '添加成功', $result );
        }else{
            return return_response( 3, '添加失败', $result );
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

    /**
     * 修改座号
     *
     * @access public
     * @param int table_id 桌号
     * @param int table_number 桌号
     * @return array 中返回是否修改成功
     */
    public function set_tables(){

        $post = $this->input->post();

        if(!$post['table_id']) return return_response( 2, '没有发送座号ID');

        if(!$post['table_number']) return return_response( 3, '请填写座号');

        $result = $this->M_Shop->update_table( $post );

        if($result){
            return return_response( 0, '修改成功');
        } else {
            return return_response( 4, '修改失败');
        }

    }

    /**
     * 删除座号
     *
     * @access public
     * @param int table_id 桌号
     * @return array 中返回是否修改成功
     */
    public function remove_tables(){

        $post = $this->input->post();

        if(!$post['table_id']) return return_response( 2, '没有发送座号ID');

        $result = $this->M_Shop->delete_table( $post['table_id'] );

        if($result){
            return return_response( 0, '删除成功');
        } else {
            return return_response( 3, '删除失败');
        }

    }

    /**
     * 生成座号二维码
     *
     * @access public
     * @param int table_number 桌号
     * @return array 中返回是否修改成功
     */
    public function table_number_img(){

        $post = $this->input->post();

        $table_number_info = $post['table_number'];

        $number = mt_rand(100000,999999);
        $date = date(time());
        $fileName = md5($number.$date);

        $table_number_urls = './uploads/table_number_img/'.$fileName.'.png';

        deldir('./uploads/table_number_img');

        QRcode::png($table_number_info,$table_number_urls,'QR_ECLEVEL_Q',6,2);

        $table_number_url = ltrim($table_number_urls,'.');

        return return_response( 0, '请求成功',['img'=>$table_number_url]);

    }


}