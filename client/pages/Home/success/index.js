// pages/Home/success/index.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: false,
    agains: false,
    success: true ,
    imghost: config.service.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var food_list_info   = wx.getStorageSync('food_list_info');
    var food_list_beizhu = wx.getStorageSync('food_list_beizhu');
    var food_list_order_number = wx.getStorageSync('food_list_order_number');
    
    this.setData({
      food_list_info: food_list_info,
      food_list_beizhu: food_list_beizhu,
      food_list_order_number: food_list_order_number
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