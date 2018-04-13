<?php

class Token extends CI_Controller {

    public function index()
    {
        $this->json(get_token_values());
    }

}