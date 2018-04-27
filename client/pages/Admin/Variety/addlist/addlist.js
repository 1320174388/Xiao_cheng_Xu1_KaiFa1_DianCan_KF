var config = require('../../../../config.js');
var app = getApp();
// pages/Admin/addlist/addlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    image_url: '/icon/uppic.png',
    classlist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    app.post(
      config.service.foods, {
        "token": wx.getStorageSync('token'),
      }, function (res) {
        if (res.data.errNum == 0) {
          This.setData({
            classlist: res.data.retData
          });
        }
      }
    );
  },

  /**
   * 图片上传代码
   */
  image: function () {
    var This = this;
    app.imageAdd(function (res) {
      This.setData({
        image_url: res.tempFilePaths[0]
      });
    });
  },

  /**
   * 添加菜品
   */
  formSubmit: function (e) {
    var This = this;
    app.point("上传中", "loading",360000);
    app.file(
      config.foods.create,
      This.data.image_url,
      "food_img", {
        "token": wx.getStorageSync('token'),
        "food_name": e.detail.value.food_name,
        "class_id": e.detail.value.class_id,
        "food_price": e.detail.value.food_price,
        "food_sort": e.detail.value.food_sort,
        "food_info": e.detail.value.food_info,
      }, function (res) {
        var data = JSON.parse(res.data);
        if (data.errNum == 0) {
          app.point(res.data.retMsg, "success");
          app.timeBack(1000);
        } else {
          app.point(res.data.retMsg, "none");
        }; 
      },
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
})