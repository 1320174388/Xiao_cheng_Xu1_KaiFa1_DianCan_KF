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
            'appid'      => $this->CI->configclass->wxAppID,
            'mch_id'     => $this->CI->configclass->mch_id,
            'pay_apikey' => $this->CI->configclass->wxZhiFuMiYao
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
    public function prepay($openid)
    {
        $config = $this->config;

        $body = $this->CI->input->post('body');

        $total_fee = $this->CI->input->post('total_fee');

        $key = $this->config['pay_apikey'];

        //统一下单参数构造
        $unifiedorder = [
            'appid'            => $config['appid'],
            'mch_id'           => $config['mch_id'],
            'nonce_str'        => self::getNonceStr(),
            'body'             => $body,
            'out_trade_no'     => self::get_out_trade_no(),
            'total_fee'        => $total_fee,
            'spbill_create_ip' => self::GetIP(),
            'notify_url'       => 'https://'.$_SERVER['HTTP_HOST'].'/api/home/placeOrder/submit_order',
            'trade_type'       => 'JSAPI',
            'openid'           => $openid
        ];
        $unifiedorder['sign'] = self::makeSign($unifiedorder,$key);

        $xmlData = self::arrayXml($unifiedorder);
        $url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        $res = self::curl_post_ssl($url, $xmlData);
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

    /**
     * 获取IP地址
     */
    public static function GetIP()
    {
        if(!empty($_SERVER["HTTP_CLIENT_IP"]))
            $cip = $_SERVER["HTTP_CLIENT_IP"];
        else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
            $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        else if(!empty($_SERVER["REMOTE_ADDR"]))
            $cip = $_SERVER["REMOTE_ADDR"];
        else
            $cip = "无法获取！";
        return $cip;
    }

    /**
     * 生成签名
     */
    public static function makeSign($data,$key)
    {
        // 去空
        $data=array_filter($data);
        //签名步骤一：按字典序排序参数
        ksort($data);
        $string_a = http_build_query($data);
        $string_a = urldecode($string_a);
        //签名步骤二：在string后加入KEY
        $string_sign_temp=$string_a."&key=".$key;
        //签名步骤三：MD5加密
        $sign = md5($string_sign_temp);
        // 签名步骤四：所有字符转为大写
        $result=strtoupper($sign);
        return $result;
    }

    /**
     * 将一个数组转换为 XML 结构的字符串
     */
    public static function arrayXml($arr, $level = 1)
    {
        $s = $level == 1 ? "<xml>" : '';
        foreach($arr as $tagname => $value) {
            if (is_numeric($tagname)) {
                $tagname = $value['TagName'];
                unset($value['TagName']);
            }
            if(!is_array($value)) {
                $s .= "<{$tagname}>".(!is_numeric($value) ? '<![CDATA[' : '').$value.(!is_numeric($value) ? ']]>' : '')."</{$tagname}>";
            } else {
                $s .= "<{$tagname}>" . self::arrayXml($value, $level + 1)."</{$tagname}>";
            }
        }
        $s = preg_replace("/([\x01-\x08\x0b-\x0c\x0e-\x1f])+/", ' ', $s);
        return $level == 1 ? $s."</xml>" : $s;
    }

    /**
     * 微信支付发起请求
     */
    protected static function curl_post_ssl($url, $xmldata, $second=30,$aHeader=array()){
        $ch = curl_init();
        //超时时间
        curl_setopt($ch,CURLOPT_TIMEOUT,$second);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
        //这里设置代理，如果有的话
        //curl_setopt($ch,CURLOPT_PROXY, '10.206.30.98');
        //curl_setopt($ch,CURLOPT_PROXYPORT, 8080);
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
        curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);


        if( count($aHeader) >= 1 ){
            curl_setopt($ch, CURLOPT_HTTPHEADER, $aHeader);
        }

        curl_setopt($ch,CURLOPT_POST, 1);
        curl_setopt($ch,CURLOPT_POSTFIELDS,$xmldata);
        $data = curl_exec($ch);
        if($data){
            curl_close($ch);
            return $data;
        }
        else {
            $error = curl_errno($ch);
            echo "call faild, errorCode:$error\n";
            curl_close($ch);
            return false;
        }
    }

}