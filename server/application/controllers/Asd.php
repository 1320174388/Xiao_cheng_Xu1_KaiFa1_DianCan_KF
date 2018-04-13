<?php

class Asd extends CI_Controller {

    public function index() {
        // 获取临时生成Code
        $code = $this->input->post();
        // 请求腾讯云服务器
        $this->load->library('loginclass',$code);
        // 获取返回结果
        $openid = $this->loginclass->get();
        $this->json($openid);
    }

}