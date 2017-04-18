/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('ac-manage.controllers', [])
    .controller('acUserCtrl', function($rootScope, $scope, $http) {
        $scope.whiteList = [{
            ruleId: '0',
            userName: 'user1' //可以是用户名也可以是用户id
        }, {
            ruleId: '1',
            userName: 'user2'
        }, {
            ruleId: '2',
            userName: 'user3'
        }, {
            ruleId: '3',
            userName: 'user4'
        }];

        $scope.blackList = [{
            ruleId: '6',
            userName: 'user5'
        }, {
            ruleId: '7',
            userName: 'user6'
        }, {
            ruleId: '8',
            userName: 'user7'
        }, ];

        var getBlackList = function() {
            $http.get('http://' + $rootScope.hostUrl + '8080/DataACServer/getBlackList')
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.blackList = ret;
                    } else {
                        $scope.blackList = null;
                    }
                })
                .error(function() {
                    alert('http error: 不能获取黑名单');
                });
        }

        var getWhiteList = function() {
            //添加tableList参数
            $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getWhiteList')
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.whiteList = ret;
                    } else {
                        $scope.whiteList = null;
                    }
                })
                .error(function() {
                    alert('http error: 不能获取白名单');
                });
        }

        $scope.searchWhite = function() {

        }

        $scope.addWhite = function() {

        }

        $scope.searchBlack = function() {

        }

        $scope.deleteWhite = function() {

        }

        $scope.addBlack = function() {

        }
    })
    .controller('acAttributeCtrl', function($rootScope, $scope, $http) {

    })

;