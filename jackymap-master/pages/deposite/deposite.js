// pages/deposite/deposite.js
var myUtils = require("../../util/myutils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

   //充值按钮绑定事件
  deposite:function(res){
    var that = this;

   //获取的用户的手机信息
    var phoneNum = myUtils.get("phoneNum");

    wx.showModal({
      title: '提示',
      content: '是否要充值押金',
      confirmText:'确认',
      success:function(res){
          //模拟充值
          if(res.confirm){

             wx.showLoading({
               title: '充值中.....',
               mask:true
             })
            //先调用微信小程序的支付接口，如果成功向后台发送请求
            //然后更新后台的数据库，更新用户的状态
            wx.request({
              url: 'http://localhost:9000/user/deposite',
              method:'POST',
              data:{
                phoneNum:phoneNum,
                deposite:199
              },
              success:function(res){
                 //关闭充值中的加载对话框
                 wx.hideLoading()
                 //跳转到实名认证
                 wx.navigateTo({
                   url: '../indentify/indentify',
                 })
              }
            })
            // console.log("去充值");
          }
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})