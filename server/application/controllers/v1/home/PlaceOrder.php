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
     * 提交订单
     *
     * @success publid
     * @param string token 用户令牌
     * @param string order_type #take取餐/eat就餐/out外卖
     * @param int table_id 座号ID
     * @param string order_addr 用户地址
     * @param string take_time 取餐时间
     * @param string order_remarks 备注
     * @param array food_list_id ['菜品ID']
     * @param array food_list_num ['菜品数量']
     * @param array food_list_price ['菜品价格']
     * @param string order_price '菜品总价格'
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

        if((!$post['food_list_id'])&&(!$post['food_list_num']&&(!$post['food_list_price'])) ){
            return return_response( 4, '菜品信息完整');
        }

        $post['user_id'] = $this->cache->file->get($post['token'])['user_id'];

        $post['food_list_id']    = explode(',',$post['food_list_id']);
        $post['food_list_num']   = explode(',',$post['food_list_num']);
        $post['food_list_price'] = explode(',',$post['food_list_price']);

        $post['order_number'] = $this->get_out_trade_no();

        $post['food_list'] = $this->order_info_array($post['order_number'],$post['food_list_id'],$post['food_list_num'],$post['food_list_price']);

        unset($post['token']);
        unset($post['food_list_id']);
        unset($post['food_list_num']);
        unset($post['food_list_price']);

        if($this->cache->file->get($post['user_id'])){
            $orders_info = $this->cache->file->get($post['user_id']);
            $orders_info[$post['order_number']] = $post;
            $res = $this->cache->file->save($post['user_id'],$orders_info,60*60*24);
        }else{
            $res = $this->cache->file->save($post['user_id'],[$post['order_number']=>$post],7200);
        }

        if($res){
            return return_response( 0, '提交成功',$post['order_number']);
        }else{
            return return_response( 5, '提交失败');
        }

    }

    /**
     * 请求微信支付预订单接口
     * @param string order_number 订单号
     */
    public function WeChat_payment()
    {
        // 获取用户唯一标识ID
        $openid =  get_token_values('openid');
        // 获取订单号
        $order_number = $this->input->post('order_number');

        $res = $this->paymentclass->prepay($openid,$order_number);

        return $res;
    }

    /**
     * 进行支付接口(POST)
     */
    public function WxChat_pay()
    {
        $res = $this->paymentclass->pay();
        return return_response( 0, '请求成功',$res);
    }

    /**
     * 微信支付回调函数
     */
    public function WxChat_notify()
    {
        $xml = file_get_contents("php://input");

        $result = $this->paymentclass->notify($xml);

        // 返回状态给微信服务器
        if ($result) {
            //获取服务器返回的数据
            $order_sn  = $result['out_trade_no'];		//订单单号
            $openid    = $result['openid'];				//付款人openID
            $total_fee = $result['total_fee'];			//付款金额

            // 获取数据库用户id
            $id = $this->P_Order->get_openid_id($openid);

            // 获取缓存内订单数据
            $res = $this->cache->file->get($id)[$order_sn];

            // 更新数据库
            $this->P_Order->create_order($res);

            $str='<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
        }else{
            $str='<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名失败]]></return_msg></xml>';
        }
        echo $str;
        return false;
    }

    /**
     * 生成商户订单号
     */
    protected function get_out_trade_no() {
        return date('YmdHis',time()).mt_rand(100000000,999999999);
    }

    /**
     * 处理订单信息
     */
    protected function order_info_array($order_number,$array_id,$array_num,$array_price)
    {
        $food_list = [];
        $i = 0;
        foreach($array_id as $v){
            $food_list[] = [
                'order_number' => $order_number,
                'food_id'      => $array_id[$i],
                'food_number'  => $array_num[$i],
                'order_price'  => $array_price[$i],
            ];
            $i++;
        }
        return $food_list;
    }

}