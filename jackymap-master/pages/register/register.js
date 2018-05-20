// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     countryCodes:["86","80","84","87","90"],
     countryCodeIndex:0,
     phoneNum :  " "

  },

  inputPhoneNum:function(res){
      var that= this;
   that.setData({
       phoneNum : res.detail.value
       
   })
    
  },

  genVerifyCode:function(){
      //获取国家代码索引
     var index = this.data.countryCodeIndex;
     //根据索引进行取值
     var countryCode = this.data.countryCodes[index];
     //获取输入的手机号码
     var phoneNum = this.data.phoneNum;
     //后台打印出手机号码
      console.log(phoneNum);
       console.log(countryCode);
       //向后台发送请求
        wx.request({
       url: 'http://localhost:9000/user/genCode',
       //发送请求的方式
       method:'GET',
       //传递的参数
       data:{
          "countryCode":countryCode,
          "phoneNum":phoneNum          
       },
       //成功的回调函数
      success:function(res){
        //  console.log(res);

        wx.showToast({
          title: '成功发送',
          duration:2000,
          mask:true
        })
      }
     })




  },


//提交事件
  formSubmit:function(e){
    //  console.log(e);

     //获取手机号
    var phoneNum =  e.detail.value.phoneNum;
    //获取验证码
    var verifyCode = e.detail.value.verifyCode;
    
    //向后台发送请求进行校验

    wx.request({
            url:'http://localhost:9000/user/verify',
      method:"POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
           phoneNum: phoneNum,
           verifyCode:verifyCode
      },
      success:function(res){
          // console.log(res);
          //校验成功 
          if(res.data){
               wx.request({
                 url: 'http://localhost:9000/user/register',
                 method:'POST',
                 data:{
                   phoneNum: phoneNum,
                   regDate :new Date()
                 },
                 success:function(res){
                   if(res.data){ //获取用户信息成功后，跳转到押金充值界面
                      wx.navigateTo({
                        url: '../deposite/deposite',
                      })
                      //将用户的信息记录下来(记录用户的状态)
                     //0 注册 1绑定完手机号了  2已实名认证了

                     //将globalData中的数据，是更新到内存的数据
                      getApp().globalData.status = 1
                      //将用户的手机信息存储起来
                      getApp().globalData.phoneNum = phoneNum

                       //将用户的数据保存到手机的存储卡中
                        wx.setStorageSync("status", 1)
                        wx.setStorageSync("phoneNum", phoneNum)
                         


                   }else{//没有获得信息
                     wx.showModal({
                       title: '提示',
                       content: '服务端错误，请稍后再试',
                     })
                   }
                 }
               })
          } else{
         //校验失败
            wx.showModal({
              title: '提示',
              content: '验证码错误，请重新输入！',
              showCancel:true
            })
          } 
  },

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