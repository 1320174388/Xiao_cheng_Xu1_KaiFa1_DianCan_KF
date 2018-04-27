// pages/Admin/Variety/edit/edit.js
var config = require('../../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('key')
    this.setData({
      datas:value
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
  
  },
  formSubmit(e){
    app.post(
      config.service.editMenu, {
        "token": wx.getStorageSync('token'),
        "class_id": e.detail.value.class_id,
        "class_name": e.detail.value.class_name,
        "class_sort": e.detail.value.class_sort
      }, function (res) {
        if (res.data.errNum == 0) {
          wx.removeStorageSync('key')
          app.point(res.data.retMsg, "success");
          app.timeBack(1000);
        } else {
          app.point(res.data.retMsg, "none");
        };
      }
    );
  }
})