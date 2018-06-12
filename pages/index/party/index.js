//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    aId:0,
    activity: null,
    users:null,
  },
  onLoad: function (options) {
    //页面传参
    this.setData({
      aId: options.id
    })    
    this.initActivityDetail(options.id);
    this.initActivityUsers(options.id);

  },
  initActivityDetail:function(acId){
    var that = this;

    wx.request({
      url: app.globalData.url + 'activities/' + acId,
      success(res) {
        var activity = res.data.activity;
        activity.timeFormat = util.formatTimeNoS(new Date(activity.time));
        that.setData({
          activity: activity
        })
      },
      fail(dt) {
      }
    });
  },
  initActivityUsers: function (acId) {
    var that = this;

    wx.request({
      url: app.globalData.url + 'activities/' + acId+'/users',

      success(res) {
        var users = res.data.users;
        for (var i = 0; i < users.length; i++) {
          if (users[i].status == 1) {
            users[i].statusUrl = '../../../images/tab_me_re.jpg';
            users[i].statusText = '已到';
          } else if (users[i].status == 0) {
            users[i].statusUrl = '../../../images/tab_me_ye.jpg';
            users[i].statusText = '未到';
          } else {
            users[i].statusUrl = '../../../images/tab_me_h.jpg';
            users[i].statusText = '失约';
          }
        }
        that.setData({
          users: users
        })
      },
      fail(dt) {
      }
    });
  }
})
