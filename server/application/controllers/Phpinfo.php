<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/12 0012
 * Time: 18:48
 */

class phpinfo extends CI_Controller {

    public function index() {
        $this->load->driver('cache');
        $this->cache->file->save('key_1',['123','123123'],2);
        $sss = $this->cache->file->get('key_1');
        $this->cache->file->clean();
        $this->json($sss);
    }

}
