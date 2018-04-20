<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 14:11
 */
class Classfoods extends CI_Controller{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Food_class');
        $this->load->model('admin/Foods');
    }
    /**
     *  获取食品分类列表信息
     *
     * @seccess public
     * @param string 用户Token令牌数据
     */
    public function index()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取食品分类列表信息
            $res = $this->Food_class->get_food_class();
            if($res){
                return return_response(0,'请求成功',$res);
            }else{
                return return_response(2,'当前还没有添加分类');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 添加分类
     *
     * @seccess public
     * @param string token 用户Token令牌数据
     * @param string class_name 添加分类的名称
     * @param int class_sort 分类排序数字
     */
    public function create()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取添加分类的名称和排序字段
            $class_name = $this->input->post('class_name');
            if(!$class_name){
                return return_response(2,'没有填写食品分类名称');
            }
            $class_sort = $this->input->post('class_sort');
            if(!$class_sort){
                return return_response(3,'没有填写食品分类排序');
            }
            // 获取食品分类名称
            $get_class_name = $this->Food_class->get_class_name($class_name)->class_name;
            if($get_class_name === $class_name){
                return return_response(4,'管理员名称已存在');
            }
            // 添加食品分类
            $res = $this->Food_class->set_food_class($class_name,$class_sort);
            if($res){
                return return_response(0,'添加成功',$res);
            }else{
                return return_response(5,'添加失败');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 修改分类名称
     *
     * @seccess public
     * @param string token 用户Token令牌数据
     * @param int class_id 修改分类对应ID
     * @param string class_name 添加分类的名称
     * @param int class_sort 分类排序数字
     */
    public function update()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取修改分类的ID、名称和排序字段
            $class_id = $this->input->post('class_id');
            if(!$class_id){
                return return_response(2,'没有接收到修改分类的ID');
            }
            $class_name = $this->input->post('class_name');
            if(!$class_name){
                return return_response(3,'没有填写食品分类名称');
            }
            $class_sort = $this->input->post('class_sort');
            if(!$class_sort){
                return return_response(4,'没有填写食品分类排序');
            }
            // 获取食品分类ID
            $get_class = $this->Food_class->get_class_name($class_name);
            if(($get_class->id != $class_id) && ($get_class->class_name === $class_name)){
                return return_response(5,'管理员名称已存在');
            }
            // 添加食品分类
            $res = $this->Food_class->set_class_update($class_id,$class_name,$class_sort);
            if($res){
                return return_response(0,'修改成功',$res);
            }else{
                return return_response(6,'修改失败');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
    /**
     * 删除食品分类
     *
     * @param string token 用户Token令牌数据
     * @param int class_id 修改分类对应ID
     */
    public function delete()
    {
        // 判断用户是不是管理员
        if( is_admin_user() || is_system_admin() ){
            // 获取修改分类的ID、名称和排序字段
            $class_id = $this->input->post('class_id');
            if(!$class_id){
                return return_response(2,'没有接收到删除分类的ID');
            }
            $res = $this->Foods->get_class_foods($class_id);
            if($res){
                return return_response(3,'分类下有食品不可删除');
            }
            $row = $this->Food_class->delete_food_class($class_id);
            if($row){
                return return_response(0,'删除成功');
            }else{
                return return_response(4,'删除失败');
            }
        }else{
            return return_response( 1, '对不起,您不是管理员身份');
        }
    }
}