/**
 * Created by Jason on 15/6/30.
 */
angular.module('clientCtrl', ['clientService'])
//use controller for the main page
//注入用户的工厂inject the client factory
    .controller('clientController', function(Client) {

        var vm = this;

        // 设置一个有效进程显示正在加载中set a processing variable to show loading things
        vm.processing = true;

        // 获取所有用户信息
        Client.all()
            .success(function(data) {

                // 完成获取，进程失效
                vm.processing = false;

                // 绑定数据回vm.clients
                vm.clients = data;
            });

        // 删除用户
        vm.deleteClient = function(id) {
            vm.processing = true;

            Client.delete(id)
                .success(function(data) {

                    // 重新获取所有刷新表格
                    // 也可以在api中
                    // 返回用户信息
                    Client.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.clients = data;
                        });

                });
        };

    })

// 一个应用在创建用户页面的控制器
    .controller('clientCreateController', function(Client) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'create';

        // 创建用户
        vm.saveClient = function() {
            vm.processing = true;
            vm.message = '';

            // 使用clientService里的create函数
            Client.create(vm.clientData)
                .success(function(data) {
                    vm.processing = false;
                    vm.clientData = {};
                    vm.message = data.message;
                });

        };

    })

// 一个应用在创建用户页面的控制器
    .controller('clientEditController', function($routeParams, Client) {

        var vm = this;

        // 显示或隐藏编辑或创建页面
        // 区分编辑或创建两个页面
        vm.type = 'edit';

        // 获取要编辑的用户
        // $routeParams 我们从URL获取数据的方法
        Client.get($routeParams.client_id)
            .success(function(data) {
                vm.clientData = data;
            });

        // 保存用户
        vm.saveClient = function() {
            vm.processing = true;
            vm.message = '';

            // 使用clientService中update方法
            Client.update($routeParams.client_id, vm.clientData)
                .success(function(data) {
                    vm.processing = false;

                    // 清除表单
                    vm.clientData = {};

                    // 绑定返回信息从API到vm.message
                    vm.message = data.message;
                });
        };

    })

    .controller("client_ngTypeSelect",function($scope){

        var vm = $scope.vm = {};

        //数组对象用来给ng-options遍历
        vm.optionsData = [{
            id : "1",
            title : "零售"
        },{
            id : "2",
            title : "批发"
        }];

    })
    .controller("client_ngLevelSelect",function($scope){

        var vm = $scope.vm = {};

        //数组对象用来给ng-options遍历
        vm.optionsData = [{
            id : "1",
            title : "一级"
        },{
            id : "2",
            title : "二级"
        },{
            id : "3",
            title : "三级"
        }, {
            id : "4",
            title : "四级"
        },{
            id : "5",
            title : "五级"
        }];
    });