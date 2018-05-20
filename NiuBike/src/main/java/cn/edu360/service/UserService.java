package cn.edu360.service;

import cn.edu360.pojo.User;

public interface UserService {
   
	
	
	boolean sendMsg(String countryCode, String phoneNum);

	 boolean verifyCode(String phoneNum, String verifyCode);

	 void register(User user);

	 public void updata(User user);

}
