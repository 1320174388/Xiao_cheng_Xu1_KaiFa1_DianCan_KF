<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/30 0030
 * Time: 14:01
 */
class PlaceOrder extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home/P_Order');
        $this->load->driver('cache');
        $this->load->library('paymentclass');
    }

    /**
     * 微信支付测试接口
     */
    public function WeChat_payment()
    {
        // 获取用户唯一标识ID
        $openid =  get_token_values('openid');
        //
        $res = $this->paymentclass->prepay($openid);

        return $this->json($res);
    }

    /**
     * 提交订单
     *
     * @success publid
     * @param string token 用户令牌
     * @param string order_type #take取餐/eat就餐/out外卖
     * @param int table_id 座号ID
     * @param string order_addr 用户地址
     * @param string take_time 取餐时间
     * @param string order_remarks 备注
     * @param array food_list [
     *           'food_id'=>'菜品ID',
     *           'food_number'=>'菜品数量',
     *           'order_price'=>'菜品总价格'
     *        ] 菜品信息数组
     */
    public function submit_order()
    {
        $post = $this->input->post();

        if(!$this->cache->file->get($post['token'])){
            return return_response( 1, '没有用户信息');
        }

        if((!$post['order_type'])||!($post['order_type']=='take'||$post['order_type']=='eat'||$post['order_type']=='out')){
            return return_response( 2, '不确定订单类型');
        }

        if($post['order_type'] == 'take'){
            if(!$post['take_time']){
                return return_response( 3, '请填写取餐时间');
            }
        }

        if($post['order_type'] == 'eat'){
            if(!$post['table_id']){
                return return_response( 3, '请扫描座号');
            }
        }

        if($post['order_type'] == 'out'){
            if(!$post['order_addr']){
                return return_response( 3, '请选择地址');
            }
        }

        if(!$post['food_list']){
            return return_response( 4, '没有购买商品信息');
        }

        $post['user_id'] = $this->cache->file->get($post['token'])['user_id'];

        $res = $this->P_Order->create_order($post);

        if($res){
            return return_response( 0, '提交成功');
        }else{
            return return_response( 5, '提交失败');
        }

    }

}