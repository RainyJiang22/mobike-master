package cn.edu360.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="bikes")
public class Bike {
   
   
	
	//主键特点：唯一性，建立索引     id对应的是mongodb中的_id
	
	

	@Id
	private String id;
//	
//	private double longitude;
//	
//	private double latitude;
//	
   
	//表示经纬度的数组【经度，纬度】
	@GeoSpatialIndexed(type=GeoSpatialIndexType.GEO_2DSPHERE)
	private double[] location;
    
	//建立索引，bikeNo以后建立索引
	@Indexed
	private Long bikeNo;


	private int status;
	
	
	
	
	public Long getBikeNo() {
		return bikeNo;
	}

	public void setBikeNo(Long bikeNo) {
		this.bikeNo = bikeNo;
	}
	
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

//	public double getLongitude() {
//		return longitude;
//	}
//
//	public void setLongitude(double longitude) {
//		this.longitude = longitude;
//	}
//
//	public double getLatitude() {
//		return latitude;
//	}
//
//	public void setLatitude(double latitude) {
//		this.latitude = latitude;
//	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public double[] getLocation() {
		return location;
	}

	public void setLocation(double[] location) {
		this.location = location;
	}
	
	

}
