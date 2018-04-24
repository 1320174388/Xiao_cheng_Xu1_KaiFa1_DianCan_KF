/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://l1ur0jdu.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 测试登录接口,获取令牌
        cheshiUrl: `${host}/api/home/login`,

        // 请求用户数据，必须发送令牌
        tokenUrl: `${host}/api/admin/token`,

        //后台首页
        AdminIndex: `${host}/api/admin/Modular/getAdminModular`,

        //判断是否是管理员
        adminUser: `${host}/api/admin/Modular/getUserIsAdmin`,

        //后台店铺管理
        shoppings: `${host}/api/admin/shop/get_shop_info`,

        //菜品管理——分类
        foods: `${host}/api/admin/classfoods/index`,

        //菜品管理——列表
        foodsList: `${host}/api/admin/Foodsmana/index`,

        // 请求用户数据，必须发送令牌
        tokenUrl: `${host}/api/admin/token`,

        // 获取权限管理列表信息
        position: `${host}/api/admin/position/right`,

        //权限管理：添加职位
        addPosition: `${host}/api/admin/position/create`,

        //权限管理：获取职位列表内容信息
        getPosition: `${host}/api/admin/position/show`,

        //权限管理：修改职位
        updatePosition: `${host}/api/admin/position/update`,

        //权限管理：删除职位信息
        delPosition: `${host}/api/admin/position/delete`,

        //管理列表：获取管理员信息
        getAdmin: `${host}/api/admin/isadmin/show`,

        //管理列表：获取职位信息
        getPositionInfo: `${host}/api/admin/isadmin/roles`,

        //管理列表：添加管理员
        addAdmin: `${host}/api/admin/isadmin/create`,

        //管理列表：修改管理员信息
        updateAdmin: `${host}/api/admin/isadmin/update`,

        //管理列表：删除管理员
         delAdmin: `${host}/api/admin/isadmin/delete`,

        //菜品管理 删除
        menuRemove: `${host}/api/admin/classfoods/delete`,

        //添加菜品分类
        addMenu: `${host}/api/admin/classfoods/create`,

        //修改菜品分类
        editMenu: `${host}/api/admin/classfoods/create`

    },

    // 订单管理页面路由
    order:{
      host,

      // 获取订单列表信息
      orderList: `${host}/api/admin/order/get_order_list_by_type`,

      // 订单详情
      orderInfo: `${host}/api/admin/order/get_order_info_by_id`,

      // 修改订单
      orderEdit: `${host}/api/admin/order/update_order_info`,
      
    }
};

module.exports = config;