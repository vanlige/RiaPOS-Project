/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodBrandCtrl', ['goodBrandService'])

    .controller('goodBrandController', function(GoodBrand) {

        var vm = this;

        // 设置一个有效进程显示正在加载中set a processing variable to show loading things
        vm.processing = true;

        // 获取所有用户信息
        GoodBrand.all()
            .success(function(data) {

                // 完成获取，进程失效
                vm.processing = false;

                // 绑定数据回vm.goodBrands
                vm.goodBrands = data;
                //alert(JSON.stringify(vm.goodBrands));
            });

        // 删除用户
        vm.deleteGoodBrand = function(id) {
            vm.processing = true;

            GoodBrand.delete(id)
                .success(function(data) {

                    // 重新获取所有刷新表格
                    // 也可以在api中
                    // 返回用户信息
                    GoodBrand.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.goodBrands = data;
                        });

                });
        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodBrandCreateController', function(GoodBrand) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'create';

        // 创建用户
        vm.saveGoodBrand = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodBrandService里的create函数
            GoodBrand.create(vm.goodBrandData)
                .success(function (data) {
                    vm.processing = false;
                    vm.goodBrandData = {};
                    vm.message = data.message;
                });

        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodBrandEditController', function($routeParams, GoodBrand) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'edit';

        // 获取要编辑的用户
        // $routeParams 我们从URL获取数据的方法
        GoodBrand.get($routeParams.goodBrand_id)
            .success(function(data) {
                vm.goodBrandData = data;
            });

        // 保存用户
        vm.saveGoodBrand = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodBrandService中update方法
            GoodBrand.update($routeParams.goodBrand_id, vm.goodBrandData)
                .success(function(data) {
                    vm.processing = false;

                    // 清除表单
                    vm.goodBrandData = {};

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





