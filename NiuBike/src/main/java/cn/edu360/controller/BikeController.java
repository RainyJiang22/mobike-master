package cn.edu360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu360.pojo.Bike;
import cn.edu360.service.BikeService;
/**
 *标记这个类是一个用于介绍请求和相应用户的一个控制器
 *加上 Spring就可以进行实例化
 *
 * @author Jacky
 *
 */


@Controller
public class BikeController {
 
  
	//在spring容器中，查看BikeService类型中的实例，然后注入到BikeController中间
	@Autowired	
	private BikeService bikeService;
	
	
	//注入本地服务器
  @RequestMapping("/bike/add")	
  @ResponseBody
	public String add(@RequestBody Bike bike) {
	 
	  
	
//	  System.out.println(bike);
	  
	  //调用service,将数据保存到mongodb中
	 bikeService.save(bike);
	  
      return "success";	
  }
  
  
  
  
  //通过ajex请求
  @RequestMapping("/bike/findnear")	
  @ResponseBody
	public List<GeoResult<Bike>> findnear(double longitude,double latitude) {
	   
//	  System.out.println(bike);
	  //调用service,将数据保存到mongodb中
	List<GeoResult<Bike>> bikes  =  bikeService.findnear(longitude,latitude);
	 return bikes;	
  }
  
}
