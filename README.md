# mobike-master
基于本地服务器搭载的共享单车小程序


关于服务器的配置，主要通过Spring工具进行搭载

下面是Spring boot的下载方式
首先到http://start.spring.io/地址，生成web环境的pow，进行简单的环境配置

然后到spring boot的官网进行下载

http://spring.io/tools/sts/all/


接着要进行mongodb的搭载

可以到官网下载，地址如下
https://www.mongodb.com/download-center?jmp=nav#community

mongodb官网提供的mongodb的windows版本下载，在安装的时候由于windows本身的环境支持会出现很多问题

建议直接到该网址下的 All Version Binaries中下载
我使用的版本是mongodb-win32-x86_64-2008plus-ssl-3.6.2

redis的安装也很简单
https://redis.io/download 但是redis不提供window用户进行安装
微软也在GitHub开放了支持redis的windows版本

将api导入spring boot工具中

腾讯云信息服务也配置到相应的界面中，appkey和appid另外自己去申请
