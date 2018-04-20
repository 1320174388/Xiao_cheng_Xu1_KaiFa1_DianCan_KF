// pages/Admin/menu/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    selected: true,
    showModalStatus: "hide"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  select: function (e) {
    if ('w' == e.currentTarget.dataset.w) {
      this.setData({
        select: false,
        selected: true
      })
    } else if ('y' == e.currentTarget.dataset.y) {
      this.setData({
        select: true,
        selected: false
      })
    }
  },
  infomation:function(){
    var THIS = this
    setTimeout(function () { 
      THIS.setData({
        showModalStatus:"show"
      })
    },1000)
  },
  close:function(){
    this.setData({
      showModalStatus:"hide"
    })
  },
  adds:function(){
    wx.navigateTo({
      url: '/pages/Admin/cate/cate'
    })
  },
  cates:function(){
    wx.navigateTo({
      url: "/pages/Admin/addlist/addlist"
    })
  }
})