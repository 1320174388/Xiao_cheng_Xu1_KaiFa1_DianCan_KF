// pages/manage/list/index.js
var config = require('../../../../config');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role_id: null,
    firstPerson: '暗提示',
    array: '',
  },
  //点击选择类型
  // clickPerson: function () {
  //   var THIS = this
  //   wx.request({
  //     url: config.service.getPositionInfo,
  //     data: {
  //       'token': wx.getStorageSync('token')
  //     },
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       if (res.data.retData) {
  //         THIS.setData({
  //           array: res.data.retData.list
  //         });
  //       };
  //       console.log(res.data);
  //     }
  //   });

  //   var selectPerson = this.data.selectPerson;
  //   if (selectPerson == true) {
  //     this.setData({
  //       selectArea: true,
  //       selectPerson: false,
  //     })
  //   } else {
  //     this.setData({
  //       selectArea: false,
  //       selectPerson: true,
  //     })
  //   }
  // },
  // //点击切换
  // mySelect: function (e) {
  //   this.setData({
  //     firstPerson: e.target.dataset.me,
  //     selectPerson: true,
  //     selectArea: false,
  //   })
  // },

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
        if (res.data.retData) {
          add.setData({
            arrayList: res.data.retData
          });
        };

      }
    })
  }
})