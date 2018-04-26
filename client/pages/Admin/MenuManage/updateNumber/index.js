var config = require('../../../../config');
// pages/Admin/MenuManage/updateNumber/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:''
  },
  formSubmit:function(e){
    wx.request({
      url: config.order.orderEdit,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'token': wx.getStorageSync('token'),
        'id': e.detail.value.id,
        //'id': wx.getStorageSync('order_id'),
        'table_id' : e.detail.value.number
      },
      method: 'POST',
      success: function (res) {
        if(res.data.errNum == 1){
          wx.removeStorageSync('order_id');
          console.log('修改成功');
          var pages = getCurrentPages(); // 当前页面  
          var beforePage = pages[pages.length - 2]; // 前一个页面 
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法  
            }
          })
        }else{
          console.log('修改失败');
        }
      }
    })
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