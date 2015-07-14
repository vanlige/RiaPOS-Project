/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodApplierCtrl', ['goodApplierService'])

    .controller('goodApplierController', function(GoodApplier) {

        var vm = this;

        // 设置一个有效进程显示正在加载中set a processing variable to show loading things
        vm.processing = true;

        // 获取所有用户信息
        GoodApplier.all()
            .success(function(data) {

                // 完成获取，进程失效
                vm.processing = false;

                // 绑定数据回vm.goodAppliers
                vm.goodAppliers = data;
                //alert(JSON.stringify(vm.goodAppliers));
            });

        // 删除用户
        vm.deleteGoodApplier = function(id) {
            vm.processing = true;

            GoodApplier.delete(id)
                .success(function(data) {

                    // 重新获取所有刷新表格
                    // 也可以在api中
                    // 返回用户信息
                    GoodApplier.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.goodAppliers = data;
                        });

                });
        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodApplierCreateController', function(GoodApplier) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'create';

        // 创建用户
        vm.saveGoodApplier = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodApplierService里的create函数
            GoodApplier.create(vm.goodApplierData)
                .success(function (data) {
                    vm.processing = false;
                    vm.goodApplierData = {};
                    vm.message = data.message;
                });

        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodApplierEditController', function($routeParams, GoodApplier) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'edit';

        // 获取要编辑的用户
        // $routeParams 我们从URL获取数据的方法
        GoodApplier.get($routeParams.goodApplier_id)
            .success(function(data) {
                vm.goodApplierData = data;
            });

        // 保存用户
        vm.saveGoodApplier = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodApplierService中update方法
            GoodApplier.update($routeParams.goodApplier_id, vm.goodApplierData)
                .success(function(data) {
                    vm.processing = false;

                    // 清除表单
                    vm.goodApplierData = {};

                    // 绑定返回信息从API到vm.message
                    vm.message = data.message;
                });
        };

    })

    .controller('DemoCtrl', function($scope, ngTableParams) {

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
    })





