package cn.edu360.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu360.pojo.User;
import cn.edu360.service.UserService;

@Controller
public class UserController {
	
	
	@Autowired
	public UserService userService;
	
	@RequestMapping("/user/genCode")
	@ResponseBody
	public boolean genVerifyCode(String countryCode,String phoneNum) {
	 boolean flag = userService.sendMsg(countryCode,phoneNum);
		return flag;
		
		
	}
	
	
	
	//响应手机验证信息
   @RequestMapping("/user/verify")
   @ResponseBody
	public boolean verifyCode(String phoneNum,String verifyCode) {		
	     
      return  userService.verifyCode(phoneNum,verifyCode);
		
	}
   
   
   //响应用户注册信息
   @RequestMapping("/user/register")
   @ResponseBody
   public boolean reg(@RequestBody User user) {//我们可以在参数前面加requestbody，可以用来接受json数据，然后set到对应的实体类中去
	   //调用service，将用户的数据保存出来
	   boolean flag = true;  
	   try {
		userService.register(user);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		flag = false;
	} 
	   return flag;
	  
   }
   
   
   //交押金信息
   @RequestMapping("/user/deposite")
   @ResponseBody
   public boolean deposite(@RequestBody User user) {
	   
	   boolean flag = true;
	   try {
		userService.updata(user);
	} catch (Exception e) {
		
		e.printStackTrace();
		flag = false;
	}
	   return flag;
   }
	

}
