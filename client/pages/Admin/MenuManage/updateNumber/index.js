var config = require('../../../../config');
var app = getApp();
// pages/Admin/MenuManage/updateNumber/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:''
  },

  formSubmit:function(e){
    app.post(
      config.order.orderEdit, {
        'token': wx.getStorageSync('token'),
        'id': e.detail.value.id,
        'table_id': e.detail.value.number
      }, function (res) {
        if (res.data.errNum == 0) {
          app.point(res.data.retMsg, "success");
          app.timeBack(1000);
        } else {
          app.point(res.data.retMsg, "none");
        }; 
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'order_value': wx.getStorageSync('order_id'),
    });
    wx.removeStorageSync('order_value');
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