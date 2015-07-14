/**
 * Created by Jason on 15/7/6.
 */
angular.module('goodCateCtrl', ['goodCateService'])

    .controller('goodCateController', function(GoodCate) {

        var vm = this;

        // 设置一个有效进程显示正在加载中set a processing variable to show loading things
        vm.processing = true;

        // 获取所有用户信息
        GoodCate.all()
            .success(function(data) {

                // 完成获取，进程失效
                vm.processing = false;

                // 绑定数据回vm.goodCates
                vm.goodCates = data;
                //alert(JSON.stringify(vm.goodCates));
            });

        // 删除用户
        vm.deleteGoodCate = function(id) {
            vm.processing = true;

            GoodCate.delete(id)
                .success(function(data) {

                    // 重新获取所有刷新表格
                    // 也可以在api中
                    // 返回用户信息
                    GoodCate.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.goodCates = data;
                        });

                });
        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodCateCreateController', function(GoodCate) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'create';

        // 创建用户
        vm.saveGoodCate = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodCateService里的create函数
            GoodCate.create(vm.goodCateData)
                .success(function (data) {
                    vm.processing = false;
                    vm.goodCateData = {};
                    vm.message = data.message;
                });

        };

    })

// 一个应用在创建用户页面的控制器
    .controller('goodCateEditController', function($routeParams, GoodCate) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'edit';

        // 获取要编辑的用户
        // $routeParams 我们从URL获取数据的方法
        GoodCate.get($routeParams.goodCate_id)
            .success(function(data) {
                vm.goodCateData = data;
            });

        // 保存用户
        vm.saveGoodCate = function() {
            vm.processing = true;
            vm.message = '';

            // 使用goodCateService中update方法
            GoodCate.update($routeParams.goodCate_id, vm.goodCateData)
                .success(function(data) {
                    vm.processing = false;

                    // 清除表单
                    vm.goodCateData = {};

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





