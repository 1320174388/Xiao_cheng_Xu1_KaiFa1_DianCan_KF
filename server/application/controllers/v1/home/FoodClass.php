<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/1 0001
 * Time: 10:36
 */
class FoodClass extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home/Food_list');
    }

    /**
     * 获取菜品分类及信息列表
     */
    public function food_class_list()
    {
        $class = $this->Food_list->select_food_class_list();

        if(!$class){
            return return_response(1,'没有菜品及分类');
        }

        foreach($class as $k=>$v){
            $food_list = $this->Food_list->select_class_food_list($v->id);
            $v->food_info = $food_list;
        }

        return return_response(0,'请求成功',$class);

    }
}