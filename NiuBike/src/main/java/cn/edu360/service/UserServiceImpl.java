package cn.edu360.service;


import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;

import cn.edu360.pojo.User;

@Service
public class UserServiceImpl implements UserService {

    
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	
    
	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	@Override
	public boolean sendMsg(String countryCode, String phoneNum) {		
		boolean flag = true;
  
		// 调用腾讯云的短信api
		int appid = Integer.parseInt(stringRedisTemplate.opsForValue().get("appid"));
		String appkey = stringRedisTemplate.opsForValue().get("appkey");
		
		//生成一个短信验证码,也就相当于一个随机的数字（4-6位）
	   String code =  (int)((Math.random()* 9 + 1) * 1000) + " ";
		SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
	    SmsSingleSenderResult result = null;
		try {	
			//向用户对应手机号发送短信
			result = ssender.send(0, countryCode, phoneNum, "你的短信验证码为:" +  code, "", "");
			//将发送的手机号作为key 验证码作为value 保存到redis当中
			
			stringRedisTemplate.opsForValue().set(phoneNum, code,300, TimeUnit.SECONDS);
		}catch (Exception e) {
			// TODO Auto-generated catch block
			flag = false;
			e.printStackTrace();
		}
	   
		return flag;
		
		
		
		
		
		
		
	}

	@Override
	public boolean verifyCode(String phoneNum, String verifyCode) {
		//调用redis，根据手机号的key，查找对应的验证码
		
		boolean flag  = false;
	String code = 	stringRedisTemplate.opsForValue().get(phoneNum);
	     
	//Redis中间保留的真实验证码
	   if(code != null || verifyCode.equals(code)) {
		      //将用户传入验证码和实际验证码进行对比校验，如果验证码在redis中存在
		   return true;
	   }
	   
	   else {   
		return flag;
	   }
	}

	@Override
	public void register(User user) {
	
		//调用mongdb的dao,将用户数据保存
	   	mongoTemplate.insert(user);

	}

	//用户更新实现类
	@Override
	public void updata(User user) {
	
		
		//如果数据不存在，就插入，存在就更新
		//根据用户手机信息，进行更新
		
        //mongoTemplate.insert(user);
		
		//更新用户数据进行匹配
		mongoTemplate.updateFirst(new Query(Criteria.where("phoneNum").is(user.getPhoneNum())), 
				Update.update("deposite", user.getDeposite()), "users");
	}

}
