package cn.edu360.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

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

	
	
	

}
