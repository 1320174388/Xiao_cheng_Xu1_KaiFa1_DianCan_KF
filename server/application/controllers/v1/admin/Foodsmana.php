<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 22:27
 */
class Foodsmana extends LoginController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Foods');
        $this->load->helper('uploads');
        $this->load->library('validateclass');
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', NULL );
        }
    }
    /**
     * 获取所有菜品信息
     *
     * @success public
     * @parana string token 用户token令牌
     * @parana string food_name_search 菜品名称
     */
    public function index()
    {
        // 获取菜品列表信息
        $food_name = $this->input->post('food_name_search');
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
        $post = $this->input->post();

        if(!$post['food_name']) return return_response(2,'请输入菜品名称');

        if(!$post['class_id'])  return return_response(3,'选择菜品分类');

        $var = $this->validateclass->validator($post['food_price'],'int');

        if(!$var) return return_response(4,'请正确输入菜品价格');

        $var = $this->validateclass->validator($post['food_sort'],'int');

        if(!$var) return return_response(5,'请正确输入菜品排序');

        if(!$post['food_info']) return return_response(6,'请输入菜品介绍');

        $get_food_name = $this->Foods->get_food_name($post['food_name']);

        if($get_food_name){
            return return_response(7,'菜品名称已存在');
        }

        $food_img_url = upload_create('foods','food_img');

        if($food_img_url){

            unset($post['token']);

            $post['food_img'] = $food_img_url;
            $post['create_time'] = date('Y-m-d H:i:s',time());

            $res = $this->Foods->set_food_create($post);

            if($res){
                return return_response(0,'添加成功',$res);
            }else{
                return return_response(9,'添加失败');
            }

        }else{
            return return_response( 8, '图片上传失败');
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
        $post = $this->input->post();

        if(!$post['food_name']) return return_response(2,'请输入菜品名称');

        if(!$post['class_id'])  return return_response(3,'选择菜品分类');

        $var = $this->validateclass->validator($post['food_price'],'int');

        if(!$var) return return_response(4,'请正确输入菜品价格');

        $var = $this->validateclass->validator($post['food_sort'],'int');

        if(!$var) return return_response(5,'请正确输入菜品排序');

        if(!$post['food_info']) return return_response(6,'请输入菜品介绍');

        if(!$post['id']) return return_response(7,'没有发送ID');

        $get_food = $this->Foods->get_food_name($post['food_name']);

        if($get_food && ($post['id'] != $get_food->id)){
            return return_response(8,'菜品名称已存在');
        }

        if($post['food_img_true']){

            $food_img_url = upload_create('foods','food_img');

            if($food_img_url){
                $post['food_img'] = $food_img_url;
                unset($post['food_img_true']);
                $get_food_data = $this->Foods->get_food_data($post['id']);
                @upload_delete($get_food_data->food_img);
            }
        }

        unset($post['token']);

        $res = $this->Foods->set_food_update($post);

        if($res){
            return return_response(0,'修改成功',$res);
        }else{
            return return_response(9,'修改失败');
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
    }
}