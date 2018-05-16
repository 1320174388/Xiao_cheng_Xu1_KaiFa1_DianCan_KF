// pages/Home/success/index.js
var config = require('../../../../config.js');
var app = getApp();
var order_bindtap_type = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payLoser: null,
    imghost: config.service.host
  },
  // 取消订单
  exitOrder: function () {
    wx.switchTab({
      url: '/pages/Home/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      food_list_info: wx.getStorageSync('food_list_info'),
      food_list_beizhu: wx.getStorageSync('food_list_beizhu') ? wx.getStorageSync('food_list_beizhu') : '',
      food_list_order_number: wx.getStorageSync('food_list_order_number')
    });
    var payLoser = wx.getStorageSync('payLoser');
    this.setData({
      payLoser: payLoser,
    }),
      wx.removeStorageSync('payLoser');
  },
  // 立即支付
  hurrypay: function () {
    var order_number = wx.getStorageSync('food_list_order_number');
    var price = this.data.food_list_info.foods_price * 100;
    var This = this;
    order_bindtap_type++;
    app.point('支付中', 'loading', 7200);
    app.Payment(
      order_number, price, function (res) {
        // 成功
        wx.setStorageSync("payLoser", true);
        This.onLoad();
      }, function (res) {
        // 失败
        wx.setStorageSync("payLoser", false);
        This.onLoad();
      }, function (res) {
        wx.setStorage({
          key: 'food_list_info',
          data: This.data.food_list_info,
        })
        wx.setStorage({
          key: 'food_list_beizhu',
          data: This.data.food_list_beizhu,
        })
        wx.setStorage({
          key: 'food_list_order_number',
          data: This.data.food_list_order_number,
        })
        order_bindtap_type--;
      }
    );
  },
  // 继续点餐
  playon: function () {
    wx.switchTab({
      url: '/pages/Home/OrderFood/orderMenu/index',
    })
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