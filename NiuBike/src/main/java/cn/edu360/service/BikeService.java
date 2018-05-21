package cn.edu360.service;

import java.util.List;

import org.springframework.data.geo.GeoResult;

import cn.edu360.pojo.Bike;

public interface BikeService {

	
	//将Bike的信息存入到Spring容器中
  public void save(Bike bike);

public List<GeoResult<Bike>> findnear(double longitude, double latitude);
   
	
	
	
}
