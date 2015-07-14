angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {

	var vm = this;

	// 假如已经登录，获取该用户信息
	vm.loggedIn = Auth.isLoggedIn();

	// 检查某用户是否登录在每个请求中
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		// 在页面上加载该用户信息get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// 处理登录表单
	vm.doLogin = function() {
		vm.processing = true;

		// 清理错误信息
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// 如果登录成功重定向到用户界面
				if (data.success){
					/*window.location.reload();*/
					$location.path('/');
					}
				else 
					vm.error = data.message;
				
			});
	};

	// 处理登出
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$location.path('/login');
	};

});
