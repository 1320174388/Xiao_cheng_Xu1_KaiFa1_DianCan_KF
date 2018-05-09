var config = require('../../../../config');
var app = getApp();
// pages/Home/OrderFood/orderMenu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    host: config.index.host,
    imgUrls: null,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 走马灯
    noticesCurrent: '0',
    notices: [
      { sid: 1, title: '点餐：满100元减10元' },
      { sid: 2, title: '到店取餐：满100元减12元' },
      { sid: 3, title: '新品即将来袭，你准备好了吗？' }
    ],
    // 导航条
    navbar: null,
    host:config.service.host,
    key2:null,
    food_info_arr:null,
    currentTab: 0,
    open: true,
    close: false ,
    foods_number:null,
    foods_price:null,
    carlist:false,
  },
  carlist: function (e) {
    this.setData({
      carlist:true
    })
  },
  swichNav: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //notices轮播切换事件
  noticesChange: function (e) {
    //修改notice swiper当前索引
    this.setData({
      noticesCurrent: e.detail.current
    })
  },
  // submitCart
  submitCart: function (e) {
    var key1 = this.data.currentTab;
    var key2 = e.currentTarget.dataset.index;
    var key3 = e.currentTarget.dataset.food_id;

    if (this.data.food_info_arr) {
      var food_info_arr = this.data.food_info_arr;
    }else{
      var food_info_arr = {
        foods_crat: [],
        foods_number: 0,
        foods_price: 0
      };
    }

    if (e.currentTarget.dataset.add){
      if (food_info_arr.foods_crat[key3]) {
        ++food_info_arr.foods_crat[key3].food_number;
      } else {
        food_info_arr.foods_crat[key3] = this.data.navbar[key1].food_info[key2];
        food_info_arr.foods_crat[key3].food_number = 1;
      }
    }

    if (e.currentTarget.dataset.del){
      if (food_info_arr.foods_crat[key3]) {
        --food_info_arr.foods_crat[key3].food_number;
        if (food_info_arr.foods_crat[key3].food_number == 0) {
          delete (food_info_arr.foods_crat[key3]);
        }
      }
    }

    if (app.isArrayNull(food_info_arr.foods_crat)) {
      food_info_arr.foods_number = app.orderCrat(food_info_arr.foods_crat, 'number');
      food_info_arr.foods_price = app.orderCrat(food_info_arr.foods_crat, 'price');
    }else{
      food_info_arr = null;
    }

    if (!food_info_arr.foods_crat[key3] && food_info_arr.foods_price == 0 && food_info_arr.foods_number ==0) {
      this.setData({
        food_info_arr: null,
      });
      wx.removeStorageSync('food_info_arr');
    } else {
      this.setData({
        food_info_arr: food_info_arr,
      });
      wx.setStorageSync('food_info_arr', food_info_arr);
    }

  },
  // 购物车
  showitems: function () {
    this.setData({
      close: true,
      open: false,
    })
  },
  // 清空
  showitemes: function () {
    this.setData({
      food_info_arr:null
    })
    wx.removeStorageSync('food_info_arr')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    // 图片轮播
    app.post(
      config.index.git_sowing_map, {
      }, function (res) {
        This.setData({
          imgUrls: res.data.retData
        });
      }
    );
    // 登录获取token
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       app.post(
    //         config.service.cheshiUrl, {
    //           code: res.code
    //         }, function (res) {
    //           console.log(res.data);
    //           wx.setStorageSync('token', res.data.retData.token);
    //         }
    //       );
    //     } else {
    //       console.log('登录失败' + res.errMsg);
    //     };
    //   }
    // });
    // 菜品
    This.setData({
      food_info_arr: wx.getStorageSync('food_info_arr'),
    });
    setInterval(function (res) {
      This.setData({
        food_info_arr: wx.getStorageSync('food_info_arr'),
      });
    }, 500);
    var This = this;
    app.post(
      config.order_class_food.get_class_food,{},function(res){
        This.setData({
          navbar: res.data.retData
        });
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 结账
  end: function() {
    wx.navigateTo({
      url: '/pages/Home/submit/intoroom/index',
    })
  },
  // 点击单个菜品
  single: function (e) {
    wx.setStorageSync('food_info_index', e.currentTarget.dataset.index);
    wx.setStorageSync('food_info', e.currentTarget.dataset.food_info);
    wx.navigateTo({
      url: '/pages/Home/OrderFood/carteInfo/index',
    })
  },
})