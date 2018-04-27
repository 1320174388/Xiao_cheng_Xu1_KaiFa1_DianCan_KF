// pages/manage/list/index.js
var config = require('../../../../config');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role_id: null,
    firstPerson: '暗提示',
    array: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this
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
   * 添加管理员
   */
  formSubmit: function (e) {
    var add = this;
    app.post(
      config.service.addAdmin, {
        'token': wx.getStorageSync('token'),
        'user_id': e.detail.value.user_id,
        'admin_name': e.detail.value.admin_name,
        'role_id': e.detail.value.role_id
      }, function (res) {
        if (res.data.errNum == 0) {
          add.setData({
            arrayList: res.data.retData
          });
          app.point(res.data.retMsg, "success");
          app.timeBack(1000);
        } else {
          app.point(res.data.retMsg, "none");
        };
      }
    );
  }
})