// pages/myOrderList/index.js
// 导入封装好的接口
const http = require('../../api/http');
const request = require('../../request/index');
Page({
  data: {
    // 默认选中第一个tab
    activeTab:0,
    equipList:[],
    // 传递过来的设备状态
    returnStatus:0,
    url:request.base_url
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面参数
    if (options.selectedTab) {
      console.log(options,'options');
      this.setData({
        activeTab: Number(options.selectedTab)
      })
    }
    // 如果传递过来的参数是using 说明是从设备归还按钮跳转过来的
    if(options.using){
      console.log(88);
      // 获取借用中的设备列表接口
      const query = {
        returnStatus: 0
      }
      this.getAllBorrowingList(query)
    } else {
      // 获取页面信息
      this.getAllBorrowingList()
    }
  },
  // 获取所有借用记录信息
  getAllBorrowingList(query){
    // 调用接口
    http.borrowList(query).then(res=>{
      console.log(res,"res");
      if(res.code === 200){
        // 保存数据
        this.setData({
          equipList:res.data
        })
      }
    })
  },
  // changeTab(event) {
  //   console.log(event.detail,"event.detail")
    // 根据detail中index的值传递不同的参数 index  0:全部 1:借用中 2:已归还  
    // return_status  0未归还 1已归还
  //   const query = {
  //     returnStatus: event.detail.index === 0 ? '' : event.detail.index - 1
  //   }
  //   this.getAllBorrowingList(query)
  // }
  changeTab(event) {
    const statusMap = {
      0: '',       // 全部
      1: 0,        // 借用中 -> 申请借用(0)
      2: 3         // 已归还 -> 已归还(3)
    }
    const query = {
      returnStatus: statusMap[event.detail.index]
    }
    this.getAllBorrowingList(query)
  }

})