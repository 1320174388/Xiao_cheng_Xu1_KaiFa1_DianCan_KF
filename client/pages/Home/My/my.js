// pages/My/my.js
var config = require('../../../config.js');
var app = getApp();
var headimg = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:false,
    imghost: config.service.imghost,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId:"",
  },
  // 头像点击事件获取用户ID
  headpic:function(){
    if (headimg==5){
      app.point('你的ID为：'+this.data.userId,'none',5000);
      headimg=0;
    }else{
      headimg++;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this
    THIS.setData({
      userId:wx.getStorageSync('userId')
    })
    wx.request({
      url: config.service.adminUser, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      success: function (res) {
        if (res.data.errNum == 0){
          THIS.setData({
            //true
            datas: res.data.retMsg
          })
        }else{
          THIS.setData({
            //true
            datas: false
          })
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