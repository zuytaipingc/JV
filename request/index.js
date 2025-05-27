
//设置base_url
let base_url = "http://localhost:8080"
//设置上传地址
let oss_url = "http://localhost:8080/common/upload" 

let access_token = null

//封装请求方法request
function request(url,methodType,query={},data={}){
  //判断是否query是否为空对象
  if(Object.keys(query).length > 0) {
    let queryStr = ''
    //遍历query对象
    for(let key in query) {
      queryStr += `${key}=${query[key]}&`
    }
    //去掉最后一个&
    queryStr = queryStr.slice(0,-1)
    //拼接请求完整路径
    url = `${url}?${queryStr}`

  }

  //拼接请求完整路径
  let fullUrl = `${base_url}${url}`
  //获取token
  let token = wx.getStorageSync('token') ? wx.getStorageSync('token') : null
  //设置loading提示框 注意需要手动调用wxwx.hideLoading()才可以隐藏提示框
  wx.showLoading({title: '请求中',})
  //返回promise实例
  return new Promise((resolve,reject)=>{
    wx.request({
      url: fullUrl,
      method: methodType,
      data: data,
      header:{
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      success(res){
        // 本地存储中获取userInfo
        const user = wx.getStorageSync('userInfo')
        //根据res的code值判断请求成功状态
        if(res.data.code == 200) {
          resolve(res.data)
          wx.hideLoading()
        } else if(res.data.code == 401 && user) {
          //如果code值为401 说明token过期或者token无效 同时判断本地存储中是否有userInfo 如果有就调用登录方法重新登录
          //调用登录方法重新登录
          login().then(res=>{
            //登录成功后重新调用request方法
            console.log(res,'401重新res');
          })
        } else {
          wx.hideLoading()
          // reject(res.msg)
          //提示请登录并跳转到登录页面
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
          // 退出后重定向跳转到登录页面
          wx.reLaunch ({
            url: '/pages/login/index',
          })
        }
      },
      fail(err){
        console.log("走了这里");
        wx.showToast({
          title: '接口请求错误',
          icon: 'none'
        })
        reject(err)
        wx.hideLoading()
      }
    })
  })
}
/**
 * 封装登录方法login
 * 登录分两步
 *    第一步使用wx.login获取code值
 *    第二步调用登录接口 把code和用户类型传递过去调用成功后获取token并保存
 * */
function login(query){
  return new Promise((resolve,reject)=>{
    //调用wx.login实现登录
    wx.login({
      success(res) {
        if(res.code) {
          //解构出code
          let {code} = res
          //发送网络请求登录
          const url = `/wechart/login`
          let data = {
            code,
            ...query
          }
          // console.log(data,'data');
          request(url,'post',data,{}).then(res=>{
            if(res.code == 200) {
              let {token} = res.data
              //获取到token后存储再本地缓存指定的key中
              wx.setStorage({
                key:'token',
                data:token
              })
              //保存一份token
              access_token = token
              resolve(res)
              // console.log(wx.getStorageSync('token'),123);
            } else {
              reject(res)
            }
          })
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

//导出base_url 和 oss_url
module.exports = {
  base_url,
  oss_url,
  request,
  login
}
