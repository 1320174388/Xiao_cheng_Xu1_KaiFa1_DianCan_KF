// pages/Home/OrderFood/carteInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    close: true,
    show: false,
    hidden: false
  },
  showitemes: function () {
    this.setData({
      close: false,
      open: true,
    })
  },
  showitems: function () {
    this.setData({
      close: true,
      open: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This=this;
    var count=0;
    if(count==0){
      This.setData({
        show: true,
      })
    }else{
      This.setData({
        hidden: true,
      })
    }
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
  // 结账
  end: function () {
    wx.navigateTo({
      url: '/pages/Home/submit/intoroom/index',
    })
  },
})