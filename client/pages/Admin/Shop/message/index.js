var config = require('../../../../config.js');
var app = getApp();
// pages/Admin/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_value:null,
    image_url:null,
    image_true:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop_value: wx.getStorageSync('shop_value'),
      image_url:  wx.getStorageSync('shop_value').shop_img, 
    });
  },
  image:function(){
    var THIS = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        THIS.setData({
          image_url: res.tempFilePaths[0],
          image_true:true
        });
        console.log(THIS.data.image_url)
      }
    })
  },
  formSubmit:function(e){
    var This = this;
    if (This.data.image_true){
      app.point("上传中", "loading", 360000);
      app.file(
        config.shop.update,
        This.data.image_url,
        "shop_img", {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.shop_id,
          "shop_name": e.detail.value.shop_name,
          "shop_info": e.detail.value.shop_info,
          "shop_addr": e.detail.value.shop_addr,
          "shop_phone": e.detail.value.shop_phone,
          "food_img_true": 1
        }, function (res) {
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            app.point(data.retMsg, "success");
            app.timeBack(1000);
          }
        },
      );
    }else{
      app.post(
        config.shop.update, {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.shop_id,
          "shop_name": e.detail.value.shop_name,
          "shop_info": e.detail.value.shop_info,
          "shop_addr": e.detail.value.shop_addr,
          "shop_phone": e.detail.value.shop_phone
        }, function (res) {
          if (res.data.errNum == 0) {
            app.point(res.data.retMsg, "success");
            app.timeBack(1000);
          } else {
            app.point(res.data.retMsg, "none");
          }; 
        }
      );
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
  maps:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
})