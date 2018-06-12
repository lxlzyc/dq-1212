//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    //背景
    background: ['../../images/dqxy.jpg', '../../images/bg-carousel-02.jpg','../../images/bg-carousel-03.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    maskshow: app.globalData.maskshow,
    activities: [],//活动list数据

  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  test_party: function(){
    wx.navigateTo({
      url: './audio/audio'
    })
  },

  // testhttp: function(){
    
  //   wx.request({
  //     url: `http://lxlzyc.club:8080/test/jdbc`,
  //     data: {},
  //     header: { 'Content-Type': 'application/json' },
  //     success: function (res) {
  //       wx.showToast({
  //         title: res,
  //         icon: 'success',
  //         duration: 2000
  //       })  
  //     }
  //   }) 
  // },
  userLogin:function(){
    console.info('user click button onlogin');
    app.onLogin();
  },
  onLoad: function () {
    var that = this;

    if (wx.getStorageSync('islogin') || app.globalData.islogin ) {
      console.info("onload success");
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      console.info("onload fail");
      that.showMask();
    }
    wx.request({
      url: app.globalData.url + 'activities',
      success(res) {
        var activities = res.data.activities;
        for (var i = 0; i < activities.length; i++) {
          activities[i].timeFormat = util.formatTimeNoS(new Date(activities[i].time));
          activities[i].info = (activities[i].info).length > 23 ? (activities[i].info).substring(0,20) + '...' : activities[i].info;
        }
        that.setData({
          activities: activities
        })
      },
      fail(dt) {
      }
    });
  },
  showMask:function(){
    this.setData({
      maskshow: 1
    });
  },
  bindGetUserInfo: function (e) {
    console.log("bindGetUserInfo")
    //回调
    app.wxGetUserInfo(this.regetMaskShow);
    
  },
  regetMaskShow:function(maskshow){
    var that = this;
    that.setData({
      maskshow: maskshow
    })
  },
    goActivityDetail: function (e) {
    console.info(e.currentTarget.dataset.id);
    console.info(e.currentTarget.dataset.type);
    if (e.currentTarget.dataset.type == 1) {
      // type1 聚餐
      wx.navigateTo({
        url: './party/index?id=' + e.currentTarget.dataset.id
      })
    }
  },
  createActivity: function () {
    wx.navigateTo({
      url: './activity/index'
    })
  }
})
