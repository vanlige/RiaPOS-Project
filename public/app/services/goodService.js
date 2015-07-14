angular.module('goodService', [])

.factory('Good', function($http) {

	// create a new object
	var goodFactory = {};

	// get a single good
	goodFactory.get = function(id) {
		return $http.get('/api/goods/' + id);
	};

	// get all goods
	goodFactory.all = function() {
		return $http.get('/api/goods/');
	};

	// create a good
	goodFactory.create = function(goodData) {
		return $http.post('/api/goods/', goodData);
	};

	// update a good
	goodFactory.update = function(id, goodData) {
		return $http.put('/api/goods/' + id, goodData);
	};

	// delete a good
	goodFactory.delete = function(id) {
		return $http.delete('/api/goods/' + id);
	};

	// return our entire goodFactory object
	return goodFactory;

});