// index.js
Page({
    // 跳转设备借用
    equipBorrowingTap(){
        //
        wx.navigateTo({
            url: '/pages/equipList/equipList',
            
        });
    },

    //跳转设备归还
    equipReturnTap(){
        wx.navigateTo({
            url: '/pages/myOrderList/myOrderList',
            
        });
    }
})
