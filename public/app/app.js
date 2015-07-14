angular.module('userApp',
	[
		'ngTable',
		'mgcrea.ngStrap',
		'ngAnimate',
		'app.routes',
		/*'routeStyles',*/
		'authService',
		'mainCtrl',
		'posCtrl',
		'goodApplierCtrl',
		'goodApplierService',
		'goodBrandCtrl',
		'goodBrandService',
		'goodCateCtrl',
		'goodCateService',
		'goodCtrl',
		'goodService',
		'userCtrl',
		'userService',
		'clientCtrl',
		'clientService'

	])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});