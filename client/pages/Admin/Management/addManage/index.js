// pages/manage/list/index.js
var config = require('../../../../config');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role_id: null,
    firstPerson: '暗提示',
    array: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this
    wx.request({
      url: config.service.getPositionInfo,
      data: {
        'token': wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
        };
        console.log(res.data);
      }
    });
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

  // form提交
  formSubmit: function (e) {
    // 添加职位
    var add = this;
    var user_id = e.detail.value.user_id;
    var admin_name = e.detail.value.admin_name;
    var role_id = e.detail.value.role_id;
    var value = e.detail.value;
    console.log(user_id);
    console.log(admin_name);
    console.log(role_id);
    console.log(value);
    wx.request({
      url: config.service.addAdmin,
      data: {
        'token': wx.getStorageSync('token'),
        'user_id': user_id,
        'admin_name': admin_name,
        'role_id': role_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          add.setData({
            arrayList: res.data.retData
          });
          app.point("成功", "success");
          setTimeout(function () {
            var pages = getCurrentPages(); // 当前页面  
            var beforePage = pages[pages.length - 2]; // 前一个页面 
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法  
              }
            })
          }, 1000);
          
        } else if (res.data.errNum == 1){
          app.point("你没有权限进行此操作", "none");
        } else if (res.data.errNum == 2) {
          app.point("没有选择管理员职位", "none");
        } else if (res.data.errNum == 3) {
          app.point("没有输入管理员名称", "none");
        } else if (res.data.errNum == 4) {
          app.point("用户不存在", "none");
        } else if (res.data.errNum == 5) {
          app.point("此用户已经是管理员", "none");
        } else if (res.data.errNum == 6) {
          app.point("管理员名称已存在", "none");
        } else if (res.data.errNum == 7){
          app.point("管理员添加失败", "none");
        } else{
          app.point("管理员职位绑定失败", "none");
        };

      }
    })
  }
})