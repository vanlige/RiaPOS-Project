/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodCateService', [])

    .factory('GoodCate', function($http) {

        // create a new object
        var goodCateFactory = {};

        // get a single goodCate
        goodCateFactory.get = function(id) {
            return $http.get('/api/goodCates/' + id);
        };

        // get all goodCates
        goodCateFactory.all = function() {
            return $http.get('/api/goodCates/');
        };

        // create a goodCate
        goodCateFactory.create = function(goodCateData) {
            return $http.post('/api/goodCates/', goodCateData);
        };

        // update a goodCate
        goodCateFactory.update = function(id, goodCateData) {
            return $http.put('/api/goodCates/' + id, goodCateData);
        };

        // delete a goodCate
        goodCateFactory.delete = function(id) {
            return $http.delete('/api/goodCates/' + id);
        };

        // return our entire goodCateFactory object
        return goodCateFactory;

    });