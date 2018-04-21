// pages/Admin/index/index.js
var config = require('../../../config.js');
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
  onLoad: function () {
    var THIS = this
    wx.request({
      url: config.service.AdminIndex, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      success: function (res) {
        if(res.data.errNum==0){
          THIS.setData({
            datas: res.data.retData
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
      console.log(11111)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('下拉')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('分享');
  },
  tiao:function(){
    wx.navigateTo({
      url:'../list/index'
    })
  }
})