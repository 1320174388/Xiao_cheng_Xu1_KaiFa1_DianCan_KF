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
    console.log(1)
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
  }
})