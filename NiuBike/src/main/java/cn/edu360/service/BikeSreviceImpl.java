package cn.edu360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import cn.edu360.pojo.Bike;




@Service
public  class BikeSreviceImpl implements BikeService {

	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	
	@Override
	public void save(Bike bike) {
		
		
		//调用具体的业务，mongodb有特定的mongoTemplate
//		mongoTemplate.insert(bike, "bikes");
		
	
		//使用jpa的方式，根据需要添加注解，更方便更快捷
		//这个是在bike的类中，添加了注解
		mongoTemplate.insert(bike);
		
		
	
	}
  /**
   * 根据当前的经纬度查找附近的单车
   */


	@Override
	public List<GeoResult<Bike>> findnear(double longitude, double latitude) {
//		
//	return mongoTemplate.findAll(Bike.class);
		
		NearQuery nearQuery = NearQuery.near(longitude, latitude);
		//查找附近的范围和单位
		nearQuery.maxDistance(0.4,Metrics.KILOMETERS);
	 GeoResults<Bike> geoResults = mongoTemplate.geoNear(nearQuery.query(new Query(Criteria.where("status").is(0)).limit(20)), Bike.class);
	  
	 
	 
	 return geoResults.getContent();
	}

	
	
	

}
