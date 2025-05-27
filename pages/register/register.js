//导入接口
const http = require('../../api/http');
Page({
  //初始化数据
  data: {
    //部门
    regDept: '',
    // 学号
    regCode: '',
    // 姓名
    regName: '',
    // 手机号
    regMobile: '',
    // 密码
    regPassword: '',
    //聚焦
    focusedField: ''
  },
  // 注册
  register() {
    //去除空格
    let data = {
      regDept: this.data.regDept.replace(/\s+/g, ""),
      regCode: this.data.regCode.replace(/\s+/g, ""),
      regName: this.data.regName.replace(/\s+/g, ""),
      regMobile: this.data.regMobile.replace(/\s+/g, ""),
      regPassword: this.data.regPassword.replace(/\s+/g, ""),

    }
    //非空校验
    if (!data.regDept || !data.regDept || !data.regDept || !data.regDept || !data.regDept) {
      // 判断哪个字段为空，并设置 focusedField
      if (!this.data.regDept) this.setData({ focusedField: 'regDept' });
      else if (!this.data.regCode) this.setData({ focusedField: 'regCode' });
      else if (!this.data.regName) this.setData({ focusedField: 'regName' });
      else if (!this.data.regMobile) this.setData({ focusedField: 'regMobile' });
      else if (!this.data.regPassword) this.setData({
        focusedField: 'regPassword'
      });
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
      return
    }

    // 校验手机号
    if (!(/^1[3456789]\d{9}$/.test(this.data.regMobile))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }

    //密码长度校验
    if (this.data.regPassword.length < 6) {
      wx.showToast({
        title: '密码不得少于6位',
        icon: 'none'
      })
      return
    }
    //请求参数
    http.registerAccount(data).then(res => {
      console.log(res, 9999);
      if (res.code == 200) {
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        })
          //跳转到登录页面
        this.registerSuccess()
      }else{
        wx.showToast({
          title: '注册失败',
          icon:'none'
        })
        return false
      }
    })
  },
  //跳转到登录页面
  registerSuccess() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})
