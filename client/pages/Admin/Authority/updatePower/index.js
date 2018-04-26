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
    wx.request({
      url: config.service.getPosition,
      data:{
        'token': wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      success:function(res){
        if (res.data.retData){
          THIS.setData({
            array:res.data.retData.list
          });
        };
        console.log(res.data);
      }
    })
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
    wx.navigateTo({
      url: "/pages/Admin/Authority/powerManage/index",
  })
  },
  
//修改
  formSubmit:function(e) {
    wx.setStorageSync('value', e.detail.value);
    wx.navigateTo({
      url: '/pages/Admin/Authority/update/index',
    })
    
  },

//删除
 
  deleteClick: function (event) {
    var id = event.currentTarget.dataset.editid;
    var THIS=this;
    console.log(id);
    wx.request({
      url: config.service.delPosition,
      data: {
        'token': wx.getStorageSync('token'),
        'id': id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          app.point("删除成功", "success");
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
        } else if (res.data.errNum == 1) {
          app.point("你没有权限进行此操作", "none");
        } else if (res.data.errNum == 2) {
          app.point("当前职位已被管理员使用,不可删除", "none");
        }else{
          app.point("删除失败", "none");
        }
      }
    })
  }
    
})