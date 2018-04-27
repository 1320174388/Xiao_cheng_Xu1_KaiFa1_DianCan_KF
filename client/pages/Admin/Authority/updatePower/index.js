var config = require('../../../../config');
var app = getApp();
// pages/power/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:null,
    id:null,
    update_value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this
    app.post(
      config.service.getPosition, {
        'token': wx.getStorageSync('token')
      }, function (res) {
        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
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
  // 添加
  add:function(){
    app.baseUrl('/pages/Admin/Authority/powerManage/index');
  },
  
//修改
  formSubmit:function(e) {
    wx.setStorageSync('value', e.detail.value);
    app.baseUrl('/pages/Admin/Authority/update/index');
  },

//删除
 
  deleteClick: function (e) {
    var THIS=this;
    app.post(
      config.service.delPosition, {
        'token': wx.getStorageSync('token'),
        'id': e.currentTarget.dataset.editid
      }, function (res) {
        if (res.data.errNum == 0) {
          app.point(res.data.retMsg, "success");
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
        } else {
          app.point(res.data.retMsg, "none");
        };
      }
    );
  }
})