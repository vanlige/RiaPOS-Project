/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodBrandService', [])

    .factory('GoodBrand', function($http) {

        // create a new object
        var goodBrandFactory = {};

        // get a single goodBrand
        goodBrandFactory.get = function(id) {
            return $http.get('/api/goodBrands/' + id);
        };

        // get all goodBrands
        goodBrandFactory.all = function() {
            return $http.get('/api/goodBrands/');
        };

        // create a goodBrand
        goodBrandFactory.create = function(goodBrandData) {
            return $http.post('/api/goodBrands/', goodBrandData);
        };

        // update a goodBrand
        goodBrandFactory.update = function(id, goodBrandData) {
            return $http.put('/api/goodBrands/' + id, goodBrandData);
        };

        // delete a goodBrand
        goodBrandFactory.delete = function(id) {
            return $http.delete('/api/goodBrands/' + id);
        };

        // return our entire goodBrandFactory object
        return goodBrandFactory;

    });