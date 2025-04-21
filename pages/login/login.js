Page({
  //初始化数据
  data: {
    //用户名
    userName: '',
    //密码
    password: '',
    //用户名焦点
    focusOnUserName: false,
    //密码焦点
    focusOnUserPassword: false
  },
  // 跳转到注册页面
  register() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  //登录
  login() {
    //去除空格
    let data = {
      userName: this.data.userName.replace(/\s+/g, ""),
      password: this.data.password.replace(/\s+/g, ""),

    }
    //整理提交数据 添加校验判断值是否为空
    //校验学号
    if (!data.userName) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      })
      //获取焦点
      this.setData({
        focusOnUserName: true
      })
      return
    }
    // 校验密码
    if (!data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      //获取焦点
      this.setData({
        focusOnUserPassword: true
      })
      return
    }
    //密码长度校验
    if (data.password.length < 6) {
      wx.showToast({
        title: '密码不得少于6位',
        icon: 'none'
      })
      //获取焦点
      this.setData({
        focusOnUserPassword: true
      })
      return
    }
    //发送请求
  }
})