// pages/Admin/MenuManage/updateCity/index.js
var config = require('../../../../config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'order_value': wx.getStorageSync('order_value'),
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
  
  },
  // 修改地址
  formSubmit:function(e){
   app.post(
     config.order.orderEdit, {
       'token': wx.getStorageSync('token'),
       'order_addr': e.detail.value.order_addr,
       'id': e.detail.value.id
     }, function (res) {
       if (res.data.errNum == 1) {
         app.point(res.data.retMsg, "success");
         app.timeBack(1000);
       } else {
         app.point(res.data.retMsg, "none");
       }; 
     }
   );
 }
})