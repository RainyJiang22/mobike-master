# mobike-master
基于本地服务器搭载的共享单车小程序


## 关于服务器的配置，主要通过Spring工具进行搭载

下面是Spring boot的下载方式
 - 首先到http://start.spring.io/地址
      生成web环境的pow，进行简单的环境配置
 - 然后到spring boot的官网进行下载
      http://spring.io/tools/sts/all/


 - 接着要进行mongodb的搭载
   可以到官网下载，地址如下
https://www.mongodb.com/download-center?jmp=nav#community

### mongodb官网提供的mongodb的windows版本下载，在安装的时候由于windows本身的环境支持会出现很多问题
   建议直接到该网址下的 All Version Binaries中下载
   我使用的版本是mongodb-win32-x86_64-2008plus-ssl-3.6.2

### redis的安装也很简单
https://redis.io/download 但是redis不提供window用户进行安装
微软也在GitHub开放了支持redis的windows版本

### 将api导入spring boot工具中
腾讯云信息服务也配置到相应的界面中，appkey和appid另外自己去申请


### GeoHash的使用

 - 首先，GeoHash用一个字符串表示经度和纬度两个坐标。某些情况下无法在两列上同时应用索引（例如MySQL 4之前的版本，Google App Engine的数据层等），利用GeoHash。只需要在一列上应用索引即可。
 - 其次，GeoHash表示的并不是一个点，而是一个矩形区域。比如编码wx4g0ec19，它表示的是一个矩形区域。使用者可以发布地址编码，既能表明自己位于北海公园附近，又不至于暴露自己的精确坐标，有助于隐私保护。
 - 第三，编码的前缀可以表示更大的区域。例如，wx4g0ec1，它的前缀wx4g0e表示包含编码wx4g0ec1在内的更大范围。这个特性可以用于附近地点搜索。首先根据用户当前坐标计算GeoHash（例如wx4g0ec1），然后取其前缀进行查询（SELECT * FROM place WHERE geohash LIKE 'wx4g0e%'），即可查询附近的所有地点。

#### GeoHash比直接用经纬度的高效很多
具体了解请看一些博文，如下：
 - https://blog.csdn.net/universe_ant/article/details/74785989
 - https://www.cnblogs.com/aiweixiao/p/6188081.html


### 结束语
  关于这个项目主要使用了SpringBoot进行后台的搭建与编写，期间出现了许多问题，也参照了别人的很多思想，对微信小程序使用SpringBoot+Mongodb的同学开发有兴趣的同学不妨可以试试这个项目，还是可以学到挺多东西的
