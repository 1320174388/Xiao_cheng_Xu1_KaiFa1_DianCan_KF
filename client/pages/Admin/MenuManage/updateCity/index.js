// pages/Admin/MenuManage/updateCity/index.js
var config = require('../../../../config');
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
   console.log(e);
    wx.request({
      url: config.order.orderEdit,
      data: {
        'token': wx.getStorageSync('token'),
        'order_addr': e.detail.value.order_addr,//wxml中name的值
        // 'id'是wxml中的name的值,不管或不获取id都必须传id
        'id': e.detail.value.id

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data.errNum == 1){
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
 }
})