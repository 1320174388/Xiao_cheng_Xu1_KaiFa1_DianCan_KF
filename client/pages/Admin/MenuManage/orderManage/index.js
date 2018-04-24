var config = require('../../../../config');
// pages/Admin/MenuManage/orderManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单管理导航条
    navbar: ['就餐订单', '外卖订单', '历史订单'],
    currentTab: 0,
    orderlist:null,
    ordertake:null,
    orderhist:null
  },
  // 获取订单详情信息
  orderinfo:function(e){
    wx.setStorageSync('order_id', e.currentTarget.dataset.order_id);
    wx.navigateTo({
      url: '/pages/Admin/MenuManage/orderInfo/index',
    })
  },
  // 修改座号
  updateorder:function(e){
    wx.setStorageSync('order_id', e.currentTarget.dataset);
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/Admin/MenuManage/updateNumber/index',
    })
  },
  // 修改地址
  updateorderaddr:function(e){
   wx.setStorageSync('order_value', e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/Admin/MenuManage/updateCity/index',
    })
  },
  
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this;
    wx.request({
      url: config.order.orderList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'token':wx.getStorageSync('token'),
        'order_type':'eat',
        'order_status':1,
      },
      method: 'POST',
      success: function (res) {
        THIS.setData({
          orderlist: res.data.retData
        })
      }
    });
    wx.request({
      url: config.order.orderList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'token': wx.getStorageSync('token'),
        'order_type': 'out',
        'order_status': 1,
      },
      method: 'POST',
      success: function (res) {
        THIS.setData({
          ordertake: res.data.retData
        })
      }
    });
    wx.request({
      url: config.order.orderList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'token': wx.getStorageSync('token'),
        'order_status': 2,
      },
      method: 'POST',
      success: function (res) {
        THIS.setData({
          orderhist: res.data.retData
        })
      }
    });
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
  
  }
})