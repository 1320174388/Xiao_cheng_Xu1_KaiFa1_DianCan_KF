// pages/Admin/Variety/edit/edit.js
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
    })
    console.log(this.data.datas)
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
    console.log(e)
    wx.request({
      url: config.service.editMenu, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token'),
        "class_id": e.detail.value.class_id,
        "class_name": e.detail.value.class_name,
        "class_sort": e.detail.value.class_sort
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})