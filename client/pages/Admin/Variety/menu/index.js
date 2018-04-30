// pages/Admin/menu/index/index.js
var config = require('../../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    selected: true,
    showModalStatus: "hide",
    datas: null,
    host:null,
    foodclass:null,
    foodInfo:null,
    edits:null
  },
  // 删除菜品
  delfoods:function(e){
    var THIS = this;
    app.post(
      config.foods.delete, {
        "token": wx.getStorageSync('token'),
        'id': e.currentTarget.dataset.id
      }, function (res) {
        if (res.data.errNum == 0) {
          app.point(res.data.retMsg,'success');
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
        }
      }
    );
  },
  // 修改菜品信息
  editfoods:function(e){
    var i = e.currentTarget.dataset.index;
    wx.setStorageSync('editfoods', this.data.datas[i]);
    app.baseUrl('/pages/Admin/Variety/editlist/editlist');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this;
    app.post(
      config.service.foods, {
        "token": wx.getStorageSync('token')
      }, function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            foodclass: res.data.retData
          })
        }
      }
    );
    app.post(
      config.service.foodsList, {
        "token": wx.getStorageSync('token')
      }, function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            host: config.service.host,
            datas: res.data.retData
          })
        }
      }
    );
  },
  /**
   * 搜索菜品
   */
  search:function(e){
    var THIS = this;
    app.post(
      config.service.foodsList, {
        "token": wx.getStorageSync('token'),
        "food_name_search": e.detail.value.food_name_search
      }, function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            host: config.service.host,
            datas: res.data.retData
          })
        }
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
  select: function (e) {
    if ('w' == e.currentTarget.dataset.w) {
      this.setData({
        select: false,
        selected: true
      })
    } else if ('y' == e.currentTarget.dataset.y) {
      this.setData({
        select: true,
        selected: false
      })
    }
  },
  
  infomation:function(e){
    var i = e.detail.value.attr
    this.setData({
      host: config.service.host,
      foodInfo:this.data.datas[i]
    })
    var THIS = this
    setTimeout(function () { 
      THIS.setData({
        showModalStatus:"show"
      })
    },1000)
  },

  close:function(){
    this.setData({
      showModalStatus:"hide"
    })
  },
  // 添加菜品分类
  adds:function(){
    app.baseUrl('/pages/Admin/Variety/cate/cate');
  },
  // 添加菜品列表
  cates:function(){
    app.baseUrl("/pages/Admin/Variety/addlist/addlist");
  },
  // 删除菜品列表
  removes:function(e){
    var THIS=this;
    app.post(
      config.service.menuRemove, {
        "token": wx.getStorageSync('token'),
        "class_id": e.currentTarget.dataset.remid
      }, function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            host: config.service.host,
            datas: res.data.retData
          })
          app.point(res.data.retMsg, "success");
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
        } else {
          app.point(res.data.retMsg, "none");
        }; 
      }
    );
  },

  formSubmit:function(e){
    wx.setStorageSync('key', e.detail.value);
    app.baseUrl('/pages/Admin/Variety/edit/edit');
  }
})