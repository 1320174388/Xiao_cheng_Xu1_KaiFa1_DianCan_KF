// pages/Admin/Management/updateAdmin/index.js
var config = require('../../../../config');
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
    wx.removeStorageSync('admin_value');
    var THIS = this
    wx.request({
      url: config.service.getPositionInfo,
      data: {
        'token': wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
        };
        console.log(res.data);
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
  
  },

  // form提交
formSubmit: function (e) {
  // 修改职位
    console.log(e);
    wx.request({
      url: config.service.updateAdmin,
      data: {
        'token': wx.getStorageSync('token'),
        'admin_id': e.detail.value.admin_id,//wxml中name的值
        'admin_name':e.detail.value.admin_name,
        'role_id': e.detail.value.role_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
      }
    }),
    wx.navigateTo({
      url: "/pages/Admin/Management/updateManage/index",
    })
 }
})