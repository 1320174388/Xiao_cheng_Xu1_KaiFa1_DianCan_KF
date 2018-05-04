var config = require('../../../../config');
var app = getApp();
// pages/Home/OrderFood/orderMenu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['热销', '热菜素', '热菜荤', '特色菜', '盖浇饭', '面食', '汤类', '主食'],
    host:config.service.host,
    currentTab: null,
    open: true,
    close: false 
  },
  swichNav: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 加号
  showitem: function () {
    this.setData({
      open: false,
      close: true
    })
  },
  // 购物车
  showitems: function () {
    this.setData({
      close: true,
      open: false,
    })
  },
  // 清空
  showitemes: function () {
    this.setData({
      close: false,
      open: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    app.post(
      config.order_class_food.get_class_food,{},function(res){
        console.log(res.data.retData);
        var i =1;
        for(var s in res.data.retData){
          if(i == 1){
            var index = s;
            i++;
          }
        }
        This.setData({
          navbar: res.data.retData,
          currentTab: index
        });
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
  // 结账
  end: function() {
    wx.navigateTo({
      url: '/pages/Home/submit/intoroom/index',
    })
  },
  // 点击单个菜品
  single: function (e) {
    wx.navigateTo({
      url: '/pages/Home/OrderFood/carteInfo/index',
    })
  },
})