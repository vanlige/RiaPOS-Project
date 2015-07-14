angular.module('userCtrl', ['userService'])
//use controller for the main page
//注入用户的工厂inject the user factory
.controller('userController', function(User) {

	var vm = this;

	// 设置一个有效进程显示正在加载中set a processing variable to show loading things
	vm.processing = true;

	// 获取所有用户信息
	User.all()
		.success(function(data) {

			// 完成获取，进程失效
			vm.processing = false;

			// 绑定数据回vm.users
			vm.users = data;
		});

	// 删除用户
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {

				// 重新获取所有刷新表格
				// 也可以在api中
				// 返回用户信息
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};

})

// 一个应用在创建用户页面的控制器
.controller('userCreateController', function(User) {
	
	var vm = this;

	// 显示或隐藏编辑或创建页面
	// 区分编辑或创建两个页面
	vm.type = 'create';

	// 创建用户
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// 使用userService里的create函数
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
			
	};	

})

// 一个应用在创建用户页面的控制器
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	// 显示或隐藏编辑或创建页面
	// 区分编辑或创建两个页面
	vm.type = 'edit';

	// 获取要编辑的用户
	// $routeParams 我们从URL获取数据的方法
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

	// 保存用户
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// 使用userService中update方法
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;

				// 清除表单
				vm.userData = {};

				// 绑定返回信息从API到vm.message
				vm.message = data.message;
			});
	};

})

.controller('userCheckController',function($routeParams,User){
		var vm = this;

		// 获取要编辑的用户
		// $routeParams 我们从URL获取数据的方法
		User.get($routeParams.user_id)
			.success(function(data) {
				vm.userData = data;
			});
	});