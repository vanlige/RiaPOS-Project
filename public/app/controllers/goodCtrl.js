/**
 * Created by Jason on 15/6/30.
 */
angular.module('goodCtrl', ['goodService','goodCateService','goodBrandService','goodApplierService'])
//use controller for the main page
//注入用户的工厂inject the good factory
    .controller('goodController', function(Good) {

        var vm = this;

        // 设置一个有效进程显示正在加载中set a processing variable to show loading things
        vm.processing = true;

        // 获取所有用户信息
        Good.all()
            .success(function(data) {

                // 完成获取，进程失效
                vm.processing = false;

                // 绑定数据回vm.goods
                vm.goods = data;
            });

        // 删除用户
        vm.deleteGood = function(id) {
            vm.processing = true;

            Good.delete(id)
                .success(function(data) {

                    // 重新获取所有刷新表格
                    // 也可以在api中
                    // 返回用户信息
                    Good.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.goods = data;
                        });

                });
        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodCreateController', function(Good) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'create';

        // 创建用户
        vm.saveGood = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodService里的create函数
            Good.create(vm.goodData)
                .success(function (data) {
                    vm.processing = false;
                    vm.goodData = {};
                    vm.message = data.message;
                });

        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodEditController', function($routeParams, Good) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'edit';

        // 获取要编辑的用户
        // $routeParams 我们从URL获取数据的方法
        Good.get($routeParams.good_id)
            .success(function(data) {
                vm.goodData = data;
            });

        // 保存用户
        vm.saveGood = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodService中update方法
            Good.update($routeParams.good_id, vm.goodData)
                .success(function(data) {
                    vm.processing = false;

                    // 清除表单
                    vm.goodData = {};

                    // 绑定返回信息从API到vm.message
                    vm.message = data.message;
                });
        };

    })

    .controller("good_ngTypeSelect",function($scope){

        var vm = $scope.vm = {};

        //数组对象用来给ng-options遍历
        vm.optionsData_type = [{
            id : "1",
            title : "现货"
        },{
            id : "2",
            title : "缺货"
        },{
            id : "3",
            title : "预售"
        }];
    })

    .controller("good_ngCateSelect",function($scope,GoodCate){
        GoodCate.all().success(function(data) {
            $scope.goodCates = data;
        });
    })

    .controller("good_ngBrandSelect",function($scope,GoodBrand){
        GoodBrand.all().success(function(data) {
            $scope.goodBrands = data;
        })
    })
    .controller("good_ngPriceSelect",function($scope){

        var vm = $scope.vm = {};

        //数组对象用来给ng-options遍历
        vm.optionsData_type = [{
            id : "1",
            title : "普通售价"
        },{
            id : "2",
            title : "普通会员"
        },{
            id : "3",
            title : "高级会员"
        },{
            id : "4",
            title : "白金会员"
        },{
            id : "5",
            title : "员工价"
        }];
    })

    .controller("good_ngWarehouseSelect",function($scope){

        var vm = $scope.vm = {};

        //数组对象用来给ng-options遍历
        vm.optionsData = [{
            id : "1",
            title : "广州"
        },{
            id : "2",
            title : "从化"
        },{
            id : "3",
            title : "花都"
        }];
    })
    .controller("good_ngApplierSelect",function($scope,GoodApplier){
        GoodApplier.all().success(function(data){
            $scope.goodAppliers = data;
        });
    });

