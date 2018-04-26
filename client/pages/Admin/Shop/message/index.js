var config = require('../../../../config.js');
// pages/Admin/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_value:null,
    image_url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop_value: wx.getStorageSync('shop_value')
    });
  },
  image:function(){
    var This = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        This.setData({
          image_url: res.tempFilePaths[0]
        });
        console.log(res.tempFilePaths[0])
      }
    })
  },
  formSubmit:function(e){
    var This = this;
    if (This.data.image_url){
      wx.uploadFile({
        url: config.shop.update, //仅为示例，并非真实的接口地址
        filePath: This.data.image_url,
        name: "shop_img",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        formData: {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.shop_id,
          "shop_name": e.detail.value.shop_name,
          "shop_info": e.detail.value.shop_info,
          "shop_addr": e.detail.value.shop_addr,
          "shop_phone": e.detail.value.shop_phone,
          "food_img_true":1
        },
        method: 'POST',
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            var pages = getCurrentPages(); // 当前页面  
            var beforePage = pages[pages.length - 2]; // 前一个页面 
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法  
              }
            })
            
          }
        },
      });
    }else{
      wx.request({
        url: config.shop.update, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          "token": wx.getStorageSync('token'),
          "id": e.detail.value.shop_id,
          "shop_name": e.detail.value.shop_name,
          "shop_info": e.detail.value.shop_info,
          "shop_addr": e.detail.value.shop_addr,
          "shop_phone": e.detail.value.shop_phone
        },
        method: 'POST',
        success: function (res) {
          if (res.data.errNum == 0) {
            var pages = getCurrentPages(); // 当前页面  
            var beforePage = pages[pages.length - 2]; // 前一个页面 
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法  
              }
            })
            
          }
        }
      });
      ({
        
        filePath: This.data.image_url,
        name: "shop_img",
        
        
        
      });
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