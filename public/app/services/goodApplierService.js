/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodApplierService', [])

    .factory('GoodApplier', function($http) {

        // create a new object
        var goodApplierFactory = {};

        // get a single goodApplier
        goodApplierFactory.get = function(id) {
            return $http.get('/api/goodAppliers/' + id);
        };

        // get all goodAppliers
        goodApplierFactory.all = function() {
            return $http.get('/api/goodAppliers/');
        };

        // create a goodApplier
        goodApplierFactory.create = function(goodApplierData) {
            return $http.post('/api/goodAppliers/', goodApplierData);
        };

        // update a goodApplier
        goodApplierFactory.update = function(id, goodApplierData) {
            return $http.put('/api/goodAppliers/' + id, goodApplierData);
        };

        // delete a goodApplier
        goodApplierFactory.delete = function(id) {
            return $http.delete('/api/goodAppliers/' + id);
        };

        // return our entire goodApplierFactory object
        return goodApplierFactory;

    });