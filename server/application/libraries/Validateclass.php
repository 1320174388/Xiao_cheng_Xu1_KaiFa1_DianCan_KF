<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/21 0021
 * Time: 03:17
 */
class Validateclass {

    public function validate_food_post($post)
    {
        // 获取 food_name 菜品名称
        if(!$post['food_name']) return return_response(2,'没有输入菜品名称');
        // 获取 class_id 菜品ID
        if(!$post['class_id'])  return return_response(3,'没有选择菜品分类');
        // 获取 food_price 菜品价格
        if(!$post['food_price'])return return_response(4,'没有输入菜品价格');
        // 获取 food_sotr 菜品排序
        if(!$post['food_sort'])return return_response(5,'没有输入菜品排序');
        // 获取 food_info 菜品介绍
        if(!$post['food_info']) return return_response(6,'没有输入菜品介绍');
    }
}