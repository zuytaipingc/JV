//导入request接口文件
const api = require("../request/index");
module.exports = {
  //注册接口
  registerAccount: function (data) {
    return api.request(
      '/wechart/register',//请求地址
      'post',//请求方法
      {},//请求头，默认空对象
      data//发送的请求体数据
    )
  },
  // 设备类别列表
  equipTypeList: function (query) {
    return api.request(
      '/wechart/device/typeList',
      'get',
      query
    )
  },
  //获取设备列表
  equipList: function (query) {
    return api.request(
      '/wechart/device/deviceList',
      'get',
      query   //查询参数
    )
  },
  //获取设备详情
  equipDetail: function (query) {
    return api.request(
      '/wechart/device/deviceInfo',
      'get',
      query
    )
  },
  //获取借用记录
  borrowList: function (query) {
    return api.request(
      '/wechart/device/borrowList',
      'get',
      query
    )
  },
  //借用设备
  borrowEquip: function (data) {
    return api.request(
      '/wechart/device/borrowDevice',
      'post',
      {},
      data
    )
  },
  //归还设备
  returnEquip: function (data) {
    return api.request(
      '/wechart/device/returnDevice',
      'post',
      {},
      data
    )
  }
}