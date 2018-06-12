//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    users:null,
  },
  onLoad: function (options) {
    //测试---
    console.info(options.userIds);
    var checkedUsers;
    if (!!options.userIds){
      checkedUsers = JSON.parse(options.userIds);
    }
    
    console.info('--'+checkedUsers);

    var that = this;
    wx.request({
      url: app.globalData.url + 'users',
      success: function (res) {
        var users = res.data.users;
        for (var i = 0; i < users.length; i++) {
          if (util.inArray(checkedUsers, users[i].userId)) {
            users[i].checked = true;
          }else{
            users[i].checked = false;
          }
        }
        that.setData({
          users: users
        });
      },
      fail(dt) {
      }
    });

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var checkedUserIds = e.detail.value.users;
    var that = this;
    var users = that.data.users;
    var data = []; 
    
    for (var i = 0; i < users.length; i++) {
      if (util.inArray(checkedUserIds, users[i].userId)) {
        console.info('users[i]');
        data.push(users[i]);
      }
    }
    // JSON.stringify()

    var pages = getCurrentPages();
    // var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      users: data,
      userIds: checkedUserIds,
    });

    wx.navigateBack({
      delta: 1 //返回几层
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }, 
  formReset: function () {
    console.log('form发生了reset事件')
    var that = this;
    this.setData({
      date: that.data.begindate
    });
  },
  formError:function(msg){
    wx.showModal({
      title: '提示',
      content: msg
    });
  },
  formSuccess: function () {
    console.info('success');
  }
  
})
