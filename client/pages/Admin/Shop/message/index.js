var config = require('../../../../config.js');
var app = getApp();
// pages/Admin/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.service.host,
    shop_value:null,
    image_url:null,
    image_true:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop_img = wx.getStorageSync('shop_img');
    var shop_imgs = []
    for (var n in shop_img) {
      shop_imgs[n] = {
        'shop_img':config.service.host+shop_img[n].shop_img
      }
    }
    this.setData({
      shop_value: wx.getStorageSync('shop_value'),
      image_url: shop_imgs
    });
  },
  image:function(){
    var THIS = this;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        if(res.tempFilePaths){
          var i = 0;
          var num = 1;
          var length = res.tempFilePaths.length;
          var tempFilePaths = res.tempFilePaths;
          appFile(i, num, length, tempFilePaths);
          function appFile(i, num, length, tempFilePaths){
            app.point("第" + num + "张图片上传中", "loading", 360000);
            app.file(
              config.shop.create_img,
              res.tempFilePaths[i],
              "shop_img", {
                "token": wx.getStorageSync('token'),
                "img_num": num
              }, function (res) {
                var data = JSON.parse(res.data);
                if (data.errNum == 0) {
                  app.point(data.retMsg, "success");
                  i++;
                  num++;
                  if (num <= length) {
                    appFile(i, num, length, tempFilePaths);
                  }else{
                    var image_urls = [];
                    for (var n = 0; n < tempFilePaths.length;n++) {
                      image_urls[n] = [];
                      image_urls[n] = {
                        'shop_img':tempFilePaths[n]
                      }
                    }
                    THIS.setData({
                      image_url: image_urls
                    });
                  }
                }
              },
            );
          }
        }
      }
    })
  },
  formSubmit:function(e){
    var This = this;
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