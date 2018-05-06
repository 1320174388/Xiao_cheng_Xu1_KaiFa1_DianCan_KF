<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/5 0005
 * Time: 18:15
 */
class Paymentclass
{
    private $CI;

    private $config;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->library('configclass');

        $config = [
            'appid'     => $this->CI->configclass->wxAppID,
            'mch_id'    => $this->CI->configclass->mch_id,
        ];
        $this->config = $config;
    }

    /**
     * 预支付请求接口(POST)
     * @param string $openid 	openid
     * @param string $body 		商品简单描述
     * @param string $order_sn  订单编号
     * @param string $total_fee 金额
     * @return  json的数据
     */
    public function prepay()
    {
        $config = $this->config;

        $body = $this->CI->input->post('body');

        $total_fee = $this->CI->input->post('total_fee');

        //统一下单参数构造
        $unifiedorder = [
            'appid'        => $config['appid'],
            'mch_id'       => $config['mch_id'],
            'nonce_str'    => self::getNonceStr(),
            'body'         => $body,
            'out_trade_no' => self::get_out_trade_no(),
            'total_fee'    => $total_fee
        ];
        $unifiedorder['sign'] = '等等在写';

        return $total_fee;
    }

    /**
     * 生成随机字符串，不长于32位
     */
    protected static function getNonceStr($length = 32) {
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str ="";
        for ( $i = 0; $i < $length; $i++ )  {
            $str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);
        }
        return $str;
    }

    /**
     * 生成商户订单号
     */
    protected static function get_out_trade_no() {
        return date('YmdHis',time()).mt_rand(100000000,999999999);
    }
}