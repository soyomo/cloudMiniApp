const app = getApp()

Component({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: 'demo',
    chatRoomGroupName: '聊天室',

    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  },
  lifetimes: {
    created: function() {
      wx.setNavigationBarTitle({
        title: '聊天室'//页面标题为路由参数
      })
      console.log(this, 'ssss')
      this.setData({
        onGetUserInfo: this.onGetUserInfo.bind(this),
        getOpenID: this.getOpenID.bind(this),
      })
      // 在组件实例进入页面节点树时执行
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
      wx.getSystemInfo({
        success: res => {
          console.log('system info', res)
          if (res.safeArea) {
            const { top, bottom } = res.safeArea
            this.setData({
              containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
            })
          }
        },
      })
    },
  },
  methods: {
    getOpenID: async function() {
      if (this.openid) {
        return this.openid
      }
  
      const { result } = await wx.cloud.callFunction({
        name: 'login',
      })
  
      return result.openid
    },
  
    onGetUserInfo: function (e) {
      console.log(this, 'thishisis')
      if (!this.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      }
    },
  
    onShareAppMessage() {
      return {
        title: '即时通信 Demo',
        path: '/pages/im/room/room',
      }
    }
  }
})
