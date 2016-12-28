angular.module('starter.controllers', ['ngCordova'])
.controller('LoginCtrl', function(Apprsal, $scope, $stateParams, $scope, $http, $ionicLoading, $ionicHistory, $state) {
	Apprsal.userSelectedData().email = "";
	
	$scope.postForm = function(dataForm){
		$ionicLoading.show({
			template: 'Verifying...',
			duration: 2000
		});
		var encodedString = 'action=' +
				encodeURIComponent("checklogin") +
				'&email=' +
				encodeURIComponent(dataForm.datausername) +
				'&password=' +
				encodeURIComponent(dataForm.datapassword);
		$scope.errorMsg = ""; //reset the error message
		$http({
				method: 'POST',
				url: 'http://cums.the-v.net/site.aspx',
				data: encodedString,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
				//console.log(data);
				$ionicLoading.hide();
				dataForm.datapassword = "";
				if ( data[0]["Data"] === '') {
					$scope.errorMsg = "Incorrect username or password";
					$("#mypass").focus();
				} 
				else if ( data[0]["Data"] != '')  {
					Apprsal.setEmail(dataForm.datausername);
					Apprsal.setUserId(data[0]["Data"]);
					$ionicHistory.nextViewOptions({
					  disableBack: true
					});
					$state.go('app.main');
				}
			})
			.error(function(data, status, headers, config) {
				$scope.errorMsg = 'Unable to submit form' + status;
				$ionicLoading.hide();
			})

	}
})

.controller('AppCtrl', function(Apprsal, $scope, $ionicModal, $timeout, $http, $ionicLoading) {
	$scope.mytitle ="Chief's Wednesday Message";
	$scope.$on('$ionicView.enter', function() {
		 if (Apprsal.userSelectedData().email == "")
			{
				loadDataNonLogin();
			}
			else
			{
				loadDataProLogin();
			}
	})
	var loadDataNonLogin = function() {
		$ionicLoading.show({
		  template: 'Loading...'
		});
		var encodedString = 'action=' +
				encodeURIComponent("Video_GetSearch") +
				'&word=' +
				encodeURIComponent("Wednesday") +
				'&count=4&page=1';
		$http({
				method: 'POST',
				url: 'http://cums.the-v.net/site.aspx',
				data: encodedString,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
				$scope.myvideos = data;
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$scope.errorMsg = 'Unable to submit form' + status;
				$ionicLoading.hide();
			})
	}
	var loadDataProLogin = function() {
		$ionicLoading.show({
		  template: 'Loading...'
		});
		var encodedString = 'action=' +
				encodeURIComponent("Video_GetSearch") +
				'&word=' +
				encodeURIComponent("Wednesday") +
				'&count=20&page=1';
		$http({
				method: 'POST',
				url: 'http://cums.the-v.net/site.aspx',
				data: encodedString,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
				$scope.myvideos = data;
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$scope.errorMsg = 'Unable to submit form' + status;
				$ionicLoading.hide();
			})
	}
	
	if (Apprsal.userSelectedData().email == "")
	{
		loadDataNonLogin();
	}
	else
	{
		loadDataProLogin();
	}
 
})

.controller('VidCtrl', function($scope,  $location, $http,$ionicHistory) {
  //console.log($location.search()["id"]);
  $scope.bcid = "4727635811001";
  $scope.mytitle = $location.search()["num"];
  $scope.myGoBack = function() {
	$("#myframe").attr("src","");
    $ionicHistory.goBack();
  };
  $("#myframe").attr("src","http://players.brightcove.net/3745659807001/67a68b89-ec28-4cfd-9082-2c6540089e7e_default/index.html?videoId="+ $location.search()["id"]);
  
  var encodedString = 'action=' +
				encodeURIComponent("Video_GetDetails") +
				'&idorname=' +
				encodeURIComponent($location.search()["id"]);
  $http({
				method: 'POST',
				url: 'http://cums.the-v.net/site.aspx',
				data: encodedString,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
				$scope.mydescription = data[0].description;
				$scope.mylanguage = data[0].language;
				$scope.myplay = data[0].plays;
				$scope.myview = data[0].views;
				$scope.mycomments = data[0].comments;
			})
			.error(function(data, status, headers, config) {
				$scope.errorMsg = 'Unable to submit form' + status;
				//$ionicLoading.hide();
			})
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
