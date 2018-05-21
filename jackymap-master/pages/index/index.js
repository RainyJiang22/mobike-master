// pages/index/index.js
//导包
var myutils = require("../../util/myutils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude: 0,
    controls:[],
    markers:[
      {
        iconPath:'/images/bike.png',
        width:35,
        height:40,
        longitude:"113.02447",
        latitude: "23.13694"
      },
      {
        iconPath: '/images/bike.png',
        width: 35,
        height: 40,
        longitude: "114.02547",
        latitude: "23.13819"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载W
   */
  onLoad: function (options) {
     var that = this;
     //获取当前位置信息
     wx.getLocation({
       success: function(res) {
          var longitude = res.longitude
          var latitude = res.latitude
          
          //获取移动的位置信息
           that.setData({
               longitude :longitude,
               latitude :latitude
           })
           //查找单车
          findBikes(longitude,latitude,that)
       },
        
     })


  //获取系统信息
     wx.getSystemInfo({
       success: function(res) {
          var windowWidth = res.windowWidth;

          // console.log(res.windowHeight);
          // console.log(res.windowWidth);
          
          var windowHeight = res.windowHeight;

          that.setData({
            controls:[
              {
                //中心点位置
                id: 3,
                iconPath: '/images/location.png',
                position: {
                  width: 20,
                  height: 35,
                  left: windowWidth / 2 - 10,
                  top: windowHeight / 2 - 40.
                },
                //是否可点击
                clickable: true
              },           
             {

               //扫码解锁
               id:1,
               iconPath:'/images/qrcode.png',
               position:{
                 width:100,
                 height:40,
                 left:windowWidth/2 - 50,
                 top:windowHeight - 60
               },
                clickable:true
             },
         
           
          
            {
              //定位按钮安置
              id: 2,
              iconPath: '/images/img1.png',
              position: {
                width: 40,
                height: 40,
                left: 10,
                top: windowHeight - 60.
              },
              //是否可点击
              clickable: true
            },
            { //报修
              id: 6,
              iconPath: "/images/warn.png",
              position: {
                width: 35,
                height: 35,
                left: windowWidth - 42,
                top: windowHeight - 60.
              },
              //是否可点击
              clickable: true

            },
            { //添加单车
              id: 5,
              iconPath: "/images/add.png",
              position: {
                width: 35,
                height: 35
              },
              //是否可点击
              clickable: true
            },
            {
              id:6,
              iconPath:"/images/pay.png",
              position:{
                width:40,
                height:40,
                left:windowWidth - 45,
                top:windowHeight - 100
              },
              clickable:true
            }
            ]
          })
       },
     })
  },
   
  cotroltap :function(res){
    var that = this;
    var cid = res.controlId;
  //  console.log(cid);
    switch(cid){
      //点击扫码按钮
      case 1:{
        

        //根据实际的状态来跳转到不同的页面
       var status =  myutils.get("status")
       console.log(status)
       // console.log(status);
       //如果是0的话，跳转到注册页面
        if(status == 0){
            //跳转到手机注册页面
            wx.navigateTo({
              url: '../register/register',
            })
        }
        else if(status == 1){
            //跳转到押金充值页面
            wx.navigateTo({
              url: '../deposite/deposite',
            })
        }
        break; 
      }
      case 2:{
        //回到原来的位置
        this.mapCtx.moveToLocation()
        break;
      }
      //添加车辆
      case 5:{
        //获取当前已有的车辆
        // var bikes = that.data.markers;
        this.mapCtx.getCenterLocation({
          success: function (res) {
            // console.log(res.longitude)
            // console.log(res.latitude)
            var log = res.longitude;
            var lat = res.latitude;
      //       //在移动后的位置添加一辆单车
      //       bikes.push(
      //         {
      //           iconPath: '/images/bike.png',
      //           width: 35,
      //           height: 40,
      //           longitude: log,
      //           latitude: lat
      //         }
      //       )
      //       //  console.log("add a bike")
      // //重新赋值
      //       that.setData({
      //         markers: bikes
      //       })

         //发送请求，将添加的单车信息数据发送到后台中
          wx.request({
            url: 'http://localhost:9000/bike/add',
            data: {
              // "longitude": log,
              // "latitude": lat,
              // bikeNo:10010,
              location:[log,lat],
              status: 0
            },
            method: 'POST',
            success:function(res){
              //查找单车,然后把单车显示到对应的页面
               console.log(res)
              findBikes(log,lat,that);  
            }
          })
          }
        })
       break;
      }

      //报修单车
      case 6:{
        //点击跳转到报修页面
         wx.navigateTo({
           url: '../warn/warn',
         })

        break;
      }    
    }
  },

/**
 * 移动后地图位置发生变化
 */
  regionchange:function(e){
    var that = this;
    // console.log(e)
    var etype = e.type;
    if(etype == 'end'){
      // console.log(e)
      //添加单车，根据经纬度添加单车
      this.mapCtx.getCenterLocation({
        success: function (res) {
            var log = res.longitude;
            var lat =  res.latitude;
            findBikes(log,lat,that);
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     //创建map上下文
  // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')

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


function findBikes(longitude,latitude,that){
  wx.request({
      url:"http://localhost:9000/bike/findnear",
      method:'GET',
      data:{
        longitude:longitude,
        latitude:latitude
      },
      success:function(res){
    //打印下返回结果
    //这里的数组是返回一个array对象
      // console.log(res);

        var bikes  = res.data.map((geoResult)  => {
             
            return {
                longitude:geoResult.content.location[0],
                latitude: geoResult.content.location[1],
                id: geoResult.content.id,
                iconPath:"/images/bike.png",
                width:35,
                height:40
            }         
        })

        //将bike的数组set到当前页面中的markers中
             that.setData({
                markers:bikes 
             })

        

          

      }


  })
 }
