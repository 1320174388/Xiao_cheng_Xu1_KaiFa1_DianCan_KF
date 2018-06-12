var config = require('../../../../config.js');
var app = getApp();
// 滚动选择器
var picker_value = 0;
// pages/Admin/addlist/addlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    image_url: null,
    image_true:null,
    classlist:null,
    editfoods:''
  },
  // 表单提交事件
  formSubmit:function(e){
    var This = this;
    var classlist = This.data.classlist;
    var class_id = classlist[picker_value].id;
    if (this.data.image_true) {
      app.point("上传中", "loading", 360000);
      app.file(
        config.foods.update,
        This.data.image_url,
        "food_img", {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.id,
          "food_name": e.detail.value.food_name,
          "class_id": class_id,
          "food_price": e.detail.value.food_price,
          "food_sort": e.detail.value.food_sort,
          "food_info": e.detail.value.food_info,
          "food_img_true": 1
        }, function (res) {
          console.log(res.data);
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            wx.removeStorageSync('editfoods');
            app.point(res.data.retMsg, "success");
            app.timeBack(1000);
          } else {
            app.point(res.data.retMsg, "none");
          };
        },
      );
    }else{ //没有传入图片
      app.post(
        config.foods.update, {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.id,
          "food_name": e.detail.value.food_name,
          "class_id": class_id,
          "food_price": e.detail.value.food_price,
          "food_sort": e.detail.value.food_sort,
          "food_info": e.detail.value.food_info,
        }, function (res) {
          if (res.data.errNum == 0) {
            wx.removeStorageSync('editfoods');
            app.point(res.data.retMsg, "success");
            app.timeBack(1000);
          } else{
            app.point(res.data.retMsg, "none");
          };
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      editfoods: wx.getStorageSync('editfoods'),
      image_url: config.service.host + wx.getStorageSync('editfoods').food_img
    });
    var This = this;
    app.post(
      config.service.foods, {
        "token": wx.getStorageSync('token'),
      }, function (res) {
        if (res.data.errNum == 0) {
          This.setData({
            classlist: res.data.retData
          });
        };
      }
    );
  },
  // 图片上传代码
  image: function () {
    var This = this;
    app.imageAdd(function (res) {
      This.setData({
        image_url: res.tempFilePaths[0],
        image_true: true
      });
    });
  },
  // 选择分类
  slide_change: function (res) {
    picker_value = res.detail.value[0];
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