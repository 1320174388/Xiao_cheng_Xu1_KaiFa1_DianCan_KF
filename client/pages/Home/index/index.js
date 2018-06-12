var config = require('../../../config');
var app = getApp();
Page({
  data: {
    host:config.index.host,
    imgUrls: null,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imghost: config.service.imghost
  },
  onLoad: function () {
    var This = this;
    app.post(
      config.index.git_sowing_map, {
      }, function (res) {
        This.setData({
          imgUrls: res.data.retData
        });
      }
    );
  },
  tell:function(){
    wx.makePhoneCall({
      phoneNumber: '17090051724'
    })
  },
  maps: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: "花园桥肯德基",
          address:"十三陵景区",
          scale: 28
        })
      }
    })
  },
  // 点餐小图标跳转
  diancan:function(){
    wx.navigateTo({
      url: '/pages/Home/OrderFood/orderMenu/index',
    })
  },
  // 图片跳转
  imgOrder: function () {
    wx.navigateTo({
      url: '/pages/Home/SelectionFood/imgOrder/index',
    })
  },
  // 拨打电话
  phone_dlth: function () {
    wx.makePhoneCall({
      phoneNumber: '010-86220269'
    })
  },
})