// pages/Admin/manage/index.js
var config = require('../../../../config.js');
var app = getApp();
var time=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:null,
    shop:null,
    select:false,
    selected:true,
    pic:"/icon/desk.jpg",
    desk:null,
    table_id:null,
  },
  /**
     * 弹出层函数
     */
  //出现
  longTap: function (e) {
    var This=this;
    var index = e.currentTarget.dataset.tabltnum;
    console.log(e);
    console.log(index);
    var desk = this.data.desk;
    for (var i in desk) {
      desk[i]['hidden'] = true;
    };
    console.log(desk[index]);
    desk[index].hidden = false;
    this.setData({
      desk:desk
    });
    clearTimeout(time);
    time=setTimeout(function () {
      for (var i in desk) {
        desk[i]['hidden'] = true;
      }
      This.setData({
        desk: desk
      });
    }, 3000);

 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this;
    wx.request({
      url: config.service.shoppings,
      data: {
        "token": wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'post',
      success: function (res) {
        THIS.setData({
          host: config.service.host,
          shop: res.data.retData[0]
        });
      }
    });
    app.post(
      config.shop.get_tables, {
        "token": wx.getStorageSync('token')
      }, function (res) {
        if (res.data.errNum == 0) {
          for (var i in res.data.retData){
            res.data.retData[i]['hidden'] = true;
          }
          THIS.setData({
            desk: res.data.retData
          });
          console.log(res.data.retData);
        }
      }
    )
  },

//修改座号
  hideup: function (e) {
    console.log(e.currentTarget.dataset);
    wx.setStorageSync('table_info', e.currentTarget.dataset);
    app.baseUrl('/pages/Admin/Shop/seatupdate/index');
  },
// 删除座号
  hidedel: function (e) {
    var del = this;
    app.post(
      config.shop.del_tables, {
        'token': wx.getStorageSync('token'),
        'table_id': e.currentTarget.dataset.editid
      }, function (res) {
        if (res.data.errNum == 0) {
          app.point(res.data.retMsg, "success");
          setTimeout(function () {
            del.onLoad(); 
          }, 1000);
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
  select:function(e){
    if ('w' == e.currentTarget.dataset.w){
       this.setData({
         select: false,
         selected: true
       })
    } else if ('y' == e.currentTarget.dataset.y){
        this.setData({
          select: true,
          selected: false
        })
     }
  },
  edits:function(e){
    wx.setStorageSync('shop_value',e.detail.value);
    wx.navigateTo({
      url: '/pages/Admin/Shop/message/index'
    })
  },
  seats:function(){
    wx.navigateTo({
      url: '/pages/Admin/Shop/seat/index',
    })
  }
})