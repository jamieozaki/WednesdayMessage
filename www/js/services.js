angular.module('starter.services', [])

.factory('Apprsal', function($rootScope, $http) {
	var userEmail;
	var userID;
  var userSelectedData = {
		email: "",
		userid:"",
		
	};
  
  return {
	setEmail:function(pmail)
	{
		userSelectedData.email = pmail;
	},
	setUserId:function(pid)
	{
		userSelectedData.userid = pid;
	},
	userSelectedData:function(){
		return userSelectedData;
	}
  };
});