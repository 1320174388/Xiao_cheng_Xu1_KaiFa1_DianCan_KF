var config = require('../../../config')
Page({
  data: {
    imgUrls: [
      '../../../icon/3.jpg',
      '../../../icon/2.jpg',
      '../../../icon/1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  maps:function(){
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
  onLoad:function(){
    wx.login({
      success: function (res) {
        if(res.code){
          wx.request({
            url: config.service.cheshiUrl,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
              code:res.code
            },
            method:'POST',
            success:function(res){
              console.log(res.data);
              wx.setStorageSync('token', res.data.retData.token);
            }
          })
        }else{
          console.log('登录失败'+res.errMsg);
        };
      }
    });
  }
})