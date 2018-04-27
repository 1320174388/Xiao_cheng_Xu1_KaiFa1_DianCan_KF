// pages/Admin/Management/updateAdmin/index.js
var config = require('../../../../config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:'',
    admin_value:'',
    admin_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //动态赋值
    this.setData({
      'admin_value': wx.getStorageSync('value'),
    });
    var THIS = this;
    app.post(
      config.service.getPositionInfo, {
        'token': wx.getStorageSync('token')
      }, function (res) {
        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
        };
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

  /**
   * 修改管理员
   */
formSubmit:function(e){
  app.post(
    config.service.updateAdmin, {
      'token': wx.getStorageSync('token'),
      'admin_id': e.detail.value.admin_id,//wxml中name的值
      'admin_name': e.detail.value.admin_name,
      'role_id': e.detail.value.role_id
    }, function (res) {
      if (res.data.errNum == 0) {
        wx.removeStorageSync('admin_value');
        app.point(res.data.retMsg, "success");
        app.timeBack(1000);
      } else {
        app.point(res.data.retMsg, "none");
      };
    }
  );
 }
})