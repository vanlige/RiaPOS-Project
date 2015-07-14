angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// 主页
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// 登录页面
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
			controllerAs: 'login'
		})
		
		// 用户列表页面
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// 创建用户页面或
		// 编辑用户页面
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// 编辑用户页面
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		//顾客列表页面
		.when('/clients', {
			templateUrl: 'app/views/pages/clients/all.html',
			controller: 'clientController',
			controllerAs: 'client'
		})

		// 创建顾客页面或
		// 编辑顾客页面
		.when('/clients/create', {
			templateUrl: 'app/views/pages/clients/single.html',
			controller: 'clientCreateController',
			controllerAs: 'client',
			/*css: ['css/partial3_1.css','css/partial3_2.css']*/
		})

		// 编辑顾客页面
		.when('/clients/:client_id', {
			templateUrl: 'app/views/pages/clients/single.html',
			controller: 'clientEditController',
			controllerAs: 'client'
		})

		//商品列表页面
		.when('/goods', {
			templateUrl: 'app/views/pages/goods/all.html',
			controller: 'goodController',
			controllerAs: 'good'
		})

		// 创建商品页面或
		// 编辑商品页面
		.when('/goods/create', {
			templateUrl: 'app/views/pages/goods/single.html',
			controller: 'goodCreateController',
			controllerAs: 'good'
		})

		// 编辑商品页面
		.when('/goods/:good_id', {
			templateUrl: 'app/views/pages/goods/single.html',
			controller: 'goodEditController',
			controllerAs: 'good'
		})

		//商品属性-类别
		.when('/goodCates',{
			templateUrl: 'app/views/pages/goodCates/all.html',
			controller: 'goodCateController',
			controllerAs: 'goodCate'
		})

		//商品属性-类别
		.when('/goodCates/create', {
			templateUrl: 'app/views/pages/goodCates/single.html',
			controller: 'goodCateCreateController',
			controllerAs: 'goodCate'
		})

		//商品属性-类别
		.when('/goodCates/:goodCate_id',{
			templateUrl: 'app/views/pages/goodCates/single.html',
			controller: 'goodCateEditController',
			controllerAs: 'goodCate'
		})

		//商品属性-品牌
		.when('/goodBrands',{
			templateUrl: 'app/views/pages/goodBrands/all.html',
			controller: 'goodBrandController',
			controllerAs: 'goodBrand'
		})

		//商品属性-品牌
		.when('/goodBrands/create', {
			templateUrl: 'app/views/pages/goodBrands/single.html',
			controller: 'goodBrandCreateController',
			controllerAs: 'goodBrand'
		})

		//商品属性-品牌
		.when('/goodBrands/:goodBrand_id',{
			templateUrl: 'app/views/pages/goodBrands/single.html',
			controller: 'goodBrandEditController',
			controllerAs: 'goodBrand'
		})

		//商品属性-供应商
		.when('/goodAppliers',{
			templateUrl: 'app/views/pages/goodAppliers/all.html',
			controller: 'goodApplierController',
			controllerAs: 'goodApplier'
		})

		//商品属性-供应商
		.when('/goodAppliers/create', {
			templateUrl: 'app/views/pages/goodAppliers/single.html',
			controller: 'goodApplierCreateController',
			controllerAs: 'goodApplier'
		})

		//商品属性-供应商
		.when('/goodAppliers/:goodApplier_id',{
			templateUrl: 'app/views/pages/goodAppliers/single.html',
			controller: 'goodApplierEditController',
			controllerAs: 'goodApplier'
		})

		.when('/pos',{
			templateUrl: 'app/views/pages/pos/pos.html',
			controller: 'posController',
			controllerAs: 'pos'
		})
	$locationProvider.html5Mode(true);

});
