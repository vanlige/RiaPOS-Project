/**
 * Created by Jason on 15/7/13.
 */

var app = angular.module('posCtrl', ['ngGrid','']);

app.controller('posController', ['$scope', '$http', function ($scope, $http) {
    $scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
            {name: 'name'},
            {name: 'gender'},
            {name: 'company'}
        ]
    }

}]);
