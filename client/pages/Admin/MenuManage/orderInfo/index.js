var config = require('../../../../config');

// pages/Admin/MenuManage/orderInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info:null,
    order_num:null,
    order_print:null,
    host: config.service.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this;
    wx.request({
      url: config.order.orderInfo,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'token': wx.getStorageSync('token'),
        'order_number': wx.getStorageSync('order_id')
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.retData);
        console.log(res.data.retData.order_info);
        if(res.data.errNum == 1){
          THIS.setData({
            order_info: res.data.retData.order_info,
            order_num: res.data.retData.order_num,
            order_print: res.data.retData.order_print
          });
        }
      }
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