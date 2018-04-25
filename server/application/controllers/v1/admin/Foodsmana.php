<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 22:27
 */
class Foodsmana extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Foods');
        $this->load->helper('uploads');
        $this->load->library('validateclass');
    }
    /**
     * 获取所有菜品信息
     *
     * @success public
     * @parana string token 用户token令牌
     */
    public function index()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取菜品列表信息
            $food_name = $this->input->post('food_name');
            if($food_name){
                $res = $this->Foods->get_food_lists($food_name);
            }else{
                $res = $this->Foods->get_food_lists();
            }
            if($res){
                return return_response(0,'请求成功',$res);
            }else{
                return return_response(2,'当前没有添加菜品');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 执行添加菜品
     *
     * @success public
     * @parana string token 用户token令牌
     * @parana string food_name 菜品名称
     * @parana string class_id 菜品分类ID
     * @parana string food_img 菜品图片
     * @parana string food_price 菜品价格
     * @parana string food_sort 菜品排序
     * @parana string food_info 菜品介绍
     * @parana string create_time 添加时间
     */
    public function create()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取post传值
            $post = $this->input->post();
            // 验证传值参数
            $validate = $this->validateclass->validate_food_post($post);
            if($validate) return $validate;
            // 判断菜品名称是否存在
            $get_food_name = $this->Foods->get_food_name($post['food_name']);
            if($get_food_name){
                return return_response(7,'菜品名称已存在');
            }
            // 处理上传图片,获取图片url地址信息
            $food_img_url = upload_create('foods','food_img');
            if($food_img_url){
                // 处理菜品数据
                unset($post['token']);
                $post['food_img'] = $food_img_url;
                $post['create_time'] = date('Y-m-d H:i:s',time());
                // 执行添加菜品操作
                $res = $this->Foods->set_food_create($post);
                if($res){
                    return return_response(0,'添加成功',$res);
                }else{
                    return return_response(9,'添加失败');
                }
            }else{
                return return_response( 8, '图片上传失败');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 执行修改菜品操作
     *
     * @success public
     * @parana string token 用户token令牌
     * @parana string id 菜品ID
     * @parana string food_name 菜品名称
     * @parana string class_id 菜品分类ID
     * @parana string food_img 菜品图片
     * @parana string food_price 菜品价格
     * @parana string food_sort 菜品排序
     * @parana string food_info 菜品介绍
     * @parana string create_time 添加时间
     */
    public function update()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取post传值
            $post = $this->input->post();
            // 验证传值参数
            $validate = $this->validateclass->validate_food_post($post);
            if($validate) return $validate;
            // 判断Id是否存在
            if(!$post['id']) return return_response(7,'没有发送ID');
            // 判断菜品名称是否存在
            $get_food = $this->Foods->get_food_name($post['food_name']);
            if($get_food && ($post['id'] != $get_food->id)){
                return return_response(8,'菜品名称已存在');
            }
            // 处理上传图片,获取图片url地址信息
            if($post['food_img_true']){
                $food_img_url = upload_create('foods','food_img');
                if($food_img_url){
                    $post['food_img'] = $food_img_url;
                    unset($post['food_img_true']);
                    $get_food_data = $this->Foods->get_food_data($post['id']);
                    upload_delete($get_food_data->food_img);
                }
            }
            // 处理菜品数据
            unset($post['token']);
            // 执行修改菜品操作
            $res = $this->Foods->set_food_update($post);
            if($res){
                return return_response(0,'修改成功',$res);
            }else{
                return return_response(9,'修改失败');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 执行删除菜品操作
     *
     * @parana string token 用户token令牌
     * @parana string id 菜品ID
     */
    public function delete()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取post传值
            $id = $this->input->post('id');
            // 执行修改菜品操作
            $get_food_data = $this->Foods->get_food_data($id);
            $bool = upload_delete($get_food_data->food_img);
            if($bool){
                // 删除数据库
                $res = $this->Foods->get_food_delete($id);
                if($res){
                    return return_response(0,'删除成功',$res);
                }else{
                    return return_response(3,'删除失败');
                }
            }else{
                return return_response(2,'原图片删除失败');
            }

        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
}